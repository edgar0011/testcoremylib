import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../styles/bootstrap-override.scss'
import * as cmsActions from '../store/actions/cmsActions'

import Routes from './routing/routes'
import Menu from './navigation/menu/Menu'

const mapDispatchToProps = {
  loadCms: cmsActions.getData,
}

type MainLayoutProps = {
  location: any
  store: any
  loadCms: (path?: string) => void
  getPosts: () => void
}

class MainLayout extends PureComponent<MainLayoutProps, any> {
  static contextTypes: {
    router: () => void
  };

  async componentDidMount () {
    const { loadCms } = this.props
    setTimeout(() => {
      loadCms('menu')
      loadCms('pagesection')
      loadCms('article')
      loadCms('presentationpage')
    })
  }

  render () {
    const { store, location } = this.props
    return (
      <>
        <Menu />
        <Routes location={location} store={store} />
      </>
    )
  }
}

export default withRouter(connect(null, mapDispatchToProps)(MainLayout as any as React.SFC<MainLayoutProps>))
