<template>
  <div class="periodic-table-container">
    <!-- Controls -->
    <div class="controls">
      <div class="search-filter">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by name or symbol..." 
          class="search-input"
          @input="handleSearch"
        />
        <div class="filter-buttons">
          <button 
            v-for="classification in classifications" 
            :key="classification"
            :class="['filter-btn', { active: activeFilter === classification }]"
            @click="handleFilter(classification)"
          >
            {{ classification }}
          </button>
          <button 
            :class="['filter-btn', { active: activeFilter === null }]"
            @click="activeFilter = null; filteredElements = elements"
          >
            All
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading periodic table...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Periodic Table Grid -->
    <div v-if="!loading && !error" class="periodic-table-grid">
      <div 
        v-for="element in filteredElements" 
        :key="element.atomicNumber"
        :class="['element-cell', `period-${element.period}`, `group-${element.group || 'none'}`, element.classification]"
        @click="selectElement(element)"
      >
        <div class="atomic-number">{{ element.atomicNumber }}</div>
        <div class="symbol">{{ element.symbol }}</div>
        <div class="name">{{ element.name }}</div>
        <div class="atomic-mass">{{ element.atomicMass?.toFixed(3) }}</div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color metal"></div>
        <span>Metal</span>
      </div>
      <div class="legend-item">
        <div class="legend-color nonmetal"></div>
        <span>Nonmetal</span>
      </div>
      <div class="legend-item">
        <div class="legend-color metalloid"></div>
        <span>Metalloid</span>
      </div>
    </div>

    <!-- Element Detail Modal (optional) -->
    <div v-if="selectedElement" class="element-modal" @click.self="selectedElement = null">
      <div class="modal-content">
        <button class="close-btn" @click="selectedElement = null">×</button>
        <div class="modal-header">
          <div class="modal-title">
            <h2>{{ selectedElement.name }}</h2>
            <p class="symbol-large">{{ selectedElement.symbol }}</p>
          </div>
          <div class="modal-number">{{ selectedElement.atomicNumber }}</div>
        </div>
        <div class="modal-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Atomic Mass:</span>
              <span class="value">{{ selectedElement.atomicMass }}</span>
            </div>
            <div class="info-item">
              <span class="label">Period:</span>
              <span class="value">{{ selectedElement.period }}</span>
            </div>
            <div class="info-item">
              <span class="label">Group:</span>
              <span class="value">{{ selectedElement.group || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Block:</span>
              <span class="value">{{ selectedElement.block }}</span>
            </div>
            <div class="info-item">
              <span class="label">State:</span>
              <span class="value">{{ selectedElement.standardState }}</span>
            </div>
            <div class="info-item">
              <span class="label">Classification:</span>
              <span class="value">{{ selectedElement.classification }}</span>
            </div>
          </div>
          <div v-if="selectedElement.intro" class="description">
            {{ selectedElement.intro }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useElements } from '~/composables/useElements'

const { elements, loading, error, fetchElements, selectedElement } = useElements()

const searchQuery = ref('')
const activeFilter = ref<string | null>(null)
const classifications = ['metal', 'nonmetal', 'metalloid']

const filteredElements = computed(() => {
  if (!elements.value) return []
  
  let filtered = elements.value
  
  if (activeFilter.value) {
    filtered = filtered.filter(e => e.classification === activeFilter.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(query) ||
      e.symbol.toLowerCase().includes(query)
    )
  }
  
  return filtered.sort((a, b) => a.atomicNumber - b.atomicNumber)
})

const handleSearch = () => {
  // Search is handled by computed property
}

const handleFilter = (classification: string) => {
  activeFilter.value = activeFilter.value === classification ? null : classification
}

const selectElement = (element: any) => {
  selectedElement.value = element
}

onMounted(() => {
  fetchElements()
})
</script>

<style scoped lang="css">
.periodic-table-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.controls {
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: capitalize;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.loading,
.error {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #333;
}

.error {
  background: rgba(255, 100, 100, 0.95);
  color: #8b0000;
}

.periodic-table-grid {
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  gap: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.element-cell {
  aspect-ratio: 1;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
}

.element-cell.metal {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.element-cell.nonmetal {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.element-cell.metalloid {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.element-cell:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.atomic-number {
  font-size: 0.65rem;
  opacity: 0.8;
}

.symbol {
  font-size: 1.2rem;
  margin: 0.25rem 0;
}

.name {
  font-size: 0.55rem;
  opacity: 0.9;
}

.atomic-mass {
  font-size: 0.6rem;
  opacity: 0.7;
}

.legend {
  display: flex;
  gap: 2rem;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 2px;
}

.legend-color.metal {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.legend-color.nonmetal {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.legend-color.metalloid {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* Modal Styles */
.element-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #000;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.modal-title h2 {
  margin: 0;
  color: #333;
}

.symbol-large {
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0 0 0;
}

.modal-number {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
  opacity: 0.3;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.85rem;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
}

.value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.description {
  padding: 1rem;
  background: #f9f9f9;
  border-left: 4px solid #667eea;
  border-radius: 4px;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .periodic-table-grid {
    grid-template-columns: repeat(10, 1fr);
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .legend {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
