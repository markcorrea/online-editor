import React, {useContext} from 'react'
import {SnackbarProvider, useSnackbar} from 'notistack'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'

import {bigFontSize, robotoBoldFontSize} from 'assets/styles/main.module.scss'

const useStyles = makeStyles({
  variantSuccess: {
    fontSize: bigFontSize,
    fontFamily: robotoBoldFontSize,
  },
  variantError: {
    fontSize: bigFontSize,
    fontFamily: robotoBoldFontSize,
  },
})

const MessageContext = React.createContext(null)

const MessageComponent = ({children}) => {
  const {enqueueSnackbar} = useSnackbar()

  const show = (message, type = 'success') => {
    enqueueSnackbar(message, {variant: type})
  }

  return <MessageContext.Provider value={{show}}>{children}</MessageContext.Provider>
}

const MessageWrapper = props => {
  const classes = useStyles()

  return (
    <SnackbarProvider
      classes={classes}
      maxSnack={10}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <MessageComponent {...props} />
    </SnackbarProvider>
  )
}

MessageComponent.propTypes = {
  children: PropTypes.object,
}

MessageWrapper.propTypes = {
  children: PropTypes.object,
}

export default MessageWrapper

export const useMessage = () => {
  return useContext(MessageContext)
}
