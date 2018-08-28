import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../../src/reducers'
import Modal from '../../src/components/Modal/Modal'
import { showModal } from '../../src/actions'

const store = createStore(reducers, composeWithDevTools())
const App = connect()(({ dispatch }) => (
    <React.Fragment>
        <button onClick={() => dispatch(showModal('example-modal-1'))}>Show Modal 1</button>
        <Modal name='example-modal-1' />
        <button onClick={() => dispatch(showModal('example-modal-2'))}>Show Modal 2</button>
        <Modal name='example-modal-2' />
        <button onClick={() => dispatch(showModal('example-modal-3'))}>Show Modal 3</button>
        <Modal name='example-modal-3' />
    </React.Fragment>
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)