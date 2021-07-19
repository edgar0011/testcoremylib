
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { memo, useMemo, useCallback } from 'react'
import { is } from 'ramda'
import { Route, Redirect, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { memoize } from '../../../../utils/src'
import PageRoute from '../../modules/page'
import UserRoute from '../../modules/user'
import ItemsRoute from '../../modules/items'
import '../../styles/transitions.scss'
import '../../modules/external'
import Company from '../../modules/page/subpage/Company'
import Articles from '../../modules/page/subpage/Articles'
import Presentations from '../../modules/page/subpage/Presentations'

const routeConfig = {
  '/': (location) => (
    ['/', ''].includes(location.pathname) && <Redirect strict from='*' to='/page/home' />),
  '/company': { component: Company },
  '/news': { component: Articles },
  '/page/:name': {
    route: PageRoute,
    // componentX: PageLayout
  },
  '/presentations': { component: Presentations },
  '/user': { route: UserRoute },
  '/items': { route: ItemsRoute },
}

const moduleConfig = {
  routes: {
    user: {},
    page: {},
  },
}

const buildResolveRoute = (location) => (key, rule, store) => {
  if (is(Function, rule)) {
    return rule(location)
  }
  const { component, route } = rule
  return <Route key={key} path={key} exact component={route ? route(store, moduleConfig) : component} />
}

const Routes = memo(({ location, store }) => {
  const resolveRoute = memoize(buildResolveRoute(location))
  // const resolveRoute = useCallback(buildResolveRoute(location), [location])
  // const resolveRoute = useMemo(() => buildResolveRoute(location), [location])
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames='page'
        timeout={300}
      >
        <Switch location={location}>
          {Object.entries(routeConfig).map(([key, value]) => resolveRoute(key, value, store))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>)
})

Routes.displayName = 'Routes'

export default Routes
