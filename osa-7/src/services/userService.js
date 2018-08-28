import axios, { get } from 'axios'
import { API_URL } from './constants'
import * as storage from '../util/localStorage'

if(storage.get('user')){
  const { token } = storage.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getAll = async () => {
  const { data } = await get(`${API_URL}/users`)
  return data
}

export const getSingle = async (id) => {
  const { data } = await get(`${API_URL}/users/${id}`)
  return data
}
