import React, {useEffect} from 'react'

import Switch from '@material-ui/core/Switch'

import {makeStyles} from '@material-ui/core/styles'

import {grayLo, redSecondary, bluePrimary} from 'assets/styles/main.module.scss'
import {useStore} from 'store'

import styles from './index.module.scss'

const ThemeSwitch = () => {
  const store = useStore()
  const {enterDarkMode, darkMode} = store

  useEffect(() => {
    const body = document.body

    if (darkMode) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }, [darkMode])

  const useStyles = makeStyles({
    track: {
      backgroundColor: darkMode ? redSecondary : grayLo,
    },
    thumb: {
      backgroundColor: darkMode ? redSecondary : bluePrimary,
    },
  })

  const classes = useStyles()

  return (
    <div className={styles.container}>
      <Switch className={styles.switch} classes={classes} checked={darkMode} onChange={enterDarkMode} />
      <div className={styles.title}>Theme</div>
    </div>
  )
}

export default ThemeSwitch
