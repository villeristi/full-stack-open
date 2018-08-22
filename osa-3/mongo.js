const db = require('./api/config/mongo')
const Person = require('./api/config/models')

db.connect()

if( process.argv.length === 2 ) {
  return Person
    .find()
    .then((persons) => {
      console.log('puhelinluettelo:')
      persons.forEach( person => {
        console.log(person.name, person.number)
      })
      db.close()
    })
}

const name = process.argv[2]
const number = process.argv[3]
const person = new Person({
  name,
  number
})

console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)

person
  .save()
  .then((res) => {
    console.log(`Henkilö ${name} lisätty luetteloon!`)
    db.close()
  })
