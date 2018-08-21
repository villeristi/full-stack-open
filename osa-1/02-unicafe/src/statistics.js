import React from 'react';

import Statistic from './statistic.js'

const round = (val) => Math.round(val * 10) / 10

const Statistics = ({stats, values}) => {

  const statsKeys = Object.keys(stats)
  const totalStats = statsKeys.reduce((a, key) => a + stats[key], 0)
  const hasStats = totalStats > 0
  const avg = statsKeys.reduce((a, key) => a + values[key].avg * stats[key], 0) / totalStats
  const positive = ( stats.good / totalStats ) * 100

  return (
    <div>
      <h2>Statistiikka</h2>
      {!hasStats ?
        <p>Ei yhtään palautetta annettu</p> :
        <table>
          <tbody>
            {statsKeys.map((key, index) => <Statistic key={index} label={values[key].label} value={stats[key]} />)}
            <Statistic label="keskiarvo" value={round(avg)} />
            <Statistic label="positiivisia" value={round(positive)} suffix="%" />
          </tbody>
        </table>
      }
    </div>
  )
}

export default Statistics
