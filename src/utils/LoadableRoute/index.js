import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import DelayedFallback from './DelayedFallback'

import Store from 'store'
import MessageProvider from 'components/Message'

const EmptyLayout = ({children}) => <>{children}</>

EmptyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

/**
 * This wrapper helps with lazy loading of page,
 * encapsulates errors, adds optional Page Layout,
 * and show a Loading component within a respectful delay.
 *
 * @param {object} props
 * @return {object} React component
 */
const LoadableRoute = ({component: Component, routeComponent: RouteComponent, layout: Layout, ...options}) => {
  const PageComponent = () => (
    <MessageProvider>
      <Store>
        <ErrorBoundary>
          <Layout {...options}>
            <ErrorBoundary>
              <Suspense fallback={<DelayedFallback />}>
                <Component />
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </ErrorBoundary>
      </Store>
    </MessageProvider>
  )

  return <RouteComponent {...options} component={PageComponent} />
}

LoadableRoute.propTypes = {
  component: PropTypes.object.isRequired,
  routeComponent: PropTypes.func,
  layout: PropTypes.any,
  // layout: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.element]),
}

LoadableRoute.defaultProps = {
  routeComponent: Route,
  layout: EmptyLayout,
}

export default LoadableRoute
