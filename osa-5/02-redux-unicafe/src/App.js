import React from 'react'

import Button from './components/button.js'
import Statistics from './components/statistics.js'
import { VALUES } from './constants'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stats: {
        [VALUES.good.value]: 0,
        [VALUES.neutral.value]: 0,
        [VALUES.bad.value]: 0,
      }
    }
  }

  handleClick = (val) => {
    this.setState(() => {
      return {
        stats: {
          ...this.state.stats,
          [val]: this.state.stats[val] + 1
        }
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button onClick={() => this.handleClick(VALUES.good.value)} label={VALUES.good.label} />
        <Button onClick={() => this.handleClick(VALUES.neutral.value)} label={VALUES.neutral.label} />
        <Button onClick={() => this.handleClick(VALUES.bad.value)} label={VALUES.bad.label} />

        <Statistics stats={this.state.stats} values={VALUES} />
      </div>
    )
  }
}
