import React from 'react'
import ReactDOM from 'react-dom'
import { Token } from 'core-my-lib'
import { quarks, redux } from '@earlorg/redux-kit'

import 'core-my-lib/dist/bundle.css'

console.log('rekit')
console.log('quarks', quarks)
console.log('redux', redux)

const app = document.getElementById('app')
ReactDOM.render(
  <>
    <div>Hello</div>
    <Token />
  </>,
  app,
)
