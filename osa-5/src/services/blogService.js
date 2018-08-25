import { get } from 'axios'
import { API_URL } from './constants'

const getAll = async () => {
  const { data } = await get(`${API_URL}/blogs`)
  return data
}

export default { getAll }
