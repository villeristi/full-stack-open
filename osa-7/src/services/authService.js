import { post } from 'axios'
import { API_URL } from './constants';
import * as storage from '../util/localStorage'

export const login = async (credentials) => {
  const { data } = await post(`${API_URL}/auth/login`, credentials)
  storage.set('user', data)

  return data
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    if(storage.remove('user')){
      return resolve()
    }

    return reject()
  })
}
