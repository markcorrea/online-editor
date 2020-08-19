import React, {lazy} from 'react'
import {HashRouter as Router, Switch, Redirect} from 'react-router-dom'

import LoadableRoute from 'utils/LoadableRoute'

const Editor = lazy(() => import(/* webpackChunkName: "Editor" */ '../pages/Editor'))

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect path='/' exact to='/editor' />

        <LoadableRoute exact path='/editor' component={Editor} />
      </Switch>
    </Router>
  )
}

export default AppRouter
