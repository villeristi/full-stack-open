import { get, post, put } from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:3001'

export const getAll = async () => {
  const { data } = await get(`${API_URL}/anecdotes`)
  return data
}

export const create = async (item) => {
  const { data } = await post(`${API_URL}/anecdotes`, item)
  return data
}

export const update = async (id, item) => {
  const { data } = await put(`${API_URL}/anecdotes/${id}`, item)
  return data
}
