import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

const token = getTokenFromStorage()

const api = axios.create({
  baseURL: 'https://library-backend-gtgw.onrender.com/api/v1',
  headers: { Authorization: `Bearer ${token}` }
})

export default api
