import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../../App'
import LoginForm from '../Auth/LoginForm'
import UserList from '../Users/UserList'
import Header from '../Header/Header';
import SingleUser from '../Users/SingleUser';
import BlogList from '../Blog/BlogList';
import SingleBlog from '../Blog/SingleBlog';

const NotFound = () => {
  return (
    <div>Not found :(</div>
  )
}

const Root = () => (
  <div>
    <Router>
      <div>
        <App>
          <Header />
          <Switch>
            <Route exact path="/" component={BlogList}/>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route exact path="/blogs/:id" component={SingleBlog} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </div>
    </Router>
  </div>
)

export default Root
