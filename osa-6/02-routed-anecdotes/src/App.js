import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {

  const menuStyle = {
    background: '#ccc',
    margin: '10px 0'
  }

  const linkStyle = {
    margin: '0 5px',
    color: '#222',
    padding: '10px 5px',
    display: 'inline-block',
    textDecoration: 'none',
  }

  return (
    <div style={menuStyle}>
      <NavLink exact to='/' style={linkStyle}>anecdotes</NavLink>
      <NavLink exact to='/create' style={linkStyle}>create new</NavLink>
      <NavLink exact to='/about' style={linkStyle}>about</NavLink>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <p>{anecdote.content}</p>
)

const About = () => (
  <div className="row">
    <div className="col-8">
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className="col-4">
      <img src="https://avatars0.githubusercontent.com/u/523235?s=460&v=4" alt="lé famous dude" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}

const Notification = ({ notification }) => {
  if (!notification.length) {
    return null
  }

  return (
    <Alert color="success">{notification}</Alert>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  displayNotification = (notification, timeout = 5000) => {
    this.setState({ notification }, () => {
      return setTimeout(() => {
        this.setState({ notification: '' })
      }, timeout)
    })
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) }, () => this.displayNotification(`a new anecdote '${anecdote.content}' created!`))
  }

  anecdoteById = (id) => {
    return this.state.anecdotes.find(a => a.id === id)
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    return this.setState({ anecdotes })
  }

  render() {
    return (
       <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            <Notification notification={this.state.notification}/>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/anecdotes/:id" render={({ match: { params: { id } } }) => <Anecdote anecdote={this.anecdoteById(id)} /> } />
            <Route exact path="/create" render={({ history }) => <CreateNew addNew={this.addNew} history={history} /> } />
            <Route exact path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
