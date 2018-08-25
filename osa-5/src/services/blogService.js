import { get } from 'axios'
import { API_URL } from './constants'

export const getAll = async () => {
  const { data } = await get(`${API_URL}/blogs`)
  return data
}
