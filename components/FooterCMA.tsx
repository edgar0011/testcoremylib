import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Flex, WithTranslations,
  PageLinkGroup, PageLinkGroupHorizontal,
} from '../../../ui/src'
import {
  backgroundDarkColor,
  backgroundDarkLiteColor,
} from '../../../ui/src/theme/color'
import properties from '../config/properties.json'
import { selectors as appSelectors, actions as appActions } from '../modules/app/appModule'

const { footerData } = properties

type FooterCMAProps = {
  location: any
  translations: any
}

const proecessTranslations = (keyMatch) => (translations) => (
  Object.entries(translations).filter(([key]) => key.indexOf(keyMatch) > -1))

class FooterCMABase extends PureComponent<FooterCMAProps, any> {
  static contextTypes: {
    router: () => void
  };

  render () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { location, translations } = this.props
    const footerLabels = proecessTranslations('footer.label')(translations).map(([, value]) => ({ text: value }))

    const underData = footerData.map(({ title, ...item }) => ({
      ...item,
      title: translations[title],
    }))
    return (
      <>
        <Flex
          background={backgroundDarkColor}
        >
          <Container>
            <Flex>
              {underData && underData.map((item) => <PageLinkGroup {...item} />)}
            </Flex>
          </Container>
        </Flex>
        <Flex
          background={backgroundDarkLiteColor}
        >
          <Container>
            <Flex
              padding='2rem'
            >
              <PageLinkGroupHorizontal links={footerLabels} />
            </Flex>
          </Container>
        </Flex>
      </>
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

export const FooterCMA = WithTranslations('app')(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterCMABase as any as React.SFC<FooterCMAProps>)),
)
