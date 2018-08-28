'use strict';

var _const = require('./const');

function action(modalName) {
  return {
    type: _const.HIDE_MODAL_WINDOW,
    payload: modalName
  };
}

module.exports = action;