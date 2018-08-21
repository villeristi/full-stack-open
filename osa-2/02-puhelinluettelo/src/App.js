import React from 'react';

import Person from './person'
import Filter from './filter'
import Form from './form'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filter: '',
      newPerson: {
        name: '',
        phone: '',
      }
    }
  }

  addPerson = (e) => {
    e.preventDefault()
    const { persons, newPerson } = this.state

    if( !this.personExists() ) {
      this.setState(() => {
        return { persons: [...persons, { name: newPerson.name, phone: newPerson.phone } ]}
      }, () => this.setState(() => {
        return {
          newPerson: {
            name: '',
            phone: ''
          }
        }
      }))
    }
  }

  personExists = () => {
    const { persons, newPerson } = this.state
    return persons.some(({ name }) => name === newPerson.name)
  }

  updateName = (e) => {
    const { newPerson } = this.state
    return this.setState({ newPerson: { ...newPerson, name: e.target.value }})
  }

  updatePhone = (e) => {
    const { newPerson } = this.state
    return this.setState({ newPerson: { ...newPerson, phone: e.target.value }})
  }

  updateFilter = (e) => {
    return this.setState({ filter: e.target.value })
  }

  render() {

    const { persons, newPerson, filter } = this.state
    const filteredPersons = persons.filter(({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    return (
      <div>
        <h1>Puhelinluettelo</h1>

        <Filter value={filter} onChange={this.updateFilter} />

        <Form
          onSubmit={this.addPerson}
          newPerson={newPerson}
          updateName={this.updateName}
          updatePhone={this.updatePhone}
         />

        <h2>Numerot</h2>
        <table>
          <tbody>
            {filteredPersons.map(({name, phone}, index) => <Person key={index} name={name} phone={phone} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
