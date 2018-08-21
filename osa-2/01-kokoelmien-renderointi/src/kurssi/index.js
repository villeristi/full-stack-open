import React from 'react';

import Otsikko from './otsikko'
import Sisalto from './sisalto'
import Yhteensa from './yhteensa'

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

export default Kurssi
