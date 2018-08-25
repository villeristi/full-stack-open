import React from 'react'

import Button from './components/button.js'
import Statistics from './components/statistics.js'
import { VALUES } from './constants'

export default class App extends React.Component {
  handleClick = (val) => {
    this.props.store.dispatch({ type: val.toUpperCase() })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button onClick={() => this.handleClick(VALUES.good.value)} label={VALUES.good.label} />
        <Button onClick={() => this.handleClick(VALUES.neutral.value)} label={VALUES.neutral.label} />
        <Button onClick={() => this.handleClick(VALUES.bad.value)} label={VALUES.bad.label} />

        <Statistics stats={this.props.store.getState()} values={VALUES} />
      </div>
    )
  }
}
