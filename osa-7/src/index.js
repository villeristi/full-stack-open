import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './components/Root/Root';
import store from './store'


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
