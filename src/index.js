import React from 'react'
import ReactDOM from 'react-dom'
import { Token } from 'core-my-lib'

console.log(Token)

const app = document.getElementById('app')
ReactDOM.render(
  <>
    <div>Hello</div>
    <Token />
  </>,
  app,
)
