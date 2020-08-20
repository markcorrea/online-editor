import React from 'react'

import {Drawer, EditorView, Header, SideMenu} from 'components'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import {useStore} from 'store'

import styles from './index.module.scss'

const Editor = () => {
  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)
  const store = useStore()
  const {mobileMenuOpen, setMobileMenuOpen} = store

  return (
    <>
      <div className={styles.container}>
        <Header className={styles.header} />
        <div className={styles.content}>
          {mediaQueryMedium && <SideMenu />}
          <EditorView />
        </div>
      </div>
      <Drawer open={mobileMenuOpen} setOpen={setMobileMenuOpen}>
        <SideMenu />
      </Drawer>
    </>
  )
}

export default Editor
