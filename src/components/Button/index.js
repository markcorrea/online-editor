import React, {memo, useMemo} from 'react'
import PropTypes from 'prop-types'

import UIButton from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import {darkGray, lightGray, nBlue, robotoBoldFontFamily, defaultFontSize} from 'assets/styles/main.module.scss'

const Button = ({className, children, classes: {root}, onClick, color: buttonColor, type}) => {
  const backgroundColor = useMemo(() => {
    if (buttonColor === 'cancel') return darkGray
    return nBlue
  }, [buttonColor])

  const useStyles = makeStyles({
    root: {
      backgroundColor: backgroundColor,
      border: `solid thin transparent`,
      color: lightGray,
      fontSize: defaultFontSize,
      lineHeight: defaultFontSize,
      borderRadius: '5px',
      padding: '11px 20px 9px',
      minWidth: '200px',
      fontFamily: robotoBoldFontFamily,
      ...root,
    },
  })

  const buttonClasses = useStyles()

  return (
    <UIButton className={className} type={type} classes={buttonClasses} onClick={onClick}>
      {children}
    </UIButton>
  )
}

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
