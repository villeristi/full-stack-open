const db = require('./config/mongo')
const Person = require('./config/models')

db.connect()

if( process.argv.length < 4 ) {
  return console.log('Dude...')
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
