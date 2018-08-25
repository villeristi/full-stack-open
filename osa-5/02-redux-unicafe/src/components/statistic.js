import React from 'react';

const Statistic = ({label, value, suffix}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value} {suffix && suffix}</td>
    </tr>
  )
}

export default Statistic
