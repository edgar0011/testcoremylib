import React from 'react'
import ReactDOM from 'react-dom'
import { Token } from 'core-my-lib'

import 'core-my-lib/dist/bundle.css'

console.log(Token)

const app = document.getElementById('app')
ReactDOM.render(
  <>
    <div>Hello</div>
    <Token />
  </>,
  app,
)
