import React from 'react';

const Person = ({ name, number, id, onDelete }) => <tr><td>{name}</td><td>{number}</td><td><button onClick={() => onDelete(id)}>Poista</button></td></tr>

export default Person
