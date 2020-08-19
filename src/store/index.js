import React, {useState, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'

import {useMessage} from 'components/Message'

import {fetchFileTree, fetchFileById, updateFileById, deleteFileById} from 'services'

const StoreContext = React.createContext(null)

const initialState = {
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

  const setExpandedNodes = useCallback(
    expandedNodes => {
      updateState(prevState => ({...prevState, expandedNodes}))
    },
    [updateState]
  )

  const setFileTree = useCallback(async () => {
    updateState(prevState => ({...prevState, loadingTree: true}))
    const result = await fetchFileTree()
    if (result) {
      updateState(prevState => ({...prevState, fileTree: result.data, loadingTree: false}))
      return message.show('File tree loaded successfully!', 'success')
    }
    updateState(prevState => ({...prevState, loadingTree: false}))
    return message.show('There was an error while loading tree.', 'error')
  }, [updateState, message])

  const setMobileMenuOpen = useCallback(mobileMenuOpen => updateState(prevState => ({...prevState, mobileMenuOpen})), [
    updateState,
  ])

  const setLoadingFile = useCallback(loadingFile => updateState(prevState => ({...prevState, loadingFile})), [updateState])

  const setCurrentFile = useCallback(
    async id => {
      updateState(prevState => ({...prevState, loadingFile: true}))
      const result = await fetchFileById(id)
      if (result) {
        const newFile = {
          ...result.data,
          original: result.data.content,
        }

        updateState(prevState => ({
          ...prevState,
          currentFile: newFile,
          loadingFile: false,
        }))
        return message.show('File loaded successfully!', 'success')
      }
      updateState(prevState => ({
        ...prevState,
        loadingFile: false,
      }))
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
      updateState(prevState => ({...prevState, loadingFile: true}))
      const result = await updateFileById(currentFile)
      if (result) {
        updateState(prevState => ({
          ...prevState,
          currentFile: {
            ...prevState.currentFile,
            original: prevState.currentFile.content,
          },
          loadingFile: false,
        }))
        return message.show('Changes saved!', 'success')
      }

      updateState(prevState => ({...prevState, loadingFile: false}))
      return message.show('There was an error while saving', 'error')
    },
    [updateState, message]
  )

  const deleteCurrentFile = useCallback(
    async currentFile => {
      updateState(prevState => ({...prevState, loadingFile: true}))
      const result = await deleteFileById(currentFile.id)
      if (result) {
        updateState(prevState => ({
          ...prevState,
          currentFile: null,
          loadingFile: false,
        }))
        message.show('File deleted successfully!', 'success')
        return setFileTree()
      }

      updateState(prevState => ({...prevState, loadingFile: false}))
      return message.show('Could not delete this file.', 'error')
    },
    [updateState, setFileTree, message]
  )

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setExpandedNodes,
        setMobileMenuOpen,
        setFileTree,
        setLoadingFile,
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
