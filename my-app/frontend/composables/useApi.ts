import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const useApi = () => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Generic HTTP methods
  const get = (url: string) => api.get(url)
  const post = (url: string, data: any) => api.post(url, data)
  const put = (url: string, data: any) => api.put(url, data)
  const delete_ = (url: string) => api.delete(url)

  // Element-specific methods
  const getElements = (filters?: any) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.append(key, String(value))
        }
      })
    }
    const queryString = params.toString()
    return api.get(`/elements${queryString ? '?' + queryString : ''}`)
  }

  const getElementById = (atomicNumber: number) => {
    return api.get(`/elements/${atomicNumber}`)
  }

  const getElementBySymbol = (symbol: string) => {
    return api.get(`/elements/by-symbol/${symbol}`)
  }

  const createElement = (element: any) => {
    return api.post('/elements', element)
  }

  const getPeriodicTable = () => {
    return api.get('/periodic-table')
  }

  const getStatistics = () => {
    return api.get('/statistics')
  }

  // Search elements
  const searchElements = (query: string) => {
    return getElements({ search: query })
  }

  // Filter by classification
  const filterByClassification = (classification: string) => {
    return getElements({ classification })
  }

  // Filter by period
  const filterByPeriod = (period: number) => {
    return getElements({ period })
  }

  // Filter by group
  const filterByGroup = (group: number) => {
    return getElements({ group })
  }

  return {
    // Generic methods
    get,
    post,
    put,
    delete: delete_,
    
    // Element methods
    getElements,
    getElementById,
    getElementBySymbol,
    createElement,
    getPeriodicTable,
    getStatistics,
    searchElements,
    filterByClassification,
    filterByPeriod,
    filterByGroup
  }
}
