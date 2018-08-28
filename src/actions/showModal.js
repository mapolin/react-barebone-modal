import { SHOW_MODAL_WINDOW } from './const'

function action (modalName) {
  return {
    type: SHOW_MODAL_WINDOW,
    payload: modalName
  }
}

module.exports = action
