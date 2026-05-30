<template>
  <button class="themeToggle" @click="toggleTheme">
    Toggle Theme
  </button>

  <section id="landingPage">

    <h1>Periodic Table Memory Engine</h1>

    <p>
      Train your brain with an interactive chemistry learning game.
      Memorize atomic numbers, symbols, names, element categories,
      and scientific facts using quizzes, explanations, hints,
      achievements, and smart learning feedback.
    </p>

    <div class="previewBox">

      <div class="previewCard">
        <h3>Learn Elements</h3>
        <p>
          Explore atomic numbers, symbols, names,
          and categories with interactive cards.
        </p>
      </div>

      <div class="previewCard">
        <h3>Quiz Challenges</h3>
        <p>
          Answer random chemistry questions
          to improve memory and speed.
        </p>
      </div>

      <div class="previewCard">
        <h3>Instant Explanations</h3>
        <p>
          Every answer explains WHY it is correct
          or incorrect for stronger learning.
        </p>
      </div>

      <div class="previewCard">
        <h3>Achievement System</h3>
        <p>
          Unlock chemistry badges as your
          score increases.
        </p>
      </div>

    </div>

    <button class="startBtn" @click="startGame">
      Start Learning
    </button>

  </section>

  <section id="gamePage" class="hidden">

    <header>
      <h1>Periodic Table Memory Engine</h1>

      <div class="stats">

        <div class="statBox">
          Score:
          <span id="score">0</span>
        </div>

        <div class="statBox">
          Questions:
          <span id="questions">0</span>
        </div>

        <div class="statBox">
          Accuracy:
          <span id="accuracy">0%</span>
        </div>

      </div>

      <div class="progressContainer">
        <div class="progressBar" id="progressBar"></div>
      </div>

    </header>

    <div id="mainContent">

      <div class="app">

        <!-- LEFT PANEL -->
        <div class="left-panel">

          <input
            id="searchBox"
            placeholder="Search element (e.g. ti, tan, gold)"
            @input="onSearchInput"
          />

          <div id="suggestions">
            <div class="emptyState" id="emptyStateSearch" style="display:none;">
              <p>🔍 No results found</p>
              <small>Try searching by name, symbol, or category</small>
            </div>
          </div>

        </div>

        <!-- RIGHT PANEL -->
        <div class="right-panel">
          <div id="elementInfo">
            <h2>Click an element</h2>
            <p>Search and select an element to see details + fact.</p>
          </div>
        </div>

      </div>

      <h3>Bohr Model</h3>
      <div id="bohrModel"></div>

      <h3>Orbital Filling</h3>
      <div id="orbitalModel"></div>

      <!-- ✅ ADD THESE HERE -->
      <div id="analyticsPanel"></div>
      <div id="deckPanel"></div>
      <div id="elementGrid"></div>
      <div id="badges"></div>

    </div>

    <!-- RIGHT PANEL -->
    <div class="panel">

      <h2>Quiz Arena</h2>

      <div id="quizQuestion">
        Press Next Question to begin!
      </div>

      <input
        type="text"
        id="answerInput"
        placeholder="Type your answer here..."
      />

      <div class="quizButtons">

        <button class="submitBtn" @click="submitAnswer">
          Submit
        </button>

        <button class="hintBtn" @click="showHint">
          Hint
        </button>

        <button class="nextBtn" @click="generateQuestion">
          Next Question
        </button>

      </div>

      <div id="feedback">

        <div id="feedbackTitle" class="feedbackTitle">
          Correct!
        </div>

        <div class="explanation" id="explanation">
          Explanation appears here.
        </div>

      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Periodic Table Memory Engine',
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
})

const suggestions = ref<HTMLDivElement | null>(null)

