import React, {forwardRef, memo, useMemo} from 'react'
import PropTypes from 'prop-types'

import UIButton from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import {useStore} from 'store'

import {
  darkTransparentMi,
  darkDefaultFontColor,
  bluePrimary,
  robotoBoldFontFamily,
  defaultFontSize,
} from 'assets/styles/main.module.scss'

const Button = forwardRef(({className, children, classes: {root}, onClick, color: buttonColor, type}, ref) => {
  const store = useStore()
  const {darkMode} = store

  const backgroundColor = useMemo(() => {
    if (buttonColor === 'cancel') return darkMode ? darkTransparentMi : 'transparent'
    return bluePrimary
  }, [buttonColor, darkMode])

  const color = useMemo(() => {
    if (buttonColor === 'cancel') return darkMode ? darkDefaultFontColor : bluePrimary
    return darkDefaultFontColor
  }, [buttonColor, darkMode])

  const useStyles = makeStyles({
    root: {
      backgroundColor: backgroundColor,
      border: `solid thin transparent`,
      color: color,
      fontSize: defaultFontSize,
      lineHeight: defaultFontSize,
      borderRadius: '5px',
      padding: '11px 20px 9px',
      minWidth: '200px',
      fontFamily: robotoBoldFontFamily,
      '&:hover': {
        color: darkMode ? darkDefaultFontColor : bluePrimary,
      },
      ...root,
    },
    label: {},
  })

  const classes = useStyles()

  return (
    <UIButton className={className} type={type} classes={classes} onClick={onClick} ref={ref}>
      {children}
    </UIButton>
  )
})

Button.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
}

Button.defaultProps = {
  classes: {},
  children: 'button',
  onClick: () => {},
  color: 'default',
  type: 'submit',
}

export default memo(Button)
