import React, { memo } from 'react'

import { Icon, Token } from './components'
import './styles/index.scss'

export const Main = memo(() => (
  <>
    <Icon />
    <Token />
  </>
))

export { Icon, Token } from './components'