const elements = [
{n:1,s:"H",name:"Hydrogen",type:"Nonmetal",group:1,period:1,mass:1.008,fact:"Most abundant element in the universe."},
{n:2,s:"He",name:"Helium",type:"Noble Gas",group:18,period:1,mass:4.0026,fact:"Used in balloons and is non-flammable."},

{n:3,s:"Li",name:"Lithium",type:"Alkali Metal",group:1,period:2,mass:6.94,fact:"Used in rechargeable batteries."},
{n:4,s:"Be",name:"Beryllium",type:"Alkaline Earth Metal",group:2,period:2,mass:9.0122,fact:"Strong and lightweight used in aerospace."},
{n:5,s:"B",name:"Boron",type:"Metalloid",group:13,period:2,mass:10.81,fact:"Used in glass and detergents."},
{n:6,s:"C",name:"Carbon",type:"Nonmetal",group:14,period:2,mass:12.011,fact:"Basis of all known life."},
{n:7,s:"N",name:"Nitrogen",type:"Nonmetal",group:15,period:2,mass:14.007,fact:"Makes up most of Earth's atmosphere."},
{n:8,s:"O",name:"Oxygen",type:"Nonmetal",group:16,period:2,mass:15.999,fact:"Essential for respiration."},
{n:9,s:"F",name:"Fluorine",type:"Halogen",group:17,period:2,mass:18.998,fact:"Most reactive element."},
{n:10,s:"Ne",name:"Neon",type:"Noble Gas",group:18,period:2,mass:20.18,fact:"Used in bright neon signs."},

{n:11,s:"Na",name:"Sodium",type:"Alkali Metal",group:1,period:3,mass:22.99,fact:"Reacts violently with water."},
{n:12,s:"Mg",name:"Magnesium",type:"Alkaline Earth Metal",group:2,period:3,mass:24.305,fact:"Burns with bright white light."},
{n:13,s:"Al",name:"Aluminium",type:"Post-transition Metal",group:13,period:3,mass:26.982,fact:"Lightweight metal used in cans and planes."},
{n:14,s:"Si",name:"Silicon",type:"Metalloid",group:14,period:3,mass:28.085,fact:"Key material in computer chips."},
{n:15,s:"P",name:"Phosphorus",type:"Nonmetal",group:15,period:3,mass:30.974,fact:"Essential for DNA and energy."},
{n:16,s:"S",name:"Sulfur",type:"Nonmetal",group:16,period:3,mass:32.06,fact:"Used in fertilizers and chemicals."},
{n:17,s:"Cl",name:"Chlorine",type:"Halogen",group:17,period:3,mass:35.45,fact:"Used to disinfect water."},
{n:18,s:"Ar",name:"Argon",type:"Noble Gas",group:18,period:3,mass:39.948,fact:"Used in light bulbs."},

{n:19,s:"K",name:"Potassium",type:"Alkali Metal",group:1,period:4,mass:39.098,fact:"Important for nerve function."},
{n:20,s:"Ca",name:"Calcium",type:"Alkaline Earth Metal",group:2,period:4,mass:40.078,fact:"Builds bones and teeth."},
{n:21,s:"Sc",name:"Scandium",type:"Transition Metal",group:3,period:4,mass:44.956,fact:"Used in aerospace alloys."},
{n:22,s:"Ti",name:"Titanium",type:"Transition Metal",group:4,period:4,mass:47.867,fact:"Strong, lightweight and corrosion resistant."},
{n:23,s:"V",name:"Vanadium",type:"Transition Metal",group:5,period:4,mass:50.942,fact:"Strengthens steel."},
{n:24,s:"Cr",name:"Chromium",type:"Transition Metal",group:6,period:4,mass:51.996,fact:"Used in stainless steel."},
{n:25,s:"Mn",name:"Manganese",type:"Transition Metal",group:7,period:4,mass:54.938,fact:"Important in steel production."},
{n:26,s:"Fe",name:"Iron",type:"Transition Metal",group:8,period:4,mass:55.845,fact:"Main metal in steel."},
{n:27,s:"Co",name:"Cobalt",type:"Transition Metal",group:9,period:4,mass:58.933,fact:"Used in batteries."},
{n:28,s:"Ni",name:"Nickel",type:"Transition Metal",group:10,period:4,mass:58.693,fact:"Used in coins and alloys."},
{n:29,s:"Cu",name:"Copper",type:"Transition Metal",group:11,period:4,mass:63.546,fact:"Excellent electrical conductor."},
{n:30,s:"Zn",name:"Zinc",type:"Transition Metal",group:12,period:4,mass:65.38,fact:"Prevents rust in steel."},

{n:31,s:"Ga",name:"Gallium",type:"Post-transition Metal",group:13,period:4,mass:69.723,fact:"Melts in your hand."},
{n:32,s:"Ge",name:"Germanium",type:"Metalloid",group:14,period:4,mass:72.63,fact:"Used in semiconductors."},
{n:33,s:"As",name:"Arsenic",type:"Metalloid",group:15,period:4,mass:74.922,fact:"Toxic element used in pesticides."},
{n:34,s:"Se",name:"Selenium",type:"Nonmetal",group:16,period:4,mass:78.971,fact:"Important trace nutrient."},
{n:35,s:"Br",name:"Bromine",type:"Halogen",group:17,period:4,mass:79.904,fact:"One of two liquid elements at room temp."},
{n:36,s:"Kr",name:"Krypton",type:"Noble Gas",group:18,period:4,mass:83.798,fact:"Used in lighting."},

{n:37,s:"Rb",name:"Rubidium",type:"Alkali Metal",group:1,period:5,mass:85.468,fact:"Highly reactive metal."},
{n:38,s:"Sr",name:"Strontium",type:"Alkaline Earth Metal",group:2,period:5,mass:87.62,fact:"Used in red fireworks."},
{n:39,s:"Y",name:"Yttrium",type:"Transition Metal",group:3,period:5,mass:88.906,fact:"Used in LEDs and superconductors."},
{n:40,s:"Zr",name:"Zirconium",type:"Transition Metal",group:4,period:5,mass:91.224,fact:"Highly corrosion resistant."},

{n:41,s:"Nb",name:"Niobium",type:"Transition Metal",group:5,period:5,mass:92.906,fact:"Used in superconductors."},
{n:42,s:"Mo",name:"Molybdenum",type:"Transition Metal",group:6,period:5,mass:95.95,fact:"Strengthens steel at high heat."},
{n:43,s:"Tc",name:"Technetium",type:"Transition Metal",group:7,period:5,mass:98,fact:"First artificially made element."},
{n:44,s:"Ru",name:"Ruthenium",type:"Transition Metal",group:8,period:5,mass:101.07,fact:"Used in electronics."},
{n:45,s:"Rh",name:"Rhodium",type:"Transition Metal",group:9,period:5,mass:102.91,fact:"Very rare and valuable."},
{n:46,s:"Pd",name:"Palladium",type:"Transition Metal",group:10,period:5,mass:106.42,fact:"Used in catalytic converters."},
{n:47,s:"Ag",name:"Silver",type:"Transition Metal",group:11,period:5,mass:107.87,fact:"Best electrical conductor."},
{n:48,s:"Cd",name:"Cadmium",type:"Transition Metal",group:12,period:5,mass:112.41,fact:"Used in batteries."},

{n:49,s:"In",name:"Indium",type:"Post-transition Metal",group:13,period:5,mass:114.82,fact:"Used in touchscreens."},
{n:50,s:"Sn",name:"Tin",type:"Post-transition Metal",group:14,period:5,mass:118.71,fact:"Used in solder."},
{n:51,s:"Sb",name:"Antimony",type:"Metalloid",group:15,period:5,mass:121.76,fact:"Used in flame retardants."},
{n:52,s:"Te",name:"Tellurium",type:"Metalloid",group:16,period:5,mass:127.6,fact:"Used in solar panels."},
{n:53,s:"I",name:"Iodine",type:"Halogen",group:17,period:5,mass:126.9,fact:"Needed for thyroid health."},
{n:54,s:"Xe",name:"Xenon",type:"Noble Gas",group:18,period:5,mass:131.29,fact:"Used in high-intensity lamps."},

{n:55,s:"Cs",name:"Cesium",type:"Alkali Metal",group:1,period:6,mass:132.91,fact:"Very reactive metal."},
{n:56,s:"Ba",name:"Barium",type:"Alkaline Earth Metal",group:2,period:6,mass:137.33,fact:"Used in medical imaging."},

{n:57,s:"La",name:"Lanthanum",type:"Lanthanide",group:3,period:6,mass:138.91,fact:"Used in camera lenses."},
{n:58,s:"Ce",name:"Cerium",type:"Lanthanide",group:3,period:6,mass:140.12,fact:"Used in catalytic converters."},
{n:59,s:"Pr",name:"Praseodymium",type:"Lanthanide",group:3,period:6,mass:140.91,fact:"Used in strong magnets."},
{n:60,s:"Nd",name:"Neodymium",type:"Lanthanide",group:3,period:6,mass:144.24,fact:"Used in powerful magnets."},

{n:61,s:"Pm",name:"Promethium",type:"Lanthanide",group:3,period:6,mass:145,fact:"Radioactive and rare on Earth."},
{n:62,s:"Sm",name:"Samarium",type:"Lanthanide",group:3,period:6,mass:150.36,fact:"Used in magnets."},
{n:63,s:"Eu",name:"Europium",type:"Lanthanide",group:3,period:6,mass:151.96,fact:"Used in TV screens."},
{n:64,s:"Gd",name:"Gadolinium",type:"Lanthanide",group:3,period:6,mass:157.25,fact:"Used in MRI scans."},
{n:65,s:"Tb",name:"Terbium",type:"Lanthanide",group:3,period:6,mass:158.93,fact:"Used in green phosphors."},
{n:66,s:"Dy",name:"Dysprosium",type:"Lanthanide",group:3,period:6,mass:162.5,fact:"Used in magnets."},
{n:67,s:"Ho",name:"Holmium",type:"Lanthanide",group:3,period:6,mass:164.93,fact:"Has strongest magnetic properties."},
{n:68,s:"Er",name:"Erbium",type:"Lanthanide",group:3,period:6,mass:167.26,fact:"Used in fiber optics."},
{n:69,s:"Tm",name:"Thulium",type:"Lanthanide",group:3,period:6,mass:168.93,fact:"One of the rarest lanthanides."},
{n:70,s:"Yb",name:"Ytterbium",type:"Lanthanide",group:3,period:6,mass:168.93,fact:"Used in atomic clocks."},
{n:71,s:"Lu",name:"Lutetium",type:"Lanthanide",group:3,period:6,mass:174.97,fact:"Used in PET scanners."},

{n:72,s:"Hf",name:"Hafnium",type:"Transition Metal",group:4,period:6,mass:178.49,fact:"Used in nuclear reactors."},
{n:73,s:"Ta",name:"Tantalum",type:"Transition Metal",group:5,period:6,mass:180.95,fact:"Used in electronics."},
{n:74,s:"W",name:"Tungsten",type:"Transition Metal",group:6,period:6,mass:183.84,fact:"Has highest melting point."},
{n:75,s:"Re",name:"Rhenium",type:"Transition Metal",group:7,period:6,mass:186.21,fact:"Used in jet engines."},
{n:76,s:"Os",name:"Osmium",type:"Transition Metal",group:8,period:6,mass:190.23,fact:"One of the densest elements."},
{n:77,s:"Ir",name:"Iridium",type:"Transition Metal",group:9,period:6,mass:192.22,fact:"Very corrosion resistant."},
{n:78,s:"Pt",name:"Platinum",type:"Transition Metal",group:10,period:6,mass:195.08,fact:"Used in jewelry and catalysts."},
{n:79,s:"Au",name:"Gold",type:"Transition Metal",group:11,period:6,mass:196.97,fact:"Highly valuable and unreactive."},
{n:80,s:"Hg",name:"Mercury",type:"Transition Metal",group:12,period:6,mass:200.59,fact:"Only liquid metal at room temp."},

{n:81,s:"Tl",name:"Thallium",type:"Post-transition Metal",group:13,period:6,mass:204.38,fact:"Highly toxic metal."},
{n:82,s:"Pb",name:"Lead",type:"Post-transition Metal",group:14,period:6,mass:207.2,fact:"Heavy toxic metal used in batteries."},
{n:83,s:"Bi",name:"Bismuth",type:"Post-transition Metal",group:15,period:6,mass:208.98,fact:"Non-toxic heavy metal."},
{n:84,s:"Po",name:"Polonium",type:"Metalloid",group:16,period:6,mass:209,fact:"Highly radioactive element."},
{n:85,s:"At",name:"Astatine",type:"Halogen",group:17,period:6,mass:210.65,fact:"Rarest naturally occurring element."},
{n:86,s:"Rn",name:"Radon",type:"Noble Gas",group:18,period:6,mass:222,fact:"Radioactive gas."},

{n:87,s:"Fr",name:"Francium",type:"Alkali Metal",group:1,period:7,mass:223,fact:"Extremely rare and radioactive."},
{n:88,s:"Ra",name:"Radium",type:"Alkaline Earth Metal",group:2,period:7,mass:226,fact:"Glows in the dark due to radioactivity."},

{n:89,s:"Ac",name:"Actinium",type:"Actinide",group:3,period:7,mass:227,fact:"First element in actinides."},
{n:90,s:"Th",name:"Thorium",type:"Actinide",group:3,period:7,mass:232.04,fact:"Potential nuclear fuel."},
{n:91,s:"Pa",name:"Protactinium",type:"Actinide",group:3,period:7,mass:231.04,fact:"Rare and radioactive."},
{n:92,s:"U",name:"Uranium",type:"Actinide",group:3,period:7,mass:238.03,fact:"Used in nuclear reactors."},
{n:93,s:"Np",name:"Neptunium",type:"Actinide",group:3,period:7,mass:237,fact:"First transuranic element."},
{n:94,s:"Pu",name:"Plutonium",type:"Actinide",group:3,period:7,mass:244,fact:"Used in nuclear weapons and reactors."},
{n:95,s:"Am",name:"Americium",type:"Actinide",group:3,period:7,mass:243,fact:"Used in smoke detectors."},
{n:96,s:"Cm",name:"Curium",type:"Actinide",group:3,period:7,mass:247,fact:"Named after Marie and Pierre Curie."},
{n:97,s:"Bk",name:"Berkelium",type:"Actinide",group:3,period:7,mass:247,fact:"Synthetic radioactive element."},
{n:98,s:"Cf",name:"Californium",type:"Actinide",group:3,period:7,mass:251,fact:"Used in neutron sources."},
{n:99,s:"Es",name:"Einsteinium",type:"Actinide",group:3,period:7,mass:252,fact:"Named after Albert Einstein."},
{n:100,s:"Fm",name:"Fermium",type:"Actinide",group:3,period:7,mass:257,fact:"Created in nuclear explosions."},

{n:101,s:"Md",name:"Mendelevium",type:"Actinide",group:3,period:7,mass:258,fact:"Named after Dmitri Mendeleev."},
{n:102,s:"No",name:"Nobelium",type:"Actinide",group:3,period:7,mass:259,fact:"Named after Alfred Nobel."},
{n:103,s:"Lr",name:"Lawrencium",type:"Actinide",group:3,period:7,mass:266,fact:"Synthetic and highly radioactive."},

{n:104,s:"Rf",name:"Rutherfordium",type:"Transition Metal",group:4,period:7,mass:267,fact:"Named after Ernest Rutherford."},
{n:105,s:"Db",name:"Dubnium",type:"Transition Metal",group:5,period:7,mass:268,fact:"Synthetic element."},
{n:106,s:"Sg",name:"Seaborgium",type:"Transition Metal",group:6,period:7,mass:269,fact:"Named after Glenn Seaborg."},
{n:107,s:"Bh",name:"Bohrium",type:"Transition Metal",group:7,period:7,mass:270,fact:"Named after Niels Bohr."},
{n:108,s:"Hs",name:"Hassium",type:"Transition Metal",group:8,period:7,mass:269,fact:"Highly radioactive synthetic element."},
{n:109,s:"Mt",name:"Meitnerium",type:"Unknown",group:9,period:7,mass:278,fact:"Named after Lise Meitner."},
{n:110,s:"Ds",name:"Darmstadtium",type:"Unknown",group:10,period:7,mass:281,fact:"Synthetic element."},
{n:111,s:"Rg",name:"Roentgenium",type:"Unknown",group:11,period:7,mass:282,fact:"Named after Wilhelm Röntgen."},
{n:112,s:"Cn",name:"Copernicium",type:"Transition Metal",group:12,period:7,mass:285,fact:"Named after Nicolaus Copernicus."},

{n:113,s:"Nh",name:"Nihonium",type:"Unknown",group:13,period:7,mass:286,fact:"First element discovered in Japan."},
{n:114,s:"Fl",name:"Flerovium",type:"Post-transition Metal",group:14,period:7,mass:289,fact:"Synthetic superheavy element."},
{n:115,s:"Mc",name:"Moscovium",type:"Unknown",group:15,period:7,mass:290,fact:"Named after Moscow region."},
{n:116,s:"Lv",name:"Livermorium",type:"Unknown",group:16,period:7,mass:293,fact:"Synthetic radioactive element."},
{n:117,s:"Ts",name:"Tennessine",type:"Halogen",group:17,period:7,mass:294,fact:"One of the newest discovered elements."},
{n:118,s:"Og",name:"Oganesson",type:"Noble Gas",group:18,period:7,mass:294,fact:"Heaviest known element."}
]

