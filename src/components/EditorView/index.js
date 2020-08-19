import React from 'react'
import AceEditor from 'react-ace'

import {Spinner} from 'components'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import * as ace from 'ace-builds/src-noconflict/ace'

import styles from './index.module.scss'

import {useStore} from 'store'

ace.config.set('basePath', '/assets/ui/')
ace.config.set('modePath', '')
ace.config.set('themePath', '')

const NoFileLoaded = () => (
  <div className={styles.noFileLoaded}>
    <span className={styles.upperSentence}>There&#39;s no file loaded at the moment.</span>
    <br />
    Select a file on the File Tree and start coding!
  </div>
)

const EditorView = () => {
  const store = useStore()
  const {loadingFile, currentFile, changeCurrentFile} = store

  return (
    <div className={styles.container}>
      {loadingFile ? (
        <Spinner />
      ) : !currentFile ? (
        <NoFileLoaded />
      ) : (
        <AceEditor
          mode='java'
          theme='terminal'
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
          }}
        />
      )}
    </div>
  )
}

export default EditorView
