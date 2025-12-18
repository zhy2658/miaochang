import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8787',
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  }
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service