function scoreMatch(query: string, text: string) {
  query = query.toLowerCase()
  text = text.toLowerCase()

  if (text.includes(query)) return 200

  let qi = 0
  let score = 0

  for (let i = 0; i < text.length; i++) {
    if (text[i] === query[qi]) {
      qi++
      score += 15
    }
    if (qi >= query.length) break
  }

  return (qi / query.length) * 100 + score
}

function highlight(text: string, query: string) {
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, `<mark>$1</mark>`)
}

function showElement(el: any) {
  document.getElementById('elementInfo')!.innerHTML = `
    <h3 class="highlight">${el.name}</h3>

    <p><strong>Atomic Number:</strong> ${el.n}</p>

    <p><strong>Symbol:</strong> ${el.s}</p>

    <p><strong>Category:</strong> ${el.type}</p>

    <p><strong>Fact:</strong>${el.fact}</p>
  `
}

function render(list: any[], query: string) {
  if (!suggestions.value) return
  suggestions.value.innerHTML = ''

  list.forEach(el => {
    const div = document.createElement('div')
    div.className = 'suggestion'

    div.innerHTML = `
      <div>
        <strong>${highlight(el.name, query)}</strong>
        <small>(${el.s})</small>
      </div>
      <small>${el.type}</small>
    `

    div.onclick = () => showElement(el)
    suggestions.value?.appendChild(div)
  })
}

