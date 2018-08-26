import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import rootStore from './store'
import App from './App'

const store = createStore(rootStore)

const render = () => {
  return ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
