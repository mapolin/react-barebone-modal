'use strict';

var _const = require('./const');

function action(modalName) {
  return {
    type: _const.UNREGISTER_MODAL,
    payload: modalName
  };
}

module.exports = action;