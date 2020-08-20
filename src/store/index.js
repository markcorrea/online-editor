import React, {useState, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'

import {useMessage} from 'components/Message'

import {fetchFileTree, fetchFileById, updateFileById, deleteFileById} from 'services'

const StoreContext = React.createContext(null)

const initialState = {
  darkMode: true,
  expandedNodes: [],
  fileTree: [],
  loadingTree: false,
  currentFile: null,
  loadingFile: false,
  mobileMenuOpen: false,
}

const Store = ({children}) => {
  const [state, updateState] = useState(initialState)
  const message = useMessage()

  const loadingTree = isLoading => updateState(prevState => ({...prevState, loadingTree: isLoading}))
  const loadingFile = isLoading => updateState(prevState => ({...prevState, loadingFile: isLoading}))

  const enterDarkMode = () => updateState(prevState => ({...prevState, darkMode: !prevState.darkMode}))

  const setExpandedNodes = useCallback(
    expandedNodes => {
      updateState(prevState => ({...prevState, expandedNodes}))
    },
    [updateState]
  )

  const setFileTree = useCallback(async () => {
    loadingTree(true)
    const result = await fetchFileTree()
    if (result) {
      updateState(prevState => ({...prevState, fileTree: result.data}))
      message.show('File tree loaded successfully!', 'success')
    } else {
      message.show('There was an error while loading tree.', 'error')
    }
    loadingTree(false)
  }, [updateState, message])

  const setMobileMenuOpen = useCallback(mobileMenuOpen => updateState(prevState => ({...prevState, mobileMenuOpen})), [
    updateState,
  ])

  const setCurrentFile = useCallback(
    async id => {
      loadingFile(true)
      const result = await fetchFileById(id)
      if (result) {
        const newFile = {
          ...result.data,
          original: result.data.content,
        }

        updateState(prevState => ({
          ...prevState,
          currentFile: newFile,
        }))
        message.show('File loaded successfully!', 'success')
      } else {
        message.show('There was an error while loading the file.', 'error')
      }
      loadingFile(false)
    },
    [updateState, message]
  )

  const resetCurrentFile = useCallback(() => {
    updateState(prevState => ({
      ...prevState,
      currentFile: {
        ...prevState.currentFile,
        content: prevState.currentFile.original,
      },
    }))
    message.show('Changes discarded successfully!', 'success')
  }, [updateState, message])

  const changeCurrentFile = useCallback(
    value => {
      updateState(prevState => ({
        ...prevState,
        currentFile: {...prevState.currentFile, content: value},
      }))
    },
    [updateState]
  )

  const saveCurrentFile = useCallback(
    async currentFile => {
      loadingFile(true)
      const result = await updateFileById(currentFile)
      if (result) {
        updateState(prevState => ({
          ...prevState,
          currentFile: {
            ...prevState.currentFile,
            original: prevState.currentFile.content,
          },
        }))
        message.show('Changes saved!', 'success')
      } else {
        message.show('There was an error while saving', 'error')
      }
      loadingFile(false)
    },
    [updateState, message]
  )

  const deleteCurrentFile = useCallback(
    async currentFile => {
      loadingFile(true)
      const result = await deleteFileById(currentFile.id)
      if (result) {
        updateState(prevState => ({
          ...prevState,
          currentFile: null,
        }))
        message.show('File deleted successfully!', 'success')
        setFileTree()
      } else {
        message.show('Could not delete this file.', 'error')
      }
      loadingFile(false)
    },
    [updateState, setFileTree, message]
  )

  return (
    <StoreContext.Provider
      value={{
        ...state,
        enterDarkMode,
        setExpandedNodes,
        setMobileMenuOpen,
        setFileTree,
        setCurrentFile,
        resetCurrentFile,
        changeCurrentFile,
        saveCurrentFile,
        deleteCurrentFile,
      }}>
      {children}
    </StoreContext.Provider>
  )
}

Store.propTypes = {
  children: PropTypes.element,
}

export default Store

export const useStore = () => {
  return useContext(StoreContext)
}
