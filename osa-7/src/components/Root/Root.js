import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../../App'
import LoginForm from '../Auth/LoginForm'
import UserList from '../Users/UserList'
import Header from '../Header/Header';
import SingleUser from '../Users/SingleUser';

const NotFound = () => {
  return (
    <div>Not found :(</div>
  )
}

const Root = () => (
  <div>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:id" component={SingleUser} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </div>
)

export default Root
