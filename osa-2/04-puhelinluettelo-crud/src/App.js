import React from 'react';

import * as crudService from './services/crudService'

import Person from './person'
import Filter from './filter'
import Form from './form'

const blankPerson = {
  name: '',
  number: '',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filter: '',
      newPerson: blankPerson
    }
  }

  async componentDidMount() {
    const { persons } = this.state
    if( !persons.length ) {
      const { data } = await crudService.get()
      this.setState({ persons: data })
    }
  }

  addPerson = async (e) => {
    e.preventDefault()
    const { persons, newPerson } = this.state
    const existingPerson = this.existingPerson()

    if( !existingPerson ) {
      const { data } = await crudService.create(newPerson)

      this.setState(() => {
        return { persons: [...persons, { name: data.name, number: data.number, id: data.id } ]}
      }, () => this.clearFields())
    } else {
      return this.updatePerson(newPerson, existingPerson.id)
    }
  }

  updatePerson = async (personData, id) => {
    const { persons } = this.state
    const really = window.confirm(`Henkilö ${personData.name} on jo luettelossa, korvataanko numero uudella?`)

    if( really ) {
      const personIndex = persons.findIndex((person) => person.id === id)
      const { data } = await crudService.update(id, personData)
      persons[personIndex] = data
      this.setState({ persons }, () => console.log(this.state.persons))
      this.clearFields()
    }
  }

  deletePerson = async (id) => {
    const persons = [ ...this.state.persons ]
    const selectedPerson = persons.find((person) => person.id === id)
    const personIndex = persons.findIndex(({ id }) => id === selectedPerson.id)
    const really = window.confirm(`Poistetaanko ${selectedPerson.name}?`)

    if( really ) {
      try {
        await crudService.del(id)
        persons.splice(personIndex)

        return this.setState({ persons })

      } catch(e) {
        alert('Something went wrong :(')
      }
    }
  }

  existingPerson = () => {
    const { persons, newPerson } = this.state
    return persons.find(({ name }) => name === newPerson.name)
  }

  updateName = (e) => {
    const { newPerson } = this.state
    return this.setState({ newPerson: { ...newPerson, name: e.target.value }})
  }

  updateNumber = (e) => {
    const { newPerson } = this.state
    return this.setState({ newPerson: { ...newPerson, number: e.target.value }})
  }

  updateFilter = (e) => {
    return this.setState({ filter: e.target.value })
  }

  clearFields = () => {
    return this.setState({ newPerson: { name: '', number: '' }})
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
          updateNumber={this.updateNumber}
         />

        <h2>Numerot</h2>
        <table>
          <tbody>
            {filteredPersons.map(({name, number, id}, index) => <Person key={index} name={name} number={number} id={id} onDelete={this.deletePerson} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
