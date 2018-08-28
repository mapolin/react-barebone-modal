'use strict';

var _const = require('./const');

function action(modalName) {
  return {
    type: _const.REGISTER_MODAL,
    payload: modalName
  };
}

module.exports = action;