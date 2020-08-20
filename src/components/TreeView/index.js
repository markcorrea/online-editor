import React, {useState, useEffect} from 'react'

import {Modal, Spinner} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import UITreeView from '@material-ui/lab/TreeView'
import UITreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import {useStore} from 'store'

import {selectedTreeItem, backgroundShadow, bigFontSize} from 'assets/styles/main.module.scss'
import styles from './index.module.scss'

const treeViewStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
})

const treeItemStyles = makeStyles({
  root: {
    '&&:focus': {
      '& >$content': {
        backgroundColor: backgroundShadow,
      },
    },
  },
  label: {
    color: 'white',
    fontSize: bigFontSize,
    '&&:hover': {
      backgroundColor: backgroundShadow,
    },
  },
  selected: {
    '& $label': {
      color: selectedTreeItem,
    },
  },
  content: {}, // needed above inside 'focus' > 'content'
})

const TreeView = () => {
  const treeViewClasses = treeViewStyles()
  const treeItemClasses = treeItemStyles()

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
        <UITreeItem {...itemProps} onClick={() => onSelectFile(branch.id)} />
      ) : (
        <UITreeItem {...itemProps}>{buildTree(branch.children)}</UITreeItem>
      )
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
            classes={treeViewClasses}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedNodes}
            selected={currentFile && currentFile.id.toString()}
            onNodeToggle={(_, ids) => setExpandedNodes(ids)}>
            {buildTree(fileTree)}
          </UITreeView>
        )}
      </div>
      <Modal
        message1='You have unsaved changes in the current file.'
        message2='Please save the changes or discard them before changing files.'
        onUnderstood={() => onUnderstood()}
        open={modalOpen}
      />
    </div>
  )
}

export default TreeView
