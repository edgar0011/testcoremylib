/* eslint-disable no-console */
import React, { PureComponent } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
import { NavHashLink } from 'react-router-hash-link'
import { withRouter, NavLink } from 'react-router-dom'
// import { Link } from 'react-scroll'

type State = {
  isDropDownOpen: boolean
}

type Item = {
  label: string
  hashLink?: boolean
  to?: string
  scroll?: (element?: HTMLElement) => void
  activeClassName?: string
}

class ControlledDropdownMenu extends PureComponent<any, State> {
  state = {
    isDropDownOpen: false,
  }

  onMouseEnter = () => {
    this.setState({ isDropDownOpen: true })
  }

  onMouseLeave = () => {
    this.setState({ isDropDownOpen: false })
  }

  toggleDropDown = () => {
    this.setState((prevState) => ({ isDropDownOpen: !prevState.isDropDownOpen }))
  }

  scrollHandler = (element: HTMLElement) => element.scrollIntoView({ behavior: 'smooth' })

  renderNavItem = ({ hashLink, ...item }: Item) => {
    let newItem = item
    if (hashLink && !item.scroll) {
      newItem = { ...item, scroll: this.scrollHandler }
    }
    const isActive = this.props.location.pathname + this.props.location.hash === item.to
    const classes = `nav-link ${isActive ? item.activeClassName || '' : ''}`
    return (
      <DropdownItem key={newItem.label}>
        {hashLink
          // ? <Link spy smooth class='nav-link' {...newItem} >{newItem.label}</Link>
          ? <NavHashLink smooth class={classes} {...newItem}>{newItem.label}</NavHashLink>
          : <NavLink class={classes} {...newItem}>{newItem.label}</NavLink>
        }
      </DropdownItem>
    )
  }

  render () {
    const { openOnHover, label, items } = this.props
    return (
      <Dropdown
        nav
        inNavbar
        onFocus={openOnHover ? this.onMouseEnter : null}
        onMouseOver={openOnHover ? this.onMouseEnter : null}
        onMouseLeave={openOnHover ? this.onMouseLeave : null}
        isOpen={this.state.isDropDownOpen}
        toggle={this.toggleDropDown}
      >
        <DropdownToggle nav>
          {items && items.length && this.renderNavItem({ ...items[0], label: label || items[0].label })}
        </DropdownToggle>
        <DropdownMenu left>
          {items && items.length && items.map(this.renderNavItem)}
        </DropdownMenu>

      </Dropdown>
    )
  }
}

export default withRouter(ControlledDropdownMenu)
