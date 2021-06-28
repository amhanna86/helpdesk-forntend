import axios from 'axios'

const token = localStorage.getItem('token')
export const authAxios = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Authorization: 'Bearer ' + token,
  },
})
