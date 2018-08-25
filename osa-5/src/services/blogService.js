import axios, { get, post, put } from 'axios'
import { API_URL } from './constants'
import * as storage from '../util/localStorage'

if(storage.get('user')){
  const { token } = storage.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getAll = async () => {
  const { data } = await get(`${API_URL}/blogs`)
  return data
}

export const create = async (blogData) => {
  const { data } = await post(`${API_URL}/blogs`, blogData)
  return data
}

export const like = async (blogData) => {
  delete blogData.user
  const { data } = await put(`${API_URL}/blogs/${blogData.id}`, blogData)

  return data
}
