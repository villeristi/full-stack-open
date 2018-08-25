import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import App from './App'
import rootStore from './store'

const store = createStore(rootStore)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
