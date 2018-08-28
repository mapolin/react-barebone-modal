import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MODAL_ACTIONS from '../../actions'
import './modal.css'

const __set = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
const guid = () => `${__set()}${__set()}-${__set()}-${__set()}-${__set()}-${__set()}${__set()}${__set()}`

const clsOut = (...args) => Array.from(args).filter(x => x).reduce((acc, curr) => `${curr} ${acc}`)

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.hide = this.hide.bind(this)
    this.onXClickHandler = this.onXClickHandler.bind(this)
    this.onBackgroundClickHandler = this.onBackgroundClickHandler.bind(this)
    this.state = {
      name: props.name || guid()
    }
  }

  isActive (props = this.props) {
    const { modals } = props.modal
    const { name } = this.state
    return modals.find((item) => { return item.name === name && item.isActive })
  }

  componentWillMount () {
    const { actions } = this.props
    const { name } = this.state

    actions.registerModal(name)
  }

  componentWillUnmount () {
    const { actions } = this.props
    const { name } = this.state

    actions.unregisterModal(name)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.modal !== this.props.modal) {
      if (this.isActive(nextProps)) {
        window.history.pushState({}, '')
        window.addEventListener('popstate', this.hide)
        nextProps.onShow && nextProps.onShow()
      }
    }
  }

  onXClickHandler () {
    window.history.back()
  }

  onBackgroundClickHandler (event) {
    if (!this.modalContent.contains(event.target)) {
      window.history.back()
    }
  }

  hide () {
    const { actions, onHide } = this.props
    const { name } = this.state

    actions.hideModal(name)
    onHide && onHide()

    window.removeEventListener('popstate', this.hide)
  }

  render () {
    const { className, contentClass } = this.props
    const isActive = this.isActive()
    return (
      <div className={clsOut(className, 'barebone-modal', isActive ? 'active' : '')} onClick={(isActive) ? this.onBackgroundClickHandler : null}>
        <div className={clsOut('barebone-modal__content', contentClass)} ref={(el) => {this.modalContent = el}}>
          <span className='close' onClick={this.onXClickHandler} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  /**
   * The name of the modal, mandatory field used to show/hide using a redux action
   */
  name: PropTypes.string.isRequired,
   /**
   * Determines if the modal should be fullscreen on mobile
   */
  fullScreen: PropTypes.bool,
  /**
   * Adds a class to the main modal container
   */
  className: PropTypes.string,
  /**
   * Adds class to the content container
   */
  contentClass: PropTypes.string,
  /**
   * Callback function executed when the modal is about to hide
   */
  onHide: PropTypes.func,
  /**
   * Callback function executed when the modal is about to show
   */
  onShow: PropTypes.func
}

Modal.displayName = 'Modal'

function mapStateToProps (state) {
  const props = {
    modal: state.modal
  }
  return props
}

function mapDispatchToProps (dispatch) {
  const actions = MODAL_ACTIONS
  const actionMap = { actions: bindActionCreators(actions, dispatch) }
  return actionMap
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
