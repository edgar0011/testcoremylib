import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import bgr from '../../assets/images/homePageDesktop.png'
import bgrMobile from '../../assets/images/homePageMobile1.png'
import { selectors as appSelectors, actions as appActions } from '../modules/app/appModule'

import { RoutesCMA as Routes } from './routing/routesCMA'
import { FooterCMA } from './FooterCMA'

import {
  media, WithTranslations,
  TopNavigation, TopNavigationViewBasic, ResponsiveProvider,
} from 'core-ui'

type LayoutCMAProps = {
  location: any
  translations: any
  store: {
    getState: () => void
    dispatch: () => void
  }
  loadCb: (configuration?: { path: string }) => void
}

const Wrapper = styled.div`
  background: url(${bgr});
  height: auto;
  min-height: 30rem;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center top;
  margin-right: auto;
  margin-left: auto;
  ${media.tablet`
    background: url(${bgrMobile});
    height: auto;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: contain;
  `};
`
class LayoutCMA extends PureComponent<LayoutCMAProps, any> {
  static contextTypes: {
    router: () => void
  };

  componentDidMount () {
    const { loadCb } = this.props
    loadCb && loadCb({ path: 'transactionTypes' })
    loadCb && loadCb({ path: 'propertyTypes' })
    loadCb && loadCb({ path: 'priceRange' })
    loadCb && loadCb({ path: 'rooms' })
  }

  render () {
    const { store, location } = this.props

    /** @type {{
      overflowX: React.CSSProperties,
      overflowY: React.CSSProperties,
      height: React.CSSProperties,
     }} */
    const style: React.CSSProperties = location?.pathname === '/'
      ? { height: '100vh', overflowX: 'hidden', overflowY: 'auto' }
      : {} as React.CSSProperties
    return (
      <ResponsiveProvider>
        <div id='LayoutCMA' style={style}>
          <Wrapper>
            <TopNavigation RenderComponent={TopNavigationViewBasic} location={location} />
            <Routes location={location} store={store} />
          </Wrapper>
          <FooterCMA />
        </div>
      </ResponsiveProvider>
    )
  }
}

// export default connect(null, mapDispatchToProps)(MainLayout)
const mapStateToProps = createStructuredSelector({
  codebooks: appSelectors.codebooks,
})

const mapDispatchToProps = {
  loadCb: appActions.loadCb,
}

export default WithTranslations('app')(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutCMA as any as React.SFC<LayoutCMAProps>)),
)
