import { ref, computed } from 'vue'
import { useApi } from './useApi'

export interface Element {
  atomicNumber: number
  symbol: string
  name: string
  group: number | null
  period: number
  block: 's' | 'p' | 'd' | 'f'
  standardState: 'solid' | 'liquid' | 'gas'
  classification: 'metal' | 'nonmetal' | 'metalloid'
  atomicMass: number
  [key: string]: any
}

export const useElements = () => {
  const api = useApi()
  
  const elements = ref<Element[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedElement = ref<Element | null>(null)
  const periodicTable = ref<any>(null)
  const statistics = ref<any>(null)

  // Fetch all elements
  const fetchElements = async (filters?: any) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.getElements(filters)
      elements.value = response.data.elements || response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch elements'
      console.error('Error fetching elements:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch a single element
  const fetchElement = async (atomicNumber: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.getElementById(atomicNumber)
      selectedElement.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch element'
      console.error('Error fetching element:', err)
    } finally {
      loading.value = false
    }
  }

  // Search elements
  const searchElements = async (query: string) => {
    if (!query.trim()) {
      elements.value = []
      return
    }
    loading.value = true
    error.value = null
    try {
      const response = await api.searchElements(query)
      elements.value = response.data.elements || response.data
    } catch (err: any) {
      error.value = err.message || 'Search failed'
      console.error('Error searching elements:', err)
    } finally {
      loading.value = false
    }
  }

  // Filter by classification
  const filterByClassification = async (classification: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.filterByClassification(classification)
      elements.value = response.data.elements || response.data
    } catch (err: any) {
      error.value = err.message || 'Filter failed'
      console.error('Error filtering by classification:', err)
    } finally {
      loading.value = false
    }
  }

  // Filter by period
  const filterByPeriod = async (period: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.filterByPeriod(period)
      elements.value = response.data.elements || response.data
    } catch (err: any) {
      error.value = err.message || 'Filter failed'
      console.error('Error filtering by period:', err)
    } finally {
      loading.value = false
    }
  }

  // Get periodic table
  const loadPeriodicTable = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.getPeriodicTable()
      periodicTable.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to load periodic table'
      console.error('Error loading periodic table:', err)
    } finally {
      loading.value = false
    }
  }

  // Get statistics
  const loadStatistics = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.getStatistics()
      statistics.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to load statistics'
      console.error('Error loading statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Computed properties
  const metals = computed(() => elements.value.filter(e => e.classification === 'metal'))
  const nonmetals = computed(() => elements.value.filter(e => e.classification === 'nonmetal'))
  const metalloids = computed(() => elements.value.filter(e => e.classification === 'metalloid'))

  const solids = computed(() => elements.value.filter(e => e.standardState === 'solid'))
  const liquids = computed(() => elements.value.filter(e => e.standardState === 'liquid'))
  const gases = computed(() => elements.value.filter(e => e.standardState === 'gas'))

  return {
    // State
    elements,
    selectedElement,
    loading,
    error,
    periodicTable,
    statistics,
    
    // Methods
    fetchElements,
    fetchElement,
    searchElements,
    filterByClassification,
    filterByPeriod,
    loadPeriodicTable,
    loadStatistics,
    
    // Computed
    metals,
    nonmetals,
    metalloids,
    solids,
    liquids,
    gases
  }
}
