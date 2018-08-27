import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../../App'

const Root = () => (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </div>
)

export default Root
