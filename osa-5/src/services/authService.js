import { post } from 'axios'
import { API_URL } from './constants';

const login = async (credentials) => {
  const { data } = await post(`${API_URL}/auth/login`, credentials)
  return data
}

export default { login }
