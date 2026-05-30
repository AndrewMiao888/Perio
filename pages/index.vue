<template>
  <div class="periodic-app">
    <div class="search-panel">
      <input v-model="searchQuery" placeholder="Search element..." />
      <select v-model="filterMode">
        <option>None</option>
        <option>Atomic Number</option>
        <option>Type</option>
        <option>Symbol</option>
        <option>Name</option>
        <option>Period</option>
        <option>Group</option>
        <option>Mass</option>
      </select>
    </div>

    <div class="elements-grid">
      <div 
        v-for="element in filteredElements" 
        :key="element.atomicNumber" 
        class="element-card"
        @click="selectElement(element)"
      >
        <div>{{ element.atomicNumber }}</div>
        <div>{{ element.symbol }}</div>
        <div>{{ element.name }}</div>
      </div>
      <div v-if="filteredElements.length === 0">
        No results for "{{ searchQuery }}"
      </div>
    </div>

    <div class="element-info" v-if="selectedElement">
      <h2>{{ selectedElement.name }} ({{ selectedElement.symbol }})</h2>
      <p>Atomic Number: {{ selectedElement.atomicNumber }}</p>
      <p>Mass: {{ selectedElement.mass }}</p>
      <p>Type: {{ selectedElement.type }}</p>
      <p>Group: {{ selectedElement.group }}</p>
      <p>Period: {{ selectedElement.period }}</p>
      <p>Introduction: {{ selectedElement.intro }}</p>

      <div class="bohr-diagram">
        <!-- Placeholder for Bohr diagram -->
      </div>

      <div class="orbital-diagram">
        <!-- Placeholder for Orbital filling -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import elementsData from '~/data/elements.ts'

const searchQuery = ref('')
const filterMode = ref('None')
const selectedElement = ref(null)

const filteredElements = computed(() => {
  let filtered = elementsData

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(el => 
      el.name.toLowerCase().includes(query) ||
      el.symbol.toLowerCase().includes(query) ||
      String(el.atomicNumber) === query
    )
  }

  // Filter by filterMode if not None
  if (filterMode.value !== 'None') {
    filtered.sort((a,b) => {
      if (filterMode.value === 'Atomic Number') return a.atomicNumber - b.atomicNumber
      if (filterMode.value === 'Name') return a.name.localeCompare(b.name)
      if (filterMode.value === 'Symbol') return a.symbol.localeCompare(b.symbol)
      if (filterMode.value === 'Mass') return a.mass - b.mass
      if (filterMode.value === 'Period') return a.period - b.period
      if (filterMode.value === 'Group') return a.group - b.group
      return 0
    })
  }

  return filtered
})

function selectElement(el) {
  selectedElement.value = el
}
</script>

<style scoped>
.periodic-app { display: flex; flex-direction: column; gap: 1rem; padding: 1rem; }
.search-panel { display: flex; gap: 1rem; }
.elements-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 0.5rem; }
.element-card { border: 1px solid #aaa; padding: 0.5rem; cursor: pointer; text-align: center; }
.element-card:hover { background-color: #f0f0f0; }
.element-info { border: 1px solid #ccc; padding: 1rem; margin-top: 1rem; }
.bohr-diagram, .orbital-diagram { margin-top: 1rem; border: 1px dashed #999; padding: 0.5rem; }
</style>
