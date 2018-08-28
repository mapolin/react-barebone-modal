'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _const = require('../actions/const');

var _lodash = require('lodash');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* Define your initial state here.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * If you change the type from object to something else, do not forget to update
                                                                                                                                                                                                     * src/container/App.js accordingly.
                                                                                                                                                                                                     */


var initialState = {
  modals: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  /* Keep the reducer clean - do not mutate the original state. */
  var nextState = Object.assign({}, state);

  switch (action.type) {
    case _const.REGISTER_MODAL:
      {
        var list = [].concat(_toConsumableArray(nextState.modals), [{
          name: action.payload,
          isActive: false
        }]);

        nextState.modals = (0, _lodash.uniqWith)(list, function (a, b) {
          return a.name === b.name;
        });

        return nextState;
      }
    case _const.UNREGISTER_MODAL:
      {
        nextState.modals = (0, _lodash.filter)(nextState.modals, function (modal) {
          return modal.name !== action.payload;
        });

        return nextState;
      }
    case _const.SHOW_MODAL_WINDOW:
      {
        nextState.modals = nextState.modals.map(function (_ref) {
          var name = _ref.name,
              isActive = _ref.isActive;

          return {
            name: name,
            isActive: name === action.payload ? true : isActive
          };
        });

        return nextState;
      }

    case _const.HIDE_MODAL_WINDOW:
      {
        nextState.modals = nextState.modals.map(function (_ref2) {
          var name = _ref2.name,
              isActive = _ref2.isActive;

          return {
            name: name,
            isActive: name === action.payload ? false : isActive
          };
        });

        return nextState;
      }

    default:
      {
        /* Return original state if no actions were consumed. */
        return state;
      }
  }
}

exports.default = reducer;