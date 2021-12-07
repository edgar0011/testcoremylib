import React from 'react'
import ReactDOM from 'react-dom'
import { Token } from 'core-my-lib'
import rxk from '@earlorg/redux-kit'
// eslint-disable-next-line import/no-unresolved
import * as redux from '@earlorg/redux-kit/redux'
// eslint-disable-next-line import/no-unresolved
import * as utils from '@earlorg/redux-kit/utils'
import { memoize } from '@earlorg/redux-kit/utils'

import 'core-my-lib/dist/bundle.css'

import './module.loader'

console.log('rxk')
console.log(rxk)
console.log('utils', utils)
console.log('redux', redux)

console.log('memoize')
console.log(memoize)

const app = document.getElementById('app')
ReactDOM.render(
  <>
    <div>Hello</div>
    <Token />
  </>,
  app,
)