function onSearchInput(e: Event) {
  const q = (e.target as HTMLInputElement).value.trim()

  if (!q) {
    if (suggestions.value) suggestions.value.innerHTML = ''
    return
  }

  const results = elements
    .map(el => ({
      el,
      score:
        scoreMatch(q, el.name) +
        scoreMatch(q, el.s) +
        scoreMatch(q, el.type)
    }))
    .filter(x => x.score > 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(x => x.el)

  render(results, q)
}

let currentQuestion: any = {}
let score = 0
let totalQuestions = 0
let correctAnswers = 0

function startGame() {
  document.getElementById('landingPage')!.classList.add('hidden')
  document.getElementById('gamePage')!.classList.remove('hidden')
  renderElements()
}

function renderElements() {
  const grid = document.getElementById('elementGrid')
  if (!grid) return
  grid.innerHTML = ''

  elements.forEach(el => {
    const card = document.createElement('div')
    card.className = 'elementCard'

    card.innerHTML = `
      <div class="atomic">${el.n}</div>
      <div class="symbol">${el.s}</div>
      <div>${el.name}</div>
      <div class="type">${el.type}</div>
    `

    card.onclick = () => showElement(el)
    grid.appendChild(card)
  })
}

function generateQuestion() {
  const random = elements[Math.floor(Math.random() * elements.length)]
  const modes = ['number', 'symbol', 'type']
  const mode = modes[Math.floor(Math.random() * modes.length)]

  currentQuestion.element = random
  currentQuestion.mode = mode

  document.getElementById('feedback')!.style.display = 'none'
  ;(document.getElementById('answerInput') as HTMLInputElement).value = ''

  if (mode === 'number') {
    document.getElementById('quizQuestion')!.innerHTML =
      `What is the atomic number of <strong>${random.name}</strong>?`
  }

  if (mode === 'symbol') {
    document.getElementById('quizQuestion')!.innerHTML =
      `What is the symbol of <strong>${random.name}</strong>?`
  }

  if (mode === 'type') {
    document.getElementById('quizQuestion')!.innerHTML =
      `What type of element is <strong>${random.name}</strong>?`
  }
}

function submitAnswer() {
  const user = (document.getElementById('answerInput') as HTMLInputElement).value.trim().toLowerCase()
  const el = currentQuestion.element

  if (!el) {
    alert('Generate a question first.')
    return
  }

  let correct = ''
  let explanation = ''

  if (currentQuestion.mode === 'number') {
    correct = String(el.n).toLowerCase()
    explanation =
      `${el.name} has atomic number ${el.n}
because it contains ${el.n} protons
inside its nucleus.`
  }

  if (currentQuestion.mode === 'symbol') {
    correct = el.s.toLowerCase()
    explanation =
      `The symbol for ${el.name}
is ${el.s}. Chemical symbols are
used internationally in chemistry.`
  }

  if (currentQuestion.mode === 'type') {
    correct = el.type.toLowerCase()
    explanation =
      `${el.name} belongs to the category:
${el.type}. Elements are grouped by
their chemical properties and behaviors.`
  }

  totalQuestions++

  if (user === correct) {
    score += 10
    correctAnswers++
    showCorrect(explanation)
    playCorrectSound()
  } else {
    showWrong(correct, explanation)
    playWrongSound()
  }

  updateStats()
  unlockBadges()
}

function showCorrect(explanation: string) {
  const feedback = document.getElementById('feedback')
  if (!feedback) return

  feedback.style.display = 'block'
  feedback.className = 'correctBox'

  document.getElementById('feedbackTitle')!.innerHTML = `✅ Correct!`
  document.getElementById('feedbackTitle')!.className = 'feedbackTitle correctText'
  document.getElementById('explanation')!.innerHTML = `
    <strong>Why?</strong><br><br>
    ${explanation}
  `
}

function showWrong(answer: string, explanation: string) {
  const feedback = document.getElementById('feedback')
  if (!feedback) return

  feedback.style.display = 'block'
  feedback.className = 'wrongBox'

  document.getElementById('feedbackTitle')!.innerHTML = `❌ Incorrect`
  document.getElementById('feedbackTitle')!.className = 'feedbackTitle wrongText'
  document.getElementById('explanation')!.innerHTML = `
    <strong>Correct Answer:</strong> ${answer}<br><br>

    <strong>Why?</strong><br><br>

    ${explanation}
  `
}

function updateStats() {
  document.getElementById('score')!.innerText = String(score)
  document.getElementById('questions')!.innerText = String(totalQuestions)

  let accuracy = 0
  if (totalQuestions > 0) {
    accuracy = Math.round((correctAnswers / totalQuestions) * 100)
  }

  document.getElementById('accuracy')!.innerText = accuracy + '%'
  document.getElementById('progressBar')!.style.width = Math.min(score, 100) + '%'
}

function showHint() {
  const el = currentQuestion.element
  if (!el) {
    alert('Generate a question first.')
    return
  }

  if (currentQuestion.mode === 'number') {
    alert(`Hint:\nThe atomic number is between\n${el.n - 2} and ${el.n + 2}`)
  }

  if (currentQuestion.mode === 'symbol') {
    alert(`Hint:\nThe symbol starts with:\n${el.s[0]}`)
  }

  if (currentQuestion.mode === 'type') {
    alert(`Hint:\nIt belongs to a chemistry family\nstarting with:\n${el.type[0]}`)
  }
}

function unlockBadges() {
  const badgeContainer = document.getElementById('badges')
  if (!badgeContainer) return

  badgeContainer.innerHTML = ''

  if (score >= 20) {
    addBadge('🥉 Beginner Chemist')
  }
  if (score >= 50) {
    addBadge('🥈 Element Explorer')
  }
  if (score >= 100) {
    addBadge('🥇 Atomic Master')
  }
  if (score >= 150) {
    addBadge('🏆 Periodic Legend')
  }
}

function addBadge(text: string) {
  const badge = document.createElement('div')
  badge.className = 'badge'
  badge.innerText = text
  document.getElementById('badges')?.appendChild(badge)
}

let darkMode = true

function toggleTheme() {
  darkMode = !darkMode

  if (darkMode) {
    document.body.style.background = '#0f172a'
    document.body.style.color = 'white'
  } else {
    document.body.style.background = '#f8fafc'
    document.body.style.color = 'black'
  }
}

function playCorrectSound() {
  const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = 700
  osc.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.15)
}

