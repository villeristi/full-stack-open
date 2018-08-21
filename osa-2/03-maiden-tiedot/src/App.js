import React from 'react';
import { get } from 'axios'

import Filter from './filter'
import Country from './country'

const API_URL = 'https://restcountries.eu/rest/v2/all'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      filter: '',
    }
  }

  async componentDidMount() {
    const { countries } = this.state

    if( !countries.length ) {
      const { data } = await get(API_URL)
      this.setState({ countries: data })
    }
  }

  setSelected = (name) => {
    return this.setState({ filter: name.toLowerCase() })
  }

  updateFilter = (e) => {
    return this.setState({ filter: e.target.value })
  }

  render() {

    const { countries, filter } = this.state
    const filteredCountries = countries.filter(({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    const shouldDisplayList = filteredCountries.length > 0 && filteredCountries.length < 10
    const noCountries = filteredCountries.length === 0
    const displayFull = filteredCountries.length === 1

    return (
      <div>
        <Filter value={filter} onChange={this.updateFilter} />

        {noCountries && (<p>No matches found</p>)}
        {!shouldDisplayList && !noCountries && filter !== '' ? (<p>Too many matches, be more specific</p>) : null}

        {shouldDisplayList &&
          filteredCountries.map(({ name, nativeName, capital, population, flag }, index) =>
            <Country onClick={this.setSelected}
                     key={index}
                     name={name}
                     nativeName={nativeName}
                     capital={capital}
                     population={population}
                     flag={flag}
                     displayFull={displayFull} />
        )
        }
      </div>
    );
  }
}

export default App;
