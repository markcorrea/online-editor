import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import DelayedFallback from './DelayedFallback'

import Store from 'store'
import MessageProvider from 'components/Message'

/**
 * This wrapper helps with lazy loading of page,
 * showing a Loading component within a respectful delay.
 *
 * @param {object} props
 * @return {object} React component
 */
const LoadableRoute = ({component: Component, routeComponent: RouteComponent, ...options}) => {
  const PageComponent = () => (
    <MessageProvider>
      <Store>
        <ErrorBoundary>
          <Suspense fallback={<DelayedFallback />}>
            <Component />
          </Suspense>
        </ErrorBoundary>
      </Store>
    </MessageProvider>
  )

  return <RouteComponent {...options} component={PageComponent} />
}

LoadableRoute.propTypes = {
  component: PropTypes.object.isRequired,
  routeComponent: PropTypes.func,
}

LoadableRoute.defaultProps = {
  routeComponent: Route,
}

export default LoadableRoute
