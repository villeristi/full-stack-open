import React from 'react'

const Country = ({ name, nativeName, capital, population, flag, displayFull, onClick }) => {
  return (
    <div onClick={() => onClick(name)}>
      {!displayFull && <p>{name} {nativeName}</p>}
      {displayFull && (
      <div>
        <h2>{name} {nativeName}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <img src={flag} alt={`The flag of ${name}`} />
      </div>
      )}
    </div>
  )
}

export default Country
