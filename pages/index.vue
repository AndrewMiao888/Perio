<template>
  <div class="app-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-content">
        <h1 class="logo">Perio</h1>
        <div class="nav-links">
          <button class="nav-btn" @click="currentView = 'table'">Periodic Table</button>
          <button class="nav-btn" @click="currentView = 'learn'">Learn</button>
          <button class="nav-btn" @click="currentView = 'quiz'">Quiz</button>
          <button class="theme-toggle" @click="toggleTheme">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Landing/Home View -->
      <section v-if="currentView === 'home'" class="landing-page">
        <div class="hero">
          <h1>Perio - Interactive Periodic Table</h1>
          <p class="subtitle">
            Explore all 118 elements with atomic data, orbital diagrams, and interactive learning tools
          </p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="currentView = 'table'">
              Explore the Periodic Table
            </button>
            <button class="btn btn-secondary" @click="currentView = 'learn'">
              Start Learning
            </button>
          </div>
        </div>

        <section class="features">
          <h2>Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h3>📊 Interactive Periodic Table</h3>
              <p>Explore all 118 elements with detailed atomic information</p>
            </div>
            <div class="feature-card">
              <h3>🔍 Search & Filter</h3>
              <p>Filter by classification, period, or search by name/symbol</p>
            </div>
            <div class="feature-card">
              <h3>📚 Element Encyclopedia</h3>
              <p>Comprehensive data including electron configuration and properties</p>
            </div>
            <div class="feature-card">
              <h3>🎓 Learning Tools</h3>
              <p>Quizzes, flashcards, and interactive lessons coming soon</p>
            </div>
          </div>
        </section>
      </section>

      <!-- Periodic Table View -->
      <section v-if="currentView === 'table'" class="table-view">
        <PeriodicTable />
      </section>

      <!-- Learn View -->
      <section v-if="currentView === 'learn'" class="learn-view">
        <div class="coming-soon">
          <h2>Learning Center</h2>
          <p>Interactive tutorials and orbital visualizers coming soon!</p>
          <button class="btn btn-primary" @click="currentView = 'table'">
            Back to Periodic Table
          </button>
        </div>
      </section>

      <!-- Quiz View -->
      <section v-if="currentView === 'quiz'" class="quiz-view">
        <div class="coming-soon">
          <h2>Quiz Mode</h2>
          <p>Test your chemistry knowledge with interactive quizzes coming soon!</p>
          <button class="btn btn-primary" @click="currentView = 'table'">
            Back to Periodic Table
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2026 Perio - Interactive Periodic Table. Built with Vue 3 + Nuxt</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PeriodicTable from '~/components/PeriodicTable.vue'

const currentView = ref('home')
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  // Apply theme to document
  if (isDark.value) {
    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
}
</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.navbar {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.nav-btn:hover {
  color: #667eea;
}

.theme-toggle {
  background: #f0f0f0;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s;
}

.theme-toggle:hover {
  background: #e0e0e0;
}

.main-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

/* Landing Page Styles */
.landing-page {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  text-align: center;
  color: white;
  margin-bottom: 4rem;
  padding: 3rem 1rem;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.features {
  margin-top: 4rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 12px;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Table View */
.table-view {
  background: transparent;
}

/* Coming Soon Sections */
.coming-soon {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
}

.coming-soon h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.coming-soon p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.learn-view,
.quiz-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
}

/* Dark Theme */
:global(.dark-theme) {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
.element-info { border: 1px solid #ccc; padding: 1rem; margin-top: 1rem; }
.bohr-diagram, .orbital-diagram { margin-top: 1rem; border: 1px dashed #999; padding: 0.5rem; }
</style>
