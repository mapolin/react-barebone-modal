import { REGISTER_MODAL } from './const'

function action (modalName) {
  return {
    type: REGISTER_MODAL,
    payload: modalName
  }
}

module.exports = action
