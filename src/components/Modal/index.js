import React, {useRef} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {Button} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

import styles from './index.module.scss'

const rightButton = {
  root: {
    minWidth: 'initial',
    maxWidth: '200px',
    marginLeft: '15px',
  },
}

const useStyles = makeStyles({
  paper: {
    borderRadius: '5px',
  },
})

const Modal = ({message1, message2, onCancel, onConfirm, onUnderstood, open}) => {
  const modalContainer = document.getElementById('modalContainer')
  const classes = useStyles()

  const ref = useRef('')
  const focus = () => ref.current.focus()

  return ReactDOM.createPortal(
    <Dialog
      classes={classes}
      open={open}
      maxWidth='sm'
      fullWidth
      onBackdropClick={onCancel || onUnderstood}
      onEscapeKeyDown={onCancel || onUnderstood}
      onEntered={focus}>
      <div className={styles.container}>
        <div className={styles.message1}>{message1}</div>
        <div className={styles.message2}>{message2}</div>
        <div className={styles.buttons}>
          {onCancel && (
            <Button color='cancel' classes={rightButton} onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onConfirm && (
            <Button ref={ref} classes={rightButton} onClick={onConfirm}>
              Confirm
            </Button>
          )}
          {onUnderstood && (
            <Button ref={ref} classes={rightButton} onClick={onUnderstood}>
              Understood
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