function playWrongSound() {
  const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.value = 180
  osc.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

onMounted(() => {
  suggestions.value = document.getElementById('suggestions') as HTMLDivElement | null
  toggleTheme()

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitAnswer()
    }
  })

  setTimeout(() => {
    generateQuestion()
  }, 1000)
})
</script>

<style>
/* =========================================================
   GLOBAL STYLES
========================================================= */
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial, Helvetica, sans-serif;
    background:#0f172a;
    color:white;
    overflow-x:hidden;
}

.hidden{
    display:none;
}

button{
    cursor:pointer;
    border:none;
    border-radius:8px;
    transition:0.3s;
}

/* =========================================================
   LANDING PAGE
========================================================= */
#landingPage{
    min-height:100vh;
    background:linear-gradient(135deg,#0f172a,#1e293b,#111827);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    padding:30px;
}

#landingPage h1{
    font-size:60px;
    color:#38bdf8;
    margin-bottom:20px;
}

#landingPage p{
    max-width:700px;
    line-height:1.7;
    font-size:20px;
    color:#cbd5e1;
}

.startBtn{
    margin-top:30px;
    padding:15px 40px;
    background:#38bdf8;
    color:black;
    font-size:20px;
    font-weight:bold;
}

.startBtn:hover{
    background:#0ea5e9;
    transform:scale(1.05);
}

