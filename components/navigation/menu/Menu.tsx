import React, { Component } from 'react'
import { toPairs, fromPairs, pipe, map } from 'ramda'
import { NavHashLink } from 'react-router-hash-link'
import { createSelector, createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import ControllableDropdownMenu from './DropdownMenu2'
import './navbar.scss'

function myFunction() {
  const x = document.getElementById('myTopnav')
  if (x.className === 'rs-topnav') {
    x.className += ' rs-responsive'
  } else {
    x.className = 'rs-topnav'
  }
}
type State = {
  isOpen: boolean
  isDropDownOpen: boolean
}

class Menu extends Component<any, State> {
  state: State = {
    isOpen: false,
    isDropDownOpen: false,
  }

  onMouseEnter = () => {
    this.setState({ isDropDownOpen: true })
  }

  onMouseLeave = () => {
    this.setState({ isDropDownOpen: false })
  }

  getMenuSections = (pages, menuSections) => {
    const sections = {}
    let menuSection
    pages.forEach((item) => {
      menuSection = this.getMenuItemSection(item)
      if (menuSection && menuSections && menuSections[menuSection]) {
        sections[menuSection] = sections[menuSection] || []
        sections[menuSection].push(item)
      }
    })
    const orderedSection = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const sectionName of menuSections) {
      if (sections[sectionName]) {
        orderedSection[sectionName] = sections[sectionName]
      }
    }
    return toPairs(orderedSection)
  }

  getMenuItemSection = (item) => (item.menuSection ? item.menuSection[0].text : '')

  getMenuItemLabel = (item) => (item.menuLabel ? item.menuLabel[0].text : item.title[0].text)

  getMenuItems = (label, section, route, hash?) => ({
    label: label || this.getMenuItemLabel(section[0]),
    left: true,
    openOnHover: true,
    items: section ? section.map((item) => ({
      label: this.getMenuItemLabel(item),
      hashLink: true,
      to: `/${route}${hash ? '#' : '/'}${item.id}`,
      activeClassName: 'active',
    })) : [],
  })

  toggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }))
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  scrollHandler = (element: any) => element.scrollIntoView({ behavior: 'smooth' })
  /* const offset = 20
    const elementPosition = element.offsetTop - offset;
    return window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    }); */


  renderMenuItems = (menuItems) => <ControllableDropdownMenu {...menuItems} />

  render() {
    const { menuSections, pages, articles, presentations } = this.props

    let sections
    let sectionsPres
    if (pages && pages.length) {
      sections = this.getMenuSections(pages, menuSections)
    }

    if (menuSections && presentations && presentations.length) {
      menuSections.presentations = 'Presentations'
      sectionsPres = this.getMenuSections(presentations, menuSections)
    }

    let menuItems = sections && sections.length
      ? sections.map(([sectionName, items]) => this.getMenuItems(menuSections[sectionName], items, 'page'))
      : []

    if (sectionsPres && sectionsPres.length) {
      menuItems = menuItems.concat(sectionsPres.map(([sectionName, items]) => (
        this.getMenuItems(sectionName, items, 'presentations', true))))
    }

    menuItems.shift()

    menuItems.splice(menuItems.length - 1, 0, {
      label: 'News',
      left: true,
      openOnHover: true,
      items: articles ? articles.map((item) => ({
        label: item.menuLabel ? item.menuLabel[0].text : item.title[0].text,
        hashLink: true,
        to: `/news#${item.id}`,
        activeClassName: 'active',
      })) : null,
    })
    const showMenuItems = menuItems && menuItems.length
    return (
      <span>
        <div className='pv-header-overlay' />
        <div className='pv-header'>
          <div className='rs-topnav' id='myTopnav'>
            <NavHashLink
              smooth
              to='/page/home'
              activeClassName='active'
              className='pv-header-logo'
              style={{ margin: '10px' }}
              scroll={this.scrollHandler}
            />
            {showMenuItems && <div style={{ margin: '10px' }}>{menuItems.map(this.renderMenuItems)}</div>}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href='#'
              style={{ fontSize: '15px' }}
              className='icon'
              onClick={myFunction}
            >
              &#9776;
            </a>
          </div>
        </div>
      </span>
    )
  }
}


const rootSelector = (state: any) => state.cms

const menu: any = createSelector(
  [rootSelector],
  (cms: any) => cms.menu,
)

const menuSections: any = createSelector(
  [menu],
  (menu: any) => (menu && menu.length ? pipe(
    map((menu) => ([menu.menuSection, menu.menuLabel])),
    fromPairs,
  )(menu) : null),
)

const pages: any = createSelector(
  [rootSelector],
  (cms: any) => cms.pages,
)

const pagesection: any = createSelector(
  [pages],
  (pages: any) => (pages ? pages.pagesection : null),
)

const articles: any = createSelector(
  [pages],
  (pages: any) => (pages ? pages.article : null),
)

const presentations: any = createSelector(
  [pages],
  (pages: any) => (pages ? pages.presentationpage : null),
)

const mapStateToProps = createStructuredSelector({ menu, menuSections, pages: pagesection, articles, presentations })

// export default withRouter(connect(mapStateToProps)(Menu))
export default connect(mapStateToProps)(Menu)
