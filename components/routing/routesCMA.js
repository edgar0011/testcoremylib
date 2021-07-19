
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { memo, useMemo, useCallback, useEffect } from 'react'
import { is } from 'ramda'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { memoize } from '../../../../utils/src'
import DashboardRoute from '../../modules/dashboard'
import UserRoute from '../../modules/user'
// import ItemsRoute from '../../modules/items'
import HomeRoute from '../../modules/home'
import SearchRoute from '../../modules/search'
import DetailRoute from '../../modules/detail'
import '../../styles/transitions.scss'

const routeConfig = {
  '/home2': { route: DashboardRoute },
  '/user': { route: UserRoute },
  '/items': { route: SearchRoute },
  '/search/:params?': { route: SearchRoute },
  '/detail/:id?': { route: DetailRoute },
  '*': { route: HomeRoute },
}

const buildResolveRoute = (location) => (key, rule, store) => {
  if (is(Function, rule)) {
    return rule(location)
  }
  const { component, route } = rule
  return <Route key={key} path={key} exact component={route ? route(store, routeConfig) : component} />
}

export const RoutesCMA = memo(({ location, store }) => {
  // const resolveRoute = memoize(buildResolveRoute(location))
  const resolveRoute = useCallback(buildResolveRoute(location), [location])
  // const resolveRoute = useMemo(() => buildResolveRoute(location), [location])
  // const resolveRoute = useMemo(() => buildResolveRoute(location), [location])
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        XclassNames='slide'
        Xtimeout={150}
      >
        <>
          <Switch location={location}>
            {Object.entries(routeConfig).map(([key, value]) => resolveRoute(key, value, store))}
          </Switch>
        </>
      </CSSTransition>
    </TransitionGroup>)
})

RoutesCMA.displayName = 'RoutesCMA'
