import React from 'react'

const Form = ({ onSubmit, newPerson, updateName, updatePhone}) => {
  return (
    <div>
      <h2>Lisää uusi</h2>
      <form onSubmit={onSubmit}>
        <div>
          nimi: <input value={newPerson.name} onChange={updateName} />
        </div>
        <div>
          numero: <input value={newPerson.phone} onChange={updatePhone} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default Form
