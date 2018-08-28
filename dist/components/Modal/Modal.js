'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../../actions');

var MODAL_ACTIONS = _interopRequireWildcard(_actions);

require('./modal.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __set = function __set() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
var guid = function guid() {
  return '' + __set() + __set() + '-' + __set() + '-' + __set() + '-' + __set() + '-' + __set() + __set() + __set();
};

var clsOut = function clsOut() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.from(args).filter(function (x) {
    return x;
  }).reduce(function (acc, curr) {
    return curr + ' ' + acc;
  });
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.hide = _this.hide.bind(_this);
    _this.onXClickHandler = _this.onXClickHandler.bind(_this);
    _this.onBackgroundClickHandler = _this.onBackgroundClickHandler.bind(_this);
    _this.state = {
      name: props.name || guid()
    };
    return _this;
  }

  _createClass(Modal, [{
    key: 'isActive',
    value: function isActive() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var modals = props.modal.modals;
      var name = this.state.name;

      return modals.find(function (item) {
        return item.name === name && item.isActive;
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var actions = this.props.actions;
      var name = this.state.name;


      actions.registerModal(name);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var actions = this.props.actions;
      var name = this.state.name;


      actions.unregisterModal(name);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.modal !== this.props.modal) {
        if (this.isActive(nextProps)) {
          window.history.pushState({}, '');
          window.addEventListener('popstate', this.hide);
          nextProps.onShow && nextProps.onShow();
        }
      }
    }
  }, {
    key: 'onXClickHandler',
    value: function onXClickHandler() {
      window.history.back();
    }
  }, {
    key: 'onBackgroundClickHandler',
    value: function onBackgroundClickHandler(event) {
      if (!this.modalContent.contains(event.target)) {
        window.history.back();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _props = this.props,
          actions = _props.actions,
          onHide = _props.onHide;
      var name = this.state.name;


      actions.hideModal(name);
      onHide && onHide();

      window.removeEventListener('popstate', this.hide);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          contentClass = _props2.contentClass;

      var isActive = this.isActive();
      return _react2.default.createElement(
        'div',
        { className: clsOut(className, 'barebone-modal', isActive ? 'active' : ''), onClick: isActive ? this.onBackgroundClickHandler : null },
        _react2.default.createElement(
          'div',
          { className: clsOut('barebone-modal__content', contentClass), ref: function ref(el) {
              _this2.modalContent = el;
            } },
          _react2.default.createElement('span', { className: 'close', onClick: this.onXClickHandler }),
          this.props.children
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  /**
   * The name of the modal, mandatory field used to show/hide using a redux action
   */
  name: _propTypes2.default.string.isRequired,
  /**
  * Determines if the modal should be fullscreen on mobile
  */
  fullScreen: _propTypes2.default.bool,
  /**
   * Adds a class to the main modal container
   */
  className: _propTypes2.default.string,
  /**
   * Adds class to the content container
   */
  contentClass: _propTypes2.default.string,
  /**
   * Callback function executed when the modal is about to hide
   */
  onHide: _propTypes2.default.func,
  /**
   * Callback function executed when the modal is about to show
   */
  onShow: _propTypes2.default.func
};

Modal.displayName = 'Modal';

function mapStateToProps(state) {
  var props = {
    modal: state.modal
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  var actions = MODAL_ACTIONS;
  var actionMap = { actions: (0, _redux.bindActionCreators)(actions, dispatch) };
  return actionMap;
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Modal);