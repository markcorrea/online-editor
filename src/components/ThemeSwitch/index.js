import React from 'react'

import Switch from '@material-ui/core/Switch'

import {makeStyles} from '@material-ui/core/styles'

import {grayLo, buttonRed, buttonBlue} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const ThemeSwitch = () => {
  const [isDark, setIsDark] = React.useState(false)

  const useStyles = makeStyles({
    track: {
      backgroundColor: isDark ? buttonRed : grayLo,
    },
    thumb: {
      backgroundColor: isDark ? buttonRed : buttonBlue,
    },
  })

  const classes = useStyles()

  return (
    <div className={styles.container}>
      <Switch className={styles.switch} classes={classes} checked={isDark} onChange={() => setIsDark(!isDark)} />
      <div className={styles.title}>Theme</div>
    </div>
  )
}

export default ThemeSwitch
