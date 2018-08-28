import { UNREGISTER_MODAL } from './const'

function action (modalName) {
  return {
    type: UNREGISTER_MODAL,
    payload: modalName
  }
}

module.exports = action
