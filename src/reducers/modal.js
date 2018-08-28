/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  SHOW_MODAL_WINDOW,
  HIDE_MODAL_WINDOW,
  REGISTER_MODAL,
  UNREGISTER_MODAL
} from '../actions/const'
import { uniqWith, filter } from 'lodash'

const initialState = {
  modals: []
}

function reducer (state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state)

  switch (action.type) {
    case REGISTER_MODAL: {
      const list = [...nextState.modals, {
        name: action.payload,
        isActive: false
      }]

      nextState.modals = uniqWith(list, (a, b) => a.name === b.name)

      return nextState
    }
    case UNREGISTER_MODAL: {
      nextState.modals = filter(nextState.modals, (modal) => modal.name !== action.payload)

      return nextState
    }
    case SHOW_MODAL_WINDOW: {
      nextState.modals = nextState.modals.map(({name, isActive}) => {
        return {
          name,
          isActive: name === action.payload ? true : isActive
        }
      })

      return nextState
    }

    case HIDE_MODAL_WINDOW: {
      nextState.modals = nextState.modals.map(({name, isActive}) => {
        return {
          name,
          isActive: name === action.payload ? false : isActive
        }
      })

      return nextState
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}

export default reducer
