import React from 'react'

const Yhteensa = ({osat}) => {
  const total = osat.reduce((a, {tehtavia}) => a + tehtavia, 0)

  return (
    <p>Yhteensä {total} tehtävää</p>
  )
}

export default Yhteensa
