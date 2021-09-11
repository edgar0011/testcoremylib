import React from 'react'
import ReactDOM from 'react-dom'
import { Token } from 'core-my-lib'

import 'core-my-lib/dist/bundle.css'

const app = document.getElementById('app')
ReactDOM.render(
  <>
    <div>Hello</div>
    <Token />
  </>,
  app,
)
