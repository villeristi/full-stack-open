import { get as aGet, post, put, delete as aDel } from 'axios'

const API_URL = 'http://localhost:3001/persons'

export const get = (id = '') => {
  return aGet(`${API_URL}/${id}`)
}

export const create = (person) => {
  return post(API_URL, person)
}

export const update = (id, person) => {
  return put(`${API_URL}/${id}`, person)
}

export const del = (id) => {
  return aDel(`${API_URL}/${id}`)
}
