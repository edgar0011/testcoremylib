/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { NavHashLink } from 'react-router-hash-link';
import { withRouter, NavLink } from 'react-router-dom';
// import { Link } from 'react-scroll'

type State = {
  isDropDownOpen: boolean
}

type Item = {
  label: string,
  hashLink?: boolean,
  to?: string,
  scroll?: Function,
  activeClassName?: string
}

class ControlledDropdownMenu extends PureComponent<any, State> {

  state = {
    isDropDownOpen: false
  }

  onMouseEnter = () => {
    this.setState({ isDropDownOpen: true });
  }

  onMouseLeave = () => {
    this.setState({ isDropDownOpen: false });
  }

  toggleDropDown = () => {
    this.setState({
      isDropDownOpen: !this.state.isDropDownOpen
    });
  }

  scrollHandler = (element: any) => {
    return element.scrollIntoView({ behavior: 'smooth' })
    /*const offset = 20
    const elementPosition = element.offsetTop - offset;
    return window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    });*/
  }

  renderNavItem = ({ hashLink, ...item }: Item) => {
    let newItem = item
    if (hashLink && !item.scroll) {
      newItem = { ...item, scroll: this.scrollHandler }
    }
    const isActive = this.props.location.pathname + this.props.location.hash === item.to
    const classes = 'nav-link ' + (isActive ? item.activeClassName || '' : '')
    return (
      <span key={newItem.label} >
        {hashLink
          //? <Link spy smooth class='nav-link' {...newItem} >{newItem.label}</Link>
          ? <NavHashLink smooth class={classes} {...newItem} >{newItem.label}</NavHashLink>
          : <NavLink  class={classes} {...newItem} >{newItem.label}</NavLink>
        }
      </span>
    )
  }

  render() {
    const { openOnHover, label, items } = this.props
    return (
      <div className='rs-dropdown'>
        <div className='rs-dropbtn'>
          {items && items.length && this.renderNavItem({ ...items[0], label: label || items[0].label } )}
        </div>
        <div className='rs-dropdown-content'>
          {items && items.length && items.map(this.renderNavItem)}
        </div>

      </div>
    )
  }
}

export default withRouter(ControlledDropdownMenu)
