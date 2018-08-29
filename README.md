# react-barebone-modal
A very basic react+redux modal implementation

## Installation
```
npm install react-barebone-modal
```
or
```
yarn add react-barebone-modal
```

### Preparations
Add the modal reducer to your Redux store
```
  import { reducer } from 'react-barebone-modal'

  // your store setup code
  createStore(combineReducers(
    // your reducers
    reducer
  ))
```

### Usage
Add a `<Modal>` anywhere you feel like it
```
  // ./some/component.jsx
  import { Modal } from 'react-barebone-modal'
  const Box = () => {
    return (
      <div className='somewhere-on-the-page'>
        Random stuff

        <Modal name='random-modal'>
          Stuff inside the modal
        </Modal>
      </div>
    )
  }
  export default Box
```

To display a modal, all you have to do is `dispatch` the `showModal(@name)` action, or `hideModal(@name)` to hide it
```
  // ./some/other/component.jsx
  import { showModal } from 'react-barebone-modal'
  const ConnectedBox = () => {
    return (
      <div>
        <button onClick={() => this.props.dispatch(showModal('random-modal'))}>
          Show the random modal used in <Box />
        </button>
        <button onClick={() => this.props.dispatch(hideModal('random-modal'))}>
          Hide the random modal used in <Box />
        </button>
      </div>
    )
  }
  <div>
```

You can also pass functions to `onShow` and `onHide` callbacks
```
  const onShow = () => alert('modal is visible')
  const onHide = () => alert('modal is hidden')
  <Modal name='random-modal' onShow={onShow} onHide={onHide}>
```