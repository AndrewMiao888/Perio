import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const useApi = () => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const get = (url: string) => api.get(url)
  const post = (url: string, data: any) => api.post(url, data)
  const put = (url: string, data: any) => api.put(url, data)
  const delete_ = (url: string) => api.delete(url)

  return {
    get,
    post,
    put,
    delete: delete_
  }
}