.previewBox{
    margin-top:40px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:20px;
    width:90%;
}

.previewCard{
    background:#1e293b;
    border:2px solid #334155;
    border-radius:15px;
    padding:20px;
}

.previewCard h3{
    color:#38bdf8;
    margin-bottom:10px;
}

/* =========================================================
   GAME PAGE
========================================================= */
#gamePage{
    min-height:100vh;
}

header{
    background:#111827;
    padding:20px;
    border-bottom:3px solid #38bdf8;
    text-align:center;
}

header h1{
    color:#38bdf8;
}

.stats{
    display:flex;
    justify-content:center;
    gap:40px;
    margin-top:15px;
    flex-wrap:wrap;
}

.statBox{
    background:#1e293b;
    padding:10px 20px;
    border-radius:10px;
}

#mainContent{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
    padding:20px;
}

@media(max-width:900px){
    #mainContent{
        grid-template-columns:1fr;
    }
}

.panel{
    background:#111827;
    border-radius:15px;
    padding:20px;
}

/* =========================================================
   ELEMENT GRID
========================================================= */
#elementGrid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(110px,1fr));
    gap:10px;
    margin-top:20px;
}

.elementCard{
    background:#1e293b;
    border:2px solid #334155;
    border-radius:10px;
    padding:10px;
    text-align:center;
    cursor:pointer;
    transition:0.3s;
}

