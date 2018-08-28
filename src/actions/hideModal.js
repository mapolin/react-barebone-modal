import { HIDE_MODAL_WINDOW } from './const'

function action (modalName) {
  return {
    type: HIDE_MODAL_WINDOW,
    payload: modalName
  }
}

module.exports = action
