'use strict';

var _const = require('./const');

function action(modalName) {
  return {
    type: _const.SHOW_MODAL_WINDOW,
    payload: modalName
  };
}

module.exports = action;