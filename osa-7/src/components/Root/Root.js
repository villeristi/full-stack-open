import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../../App'
import LoginForm from '../Login/LoginForm'

const NotFound = () => {
  return (
    <div>Not found :(</div>
  )
}

const Root = () => (
  <div>
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LoginForm} />
            <Route component={NotFound} />
        </Switch>
        </div>
    </Router>
  </div>
)

export default Root
