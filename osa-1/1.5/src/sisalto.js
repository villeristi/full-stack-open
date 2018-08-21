import React from 'react';

import Osa from './osa.js'

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map((osa, index) => <Osa key={index} osa={osa} />)}
    </div>
  )
}

export default Sisalto
