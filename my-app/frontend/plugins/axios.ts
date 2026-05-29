import axios from 'axios'

export default defineNuxtPlugin(() => {
  axios.defaults.baseURL = 'http://localhost:5000/api'
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  // Response interceptor for error handling
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axios
    }
  }
})
