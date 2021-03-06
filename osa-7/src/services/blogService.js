import { get, post, put, delete as del } from 'axios'
import { API_URL } from './constants'
import * as storage from '../util/localStorage'

const getHeaders = () => {
  const headers = {}
  if(storage.get('user')){
    const { token } = storage.get('user')
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export const getAll = async () => {
  const { data } = await get(`${API_URL}/blogs`)
  return data
}

export const create = async (blogData) => {
  const { data } = await post(`${API_URL}/blogs`, blogData, { headers: getHeaders() })
  return data
}

export const remove = async (id) => {
  const { data } = await del(`${API_URL}/blogs/${id}`, { headers: getHeaders() })
  return data
}

export const like = async (blogData) => {
  delete blogData.user
  const { data } = await put(`${API_URL}/blogs/${blogData.id}`, blogData)

  return data
}

export const comment = async (id, content) => {
  const { data } = await post(`${API_URL}/blogs/${id}/comment`, { comment: content })

  return data
}
