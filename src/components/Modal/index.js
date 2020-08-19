import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {Button} from 'components'

import Dialog from '@material-ui/core/Dialog'

import styles from './index.module.scss'

const buttonClass = {
  minWidth: 'initial',
  maxWidth: '200px',
}

const rightButton = {
  root: {
    ...buttonClass,
    float: 'right',
    marginLeft: '15px',
  },
}

const Modal = ({message1, message2, onCancel, onConfirm, onUnderstood, open}) => {
  const modalContainer = document.getElementById('modalContainer')

  return ReactDOM.createPortal(
    <Dialog open={open} maxWidth='sm' fullWidth>
      <div className={styles.container}>
        <div className={styles.message1}>{message1}</div>
        <div className={styles.message2}>{message2}</div>
        <div>
          {onConfirm && (
            <Button classes={rightButton} onClick={onConfirm}>
              Confirm
            </Button>
          )}
          {onUnderstood && (
            <Button color='cancel' classes={rightButton} onClick={onUnderstood}>
              Understood
            </Button>
          )}
          {onCancel && (
            <Button color='cancel' classes={rightButton} onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Dialog>,
    modalContainer
  )
}

Modal.propTypes = {
  message1: PropTypes.string,
  message2: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onDiscard: PropTypes.func,
}

Modal.defaultProps = {
  message1: '',
  message2: '',
  onCancel: null,
  onConfirm: null,
  onUnderstood: null,
}

export default Modal
