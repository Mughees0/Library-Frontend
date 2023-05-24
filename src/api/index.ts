import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

const token = getTokenFromStorage()

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: { Authorization: `Bearer ${token}` }
})

export default api
