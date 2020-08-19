import React from 'react'

import AppRouter from './AppRouter'

import 'assets/fontawesome/fa.css'
import 'assets/styles/main.module.scss'

/**
 * Created the container in which every modal will be inserted.
 */
const modalContainer = document.createElement('div')
modalContainer.setAttribute('id', 'modalContainer')
document.body.append(modalContainer)

const App = () => {
  return <AppRouter />
}

export default App
