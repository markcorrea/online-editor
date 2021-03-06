import React, {useState, useEffect} from 'react'

import {Modal, Spinner, ThemeSwitch} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import resizeMenu from './resizable'
import {useStore} from 'store'

import {
  lightDefaultFontColor,
  darkDefaultFontColor,
  lightTransparentLo,
  darkTransparentLo,
  lightChangedTreeItem,
  darkChangedTreeItem,
  robotoBoldFontFamily,
  backgroundShadow,
  bigFontSize,
} from 'assets/styles/main.module.scss'
import styles from './index.module.scss'

const treeViewStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    width: '100%',
  },
})

const treeItemStyles = (darkMode, hasChanged) =>
  makeStyles({
    root: {
      '&&:focus': {
        '& >$content': {
          backgroundColor: backgroundShadow,
        },
      },
    },
    label: {
      color: darkMode ? darkDefaultFontColor : lightDefaultFontColor,
      fontSize: bigFontSize,
      '&&:hover': {
        backgroundColor: backgroundShadow,
      },
    },
    selected: {
      '& >$content': {
        '& $label': {
          backgroundColor: `${darkMode ? darkTransparentLo : lightTransparentLo} !important`,
          ...(hasChanged ? {color: darkMode ? darkChangedTreeItem : lightChangedTreeItem} : {}),
          ...(hasChanged ? {fontFamily: robotoBoldFontFamily} : {}),
        },
      },
    },
    content: {}, // needed above inside 'focus' > 'content'
  })

const SideMenu = () => {
  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)
  const store = useStore()
  const {
    darkMode,
    setMobileMenuOpen,
    loadingTree,
    fileTree,
    setFileTree,
    currentFile,
    setCurrentFile,
    expandedNodes,
    setExpandedNodes,
    menuWidth,
    setMenuWidth,
  } = store

  const hasChanged = currentFile && currentFile.content !== currentFile.original

  const treeViewClasses = treeViewStyles()
  const treeItemClasses = treeItemStyles(darkMode, hasChanged)()

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!fileTree.length) {
      setFileTree()
    }
  }, [setFileTree, fileTree])

  const onSelectFile = id => {
    if (currentFile && currentFile.content !== currentFile.original) {
      return setModalOpen(true)
    }

    setCurrentFile(id)
    setMobileMenuOpen(false)
  }

  const onUnderstood = () => {
    setModalOpen(false)
    setMobileMenuOpen(false)
  }

  const buildTree = tree => {
    return tree.map(branch => {
      const branchId = branch.id.toString()

      const itemProps = {
        classes: treeItemClasses,
        key: branchId,
        nodeId: branchId,
        label: branch.name,
      }
      return !branch.isDirectory ? (
        <TreeItem {...itemProps} onClick={() => onSelectFile(branch.id)} />
      ) : (
        <TreeItem {...itemProps}>{buildTree(branch.children)}</TreeItem>
      )
    })
  }

  return (
    <div className={styles.container} style={{width: `${menuWidth}px`}}>
      {loadingTree ? (
        <Spinner />
      ) : (
        <>
          <ThemeSwitch />
          <div className={styles.title}>Files</div>
          <TreeView
            classes={treeViewClasses}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedNodes}
            selected={currentFile && currentFile.id.toString()}
            onNodeToggle={(_, ids) => setExpandedNodes(ids)}>
            {buildTree(fileTree)}
          </TreeView>
          {mediaQueryMedium && <div className={styles.draggableBorder} onMouseDown={() => resizeMenu(setMenuWidth)} />}
        </>
      )}
      <Modal
        message1='You have unsaved changes in the current file.'
        message2='Please save the changes or discard them before changing files.'
        onUnderstood={onUnderstood}
        open={modalOpen}
      />
    </div>
  )
}

export default SideMenu