.elementCard:hover{
    transform:translateY(-5px);
    border-color:#38bdf8;
}

.atomic{
    color:#94a3b8;
    font-size:13px;
}

.symbol{
    font-size:28px;
    font-weight:bold;
    margin:8px 0;
}

.type{
    font-size:11px;
    color:#cbd5e1;
}

/* =========================================================
   INFO BOX
========================================================= */
#elementInfo{
    line-height:1.8;
    margin-top:20px;
}

.highlight{
    color:#38bdf8;
}

/* search input */
#searchBox {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #1e293b;
  color: white;
}

#searchBox::placeholder {
  color: #94a3b8;
}

/* dropdown results */
#suggestions {
  max-height: 80vh;
  overflow-y: auto;
}

.suggestion {
  padding: 10px;
  border-bottom: 1px solid #334155;
  cursor: pointer;
  background: #1e293b;
  color: white;
}

.suggestion:hover {
  background: #334155;
}

.suggestion small {
  color: #cbd5e1;
}

/* RIGHT PANEL */
.right-panel {
  flex: 1;
  padding: 20px;
}

.fact {
  margin-top: 15px;
  padding: 10px;
  background: #fff7d6;
  border-left: 4px solid gold;
}

/* highlight */
mark {
  background: yellow;
}
</style>
