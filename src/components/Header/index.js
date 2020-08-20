import React, {useState} from 'react'
import clsx from 'clsx'

import {Modal} from 'components'
import HeaderButton from './HeaderButton'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import {useStore} from 'store'

import styles from './index.module.scss'

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)

  const store = useStore()
  const {setMobileMenuOpen, currentFile, resetCurrentFile, saveCurrentFile, deleteCurrentFile} = store

  const hasChanged = currentFile && currentFile.content !== currentFile.original

  const confirmDelete = () => {
    setModalOpen(false)
    deleteCurrentFile(currentFile)
  }

  return (
    <div className={clsx(styles.container)}>
      {!mediaQueryMedium && (
        <div className={styles.listMenu} onClick={() => setMobileMenuOpen(true)}>
          <i className='fas fa-list'></i>
        </div>
      )}
      {hasChanged && (
        <HeaderButton
          type='confirm'
          icon='save'
          label={mediaQueryMedium ? 'save' : ''}
          onClick={() => saveCurrentFile(currentFile)}
        />
      )}
      {currentFile && (
        <HeaderButton type='danger' icon='trash' label={mediaQueryMedium ? 'delete' : ''} onClick={() => setModalOpen(true)} />
      )}
      {hasChanged && (
        <HeaderButton
          type='default'
          icon='undo'
          label={mediaQueryMedium ? 'discard changes' : ''}
          onClick={() => resetCurrentFile()}
        />
      )}
      <Modal
        message1='Are you sure you want to delete?'
        message2='If you choose to delete this file, this data cannot be recovered.'
        onCancel={() => setModalOpen(false)}
        onConfirm={() => confirmDelete(false)}
        open={modalOpen}
      />
    </div>
  )
}

export default Header
