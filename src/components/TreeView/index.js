import React, {useState, useEffect} from 'react'

import {Modal, Spinner} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import UITreeView from '@material-ui/lab/TreeView'
import UITreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import {useStore} from 'store'

import {robotoBoldFontFamily} from 'assets/styles/main.module.scss'
import styles from './index.module.scss'

const useStyles = makeStyles({
  treeViewRoot: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  treeItemSelected: {
    color: 'white',
    fontFamily: robotoBoldFontFamily,
  },
})

const TreeView = () => {
  const classes = useStyles()

  const [modalOpen, setModalOpen] = useState(false)

  const store = useStore()
  const {
    setMobileMenuOpen,
    loadingTree,
    fileTree,
    setFileTree,
    currentFile,
    setCurrentFile,
    expandedNodes,
    setExpandedNodes,
  } = store

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

  const buildTree = tree => {
    return tree.map(branch => {
      const branchId = branch.id.toString()
      if (!branch.isDirectory) {
        return (
          <UITreeItem
            classes={currentFile && currentFile.id === branch.id ? {label: classes.treeItemSelected} : {}}
            onClick={() => onSelectFile(branch.id)}
            key={branchId}
            nodeId={branchId}
            label={branch.name}
          />
        )
      } else {
        return (
          <UITreeItem key={branchId} nodeId={branchId} label={branch.name}>
            {buildTree(branch.children)}
          </UITreeItem>
        )
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Files</div>
      <div className={styles.treeContainer}>
        {loadingTree ? (
          <Spinner />
        ) : (
          <UITreeView
            classes={{root: classes.treeViewRoot}}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedNodes}
            onNodeToggle={(_, ids) => setExpandedNodes(ids)}>
            {buildTree(fileTree)}
          </UITreeView>
        )}
      </div>
      <Modal
        message1='You have unsaved changes in the current file.'
        message2='Please save the changes or discard them before changing files.'
        onUnderstood={() => setModalOpen(false)}
        open={modalOpen}
      />
    </div>
  )
}

export default TreeView
