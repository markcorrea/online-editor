import React from 'react'
import AceEditor from 'react-ace'

import {Spinner} from 'components'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import * as ace from 'ace-builds/src-noconflict/ace'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

import {useStore} from 'store'

ace.config.set('basePath', '/assets/ui/')
ace.config.set('modePath', '')
ace.config.set('themePath', '')

const NoFileLoaded = () => (
  <div className={styles.noFileLoaded}>
    <div className={styles.fan}>
      <i className='fas fa-fan'></i>
    </div>
    <span className={styles.upperSentence}>There&#39;s no file loaded at the moment.</span>
    <br />
    Select a file on the File Tree and start coding!
  </div>
)

const EditorView = () => {
  const store = useStore()
  const {darkMode, loadingFile, currentFile, changeCurrentFile, menuWidth} = store

  const mediaQueryMedium = useMediaQuery('min', mediaQueryMD)
  const editorWidth = !mediaQueryMedium ? '100%' : `calc(100% - ${menuWidth}px)`

  return (
    <div className={styles.container} style={{width: editorWidth}}>
      {loadingFile ? (
        <Spinner />
      ) : !currentFile ? (
        <NoFileLoaded />
      ) : (
        <AceEditor
          mode='java'
          style={{marginTop: '5px'}}
          theme={darkMode ? 'terminal' : 'tomorrow'}
          onChange={newValue => changeCurrentFile(newValue)}
          value={(currentFile && currentFile.content) || ''}
          name='editor'
          editorProps={{$blockScrolling: true}}
          width='100%'
          height='100%'
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            hScrollBarAlwaysVisible: true,
            vScrollBarAlwaysVisible: true,
          }}
        />
      )}
    </div>
  )
}

export default EditorView
