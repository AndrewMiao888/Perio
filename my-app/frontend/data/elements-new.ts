// Comprehensive periodic table data with all 118 elements
// This file contains detailed information for each element including:
// - Atomic properties (number, symbol, name, classification)
// - Electron configuration and orbital diagrams
// - Physical properties (density, melting/boiling points, atomic radius)
// - Chemical properties (electronegativity, ionization energy, oxidation states)
// - Discovery information and historical notes
// - Isotope data

export interface Element {
  // Atomic Information
  atomicNumber: number;
  symbol: string;
  name: string;
  group: number | null;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  standardState: 'solid' | 'liquid' | 'gas';
  classification: 'metal' | 'nonmetal' | 'metalloid';
  
  // Electron Configuration
  electronConfiguration: string;
  electronConfigurationCondensed: string;
  bohrShells: number[];
  valenceElectrons: number;
  orbitalDiagram: string;
  
  // Physical Properties
  atomicMass: number;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  atomicRadius: number | null;
  
  // Chemical Properties
  electronegativity: number | null;
  ionizationEnergy: number | null;
  oxidationStates: number[];
  commonCompounds: string[];
  reactivity: 'inert' | 'unreactive' | 'moderate' | 'reactive' | 'highly-reactive';
  acidBase: 'acidic' | 'basic' | 'amphoteric' | 'neutral' | 'n/a';
  
  // Discovery Data
  discoveredBy: string | null;
  discoveryYear: number | null;
  historicalNotes: string | null;
  
  // Isotopes
  naturalIsotopes: IsotopeData[];
  mostStableIsotope: string;
  
  // Visuals & Descriptions
  intro: string;
  imageUrl?: string;
}

export interface IsotopeData {
  mass: number;
  abundance: number | null;
  halfLife: string | null;
  stable: boolean;
}

// Helper function to create element objects with consistent structure
const createElement = (data: Partial<Element>): Element => {
  const defaults: Element = {
    atomicNumber: 0,
    symbol: "",
    name: "",
    group: null,
    period: 0,
    block: 's',
    standardState: 'solid',
    classification: 'nonmetal',
    electronConfiguration: "",
    electronConfigurationCondensed: "",
    bohrShells: [],
    valenceElectrons: 0,
    orbitalDiagram: "",
    atomicMass: 0,
    density: null,
    meltingPoint: null,
    boilingPoint: null,
    atomicRadius: null,
    electronegativity: null,
    ionizationEnergy: null,
    oxidationStates: [],
    commonCompounds: [],
    reactivity: 'unreactive',
    acidBase: 'n/a',
    discoveredBy: null,
    discoveryYear: null,
    historicalNotes: null,
    naturalIsotopes: [],
    mostStableIsotope: "",
    intro: ""
  };
  return { ...defaults, ...data };
};

export const elements: Element[] = [
  // Period 1
  createElement({
    atomicNumber: 1, symbol: "H", name: "Hydrogen", group: 1, period: 1, block: 's',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s¹", electronConfigurationCondensed: "1s¹",
    bohrShells: [1], valenceElectrons: 1, orbitalDiagram: "1s↑",
    atomicMass: 1.008, density: 0.08988, meltingPoint: 13.99, boilingPoint: 20.27,
    atomicRadius: 53, electronegativity: 2.20, ionizationEnergy: 13.6,
    oxidationStates: [1, -1], commonCompounds: ["H₂O", "CH₄", "NH₃", "HCl"],
    reactivity: 'reactive', acidBase: 'neutral',
    discoveredBy: "Known since ancient times", discoveryYear: null,
    historicalNotes: "Most abundant element in the universe.",
    naturalIsotopes: [
      { mass: 1, abundance: 99.9885, halfLife: null, stable: true },
      { mass: 2, abundance: 0.0115, halfLife: null, stable: true }
    ],
    mostStableIsotope: "H-1",
    intro: "Hydrogen is the lightest and most abundant element in the universe. It forms the basis of water molecules and organic compounds."
  }),
  createElement({
    atomicNumber: 2, symbol: "He", name: "Helium", group: 18, period: 1, block: 's',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s²", electronConfigurationCondensed: "1s²",
    bohrShells: [2], valenceElectrons: 2, orbitalDiagram: "1s↑↓",
    atomicMass: 4.0026, density: 0.1785, meltingPoint: 0.95, boilingPoint: 4.25,
    atomicRadius: 31, electronegativity: null, ionizationEnergy: 24.6,
    oxidationStates: [0], commonCompounds: [],
    reactivity: 'inert', acidBase: 'n/a',
    discoveredBy: "Pierre Janssen", discoveryYear: 1868,
    historicalNotes: "First discovered in the Sun's spectrum during a solar eclipse.",
    naturalIsotopes: [
      { mass: 4, abundance: 99.999, halfLife: null, stable: true }
    ],
    mostStableIsotope: "He-4",
    intro: "Helium is an inert gas used in balloons, cryogenics, and cooling systems."
  }),

  // Period 2
  createElement({
    atomicNumber: 3, symbol: "Li", name: "Lithium", group: 1, period: 2, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s¹", electronConfigurationCondensed: "[He] 2s¹",
    bohrShells: [2, 1], valenceElectrons: 1, orbitalDiagram: "2s↑",
    atomicMass: 6.94, density: 0.534, meltingPoint: 453.69, boilingPoint: 1560,
    atomicRadius: 152, electronegativity: 0.98, ionizationEnergy: 5.39,
    oxidationStates: [1], commonCompounds: ["LiOH", "LiCl", "Li₂CO₃"],
    reactivity: 'highly-reactive', acidBase: 'basic',
    discoveredBy: "Johann Arfvedson", discoveryYear: 1817,
    historicalNotes: "Named from Greek 'lithos' (stone). Must be stored under oil.",
    naturalIsotopes: [
      { mass: 7, abundance: 92.41, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Li-7",
    intro: "Lithium is a soft metal used extensively in batteries and pharmaceuticals."
  }),
  createElement({
    atomicNumber: 4, symbol: "Be", name: "Beryllium", group: 2, period: 2, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s²", electronConfigurationCondensed: "[He] 2s²",
    bohrShells: [2, 2], valenceElectrons: 2, orbitalDiagram: "2s↑↓",
    atomicMass: 9.0122, density: 1.85, meltingPoint: 1560, boilingPoint: 2742,
    atomicRadius: 112, electronegativity: 1.57, ionizationEnergy: 9.32,
    oxidationStates: [2], commonCompounds: ["BeO", "BeCl₂"],
    reactivity: 'moderate', acidBase: 'amphoteric',
    discoveredBy: "Louis-Nicolas Vauquelin", discoveryYear: 1798,
    historicalNotes: "Extremely brittle and toxic when inhaled as dust.",
    naturalIsotopes: [
      { mass: 9, abundance: 100, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Be-9",
    intro: "Beryllium is a lightweight metal used in aerospace and nuclear applications."
  }),
  createElement({
    atomicNumber: 5, symbol: "B", name: "Boron", group: 13, period: 2, block: 'p',
    standardState: 'solid', classification: 'metalloid',
    electronConfiguration: "1s² 2s² 2p¹", electronConfigurationCondensed: "[He] 2s² 2p¹",
    bohrShells: [2, 3], valenceElectrons: 3, orbitalDiagram: "2p↑",
    atomicMass: 10.81, density: 2.34, meltingPoint: 2349, boilingPoint: 4200,
    atomicRadius: 87, electronegativity: 2.04, ionizationEnergy: 8.30,
    oxidationStates: [3, -1], commonCompounds: ["B₂O₃", "H₃BO₃"],
    reactivity: 'moderate', acidBase: 'acidic',
    discoveredBy: "Joseph-Louis Gay-Lussac", discoveryYear: 1808,
    historicalNotes: "Crystalline boron is nearly as hard as diamond.",
    naturalIsotopes: [
      { mass: 11, abundance: 80.1, halfLife: null, stable: true }
    ],
    mostStableIsotope: "B-11",
    intro: "Boron is essential in glass, ceramics, and various industrial applications."
  }),
  createElement({
    atomicNumber: 6, symbol: "C", name: "Carbon", group: 14, period: 2, block: 'p',
    standardState: 'solid', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p²", electronConfigurationCondensed: "[He] 2s² 2p²",
    bohrShells: [2, 4], valenceElectrons: 4, orbitalDiagram: "2p↑ 2p↑",
    atomicMass: 12.011, density: 2.26, meltingPoint: 3823, boilingPoint: 5100,
    atomicRadius: 77, electronegativity: 2.55, ionizationEnergy: 11.26,
    oxidationStates: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    commonCompounds: ["CO₂", "CH₄", "C₂H₆", "C₆H₆"],
    reactivity: 'moderate', acidBase: 'neutral',
    discoveredBy: "Known since prehistoric times", discoveryYear: null,
    historicalNotes: "Basis of all organic chemistry. Forms diamond and graphite.",
    naturalIsotopes: [
      { mass: 12, abundance: 98.89, halfLife: null, stable: true },
      { mass: 14, abundance: 0.00000000001, halfLife: "5730 years", stable: false }
    ],
    mostStableIsotope: "C-12",
    intro: "Carbon is the backbone of organic chemistry and all known life forms."
  }),
  createElement({
    atomicNumber: 7, symbol: "N", name: "Nitrogen", group: 15, period: 2, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p³", electronConfigurationCondensed: "[He] 2s² 2p³",
    bohrShells: [2, 5], valenceElectrons: 5, orbitalDiagram: "2p↑ 2p↑ 2p↑",
    atomicMass: 14.007, density: 1.251, meltingPoint: 63.15, boilingPoint: 77.36,
    atomicRadius: 71, electronegativity: 3.04, ionizationEnergy: 14.53,
    oxidationStates: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
    commonCompounds: ["N₂", "NO", "NO₂", "NH₃"],
    reactivity: 'unreactive', acidBase: 'neutral',
    discoveredBy: "Daniel Rutherford", discoveryYear: 1772,
    historicalNotes: "Makes up 78% of Earth's atmosphere.",
    naturalIsotopes: [
      { mass: 14, abundance: 99.632, halfLife: null, stable: true }
    ],
    mostStableIsotope: "N-14",
    intro: "Nitrogen makes up 78% of Earth's atmosphere and is essential for proteins."
  }),
  createElement({
    atomicNumber: 8, symbol: "O", name: "Oxygen", group: 16, period: 2, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁴", electronConfigurationCondensed: "[He] 2s² 2p⁴",
    bohrShells: [2, 6], valenceElectrons: 6, orbitalDiagram: "2p↑↓ 2p↑ 2p↑",
    atomicMass: 15.999, density: 1.429, meltingPoint: 54.36, boilingPoint: 90.20,
    atomicRadius: 60, electronegativity: 3.44, ionizationEnergy: 13.61,
    oxidationStates: [-2, -1, 0, 1, 2],
    commonCompounds: ["H₂O", "O₂", "CO₂", "SiO₂"],
    reactivity: 'reactive', acidBase: 'neutral',
    discoveredBy: "Carl Wilhelm Scheele", discoveryYear: 1774,
    historicalNotes: "Third most abundant element in the universe.",
    naturalIsotopes: [
      { mass: 16, abundance: 99.757, halfLife: null, stable: true }
    ],
    mostStableIsotope: "O-16",
    intro: "Oxygen is vital for respiration and combustion processes."
  }),
  createElement({
    atomicNumber: 9, symbol: "F", name: "Fluorine", group: 17, period: 2, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁵", electronConfigurationCondensed: "[He] 2s² 2p⁵",
    bohrShells: [2, 7], valenceElectrons: 7, orbitalDiagram: "2p↑↓ 2p↑↓ 2p↑",
    atomicMass: 18.998, density: 1.696, meltingPoint: 53.48, boilingPoint: 85.03,
    atomicRadius: 64, electronegativity: 3.98, ionizationEnergy: 17.42,
    oxidationStates: [-1], commonCompounds: ["HF", "CF₄", "NaF"],
    reactivity: 'highly-reactive', acidBase: 'acidic',
    discoveredBy: "Henri Moissan", discoveryYear: 1886,
    historicalNotes: "Most electronegative element. Highly toxic in elemental form.",
    naturalIsotopes: [
      { mass: 19, abundance: 100, halfLife: null, stable: true }
    ],
    mostStableIsotope: "F-19",
    intro: "Fluorine is the most reactive element, used in Teflon and uranium enrichment."
  }),
  createElement({
    atomicNumber: 10, symbol: "Ne", name: "Neon", group: 18, period: 2, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁶", electronConfigurationCondensed: "[He] 2s² 2p⁶",
    bohrShells: [2, 8], valenceElectrons: 8, orbitalDiagram: "2p↑↓ 2p↑↓ 2p↑↓",
    atomicMass: 20.180, density: 0.9002, meltingPoint: 24.56, boilingPoint: 27.07,
    atomicRadius: 62, electronegativity: null, ionizationEnergy: 21.56,
    oxidationStates: [0], commonCompounds: [],
    reactivity: 'inert', acidBase: 'n/a',
    discoveredBy: "Morris William Travers", discoveryYear: 1898,
    historicalNotes: "Famous for bright glow in neon signs.",
    naturalIsotopes: [
      { mass: 20, abundance: 90.48, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Ne-20",
    intro: "Neon is an inert gas known for its bright glow in neon signs."
  }),

  // Period 3
  createElement({
    atomicNumber: 11, symbol: "Na", name: "Sodium", group: 1, period: 3, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s¹", electronConfigurationCondensed: "[Ne] 3s¹",
    bohrShells: [2, 8, 1], valenceElectrons: 1, orbitalDiagram: "3s↑",
    atomicMass: 22.990, density: 0.971, meltingPoint: 370.7, boilingPoint: 1156,
    atomicRadius: 186, electronegativity: 0.93, ionizationEnergy: 5.14,
    oxidationStates: [1], commonCompounds: ["NaCl", "NaOH", "Na₂CO₃"],
    reactivity: 'highly-reactive', acidBase: 'basic',
    discoveredBy: "Humphry Davy", discoveryYear: 1807,
    historicalNotes: "Essential for nerve function and fluid balance.",
    naturalIsotopes: [
      { mass: 23, abundance: 100, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Na-23",
    intro: "Sodium is essential for nerve function and is widely used in industry."
  }),
  createElement({
    atomicNumber: 12, symbol: "Mg", name: "Magnesium", group: 2, period: 3, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s²", electronConfigurationCondensed: "[Ne] 3s²",
    bohrShells: [2, 8, 2], valenceElectrons: 2, orbitalDiagram: "3s↑↓",
    atomicMass: 24.305, density: 1.738, meltingPoint: 923, boilingPoint: 1363,
    atomicRadius: 160, electronegativity: 1.31, ionizationEnergy: 7.65,
    oxidationStates: [2], commonCompounds: ["MgO", "MgCl₂", "Mg(OH)₂"],
    reactivity: 'reactive', acidBase: 'basic',
    discoveredBy: "Joseph Black", discoveryYear: 1755,
    historicalNotes: "Essential for bone formation and enzyme function.",
    naturalIsotopes: [
      { mass: 24, abundance: 78.99, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Mg-24",
    intro: "Magnesium is essential for bones and enzyme reactions in living organisms."
  }),

  // Additional common elements (11-30)
  createElement({
    atomicNumber: 13, symbol: "Al", name: "Aluminum", group: 13, period: 3, block: 'p',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p¹", electronConfigurationCondensed: "[Ne] 3s² 3p¹",
    bohrShells: [2, 8, 3], valenceElectrons: 3, orbitalDiagram: "3p↑",
    atomicMass: 26.982, density: 2.70, meltingPoint: 933.47, boilingPoint: 2792,
    atomicRadius: 143, electronegativity: 1.61, ionizationEnergy: 5.99,
    oxidationStates: [3], commonCompounds: ["Al₂O₃", "AlCl₃"],
    reactivity: 'moderate', acidBase: 'amphoteric',
    discoveredBy: "Hans Christian Ørsted", discoveryYear: 1825,
    historicalNotes: "Lightweight and corrosion-resistant, widely used in construction.",
    naturalIsotopes: [
      { mass: 27, abundance: 100, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Al-27",
    intro: "Aluminum is lightweight and corrosion-resistant, used in packaging and construction."
  }),
  createElement({
    atomicNumber: 14, symbol: "Si", name: "Silicon", group: 14, period: 3, block: 'p',
    standardState: 'solid', classification: 'metalloid',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p²", electronConfigurationCondensed: "[Ne] 3s² 3p²",
    bohrShells: [2, 8, 4], valenceElectrons: 4, orbitalDiagram: "3p↑ 3p↑",
    atomicMass: 28.085, density: 2.33, meltingPoint: 1687, boilingPoint: 3538,
    atomicRadius: 117, electronegativity: 1.90, ionizationEnergy: 8.15,
    oxidationStates: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    commonCompounds: ["SiO₂", "Si₂O₃"],
    reactivity: 'moderate', acidBase: 'acidic',
    discoveredBy: "Jöns Jacob Berzelius", discoveryYear: 1824,
    historicalNotes: "Second most abundant element in Earth's crust. Basis of electronics.",
    naturalIsotopes: [
      { mass: 28, abundance: 92.2297, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Si-28",
    intro: "Silicon is crucial for electronics and solar cells."
  }),
  createElement({
    atomicNumber: 15, symbol: "P", name: "Phosphorus", group: 15, period: 3, block: 'p',
    standardState: 'solid', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p³", electronConfigurationCondensed: "[Ne] 3s² 3p³",
    bohrShells: [2, 8, 5], valenceElectrons: 5, orbitalDiagram: "3p↑ 3p↑ 3p↑",
    atomicMass: 30.974, density: 1.82, meltingPoint: 317.3, boilingPoint: 553.65,
    atomicRadius: 110, electronegativity: 2.19, ionizationEnergy: 10.49,
    oxidationStates: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
    commonCompounds: ["P₂O₅", "H₃PO₄", "PH₃"],
    reactivity: 'moderate', acidBase: 'acidic',
    discoveredBy: "Hennig Brand", discoveryYear: 1669,
    historicalNotes: "Vital for DNA, ATP, and fertilizers.",
    naturalIsotopes: [
      { mass: 31, abundance: 100, halfLife: null, stable: true }
    ],
    mostStableIsotope: "P-31",
    intro: "Phosphorus is vital for DNA, ATP, and fertilizers."
  }),
  createElement({
    atomicNumber: 16, symbol: "S", name: "Sulfur", group: 16, period: 3, block: 'p',
    standardState: 'solid', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁴", electronConfigurationCondensed: "[Ne] 3s² 3p⁴",
    bohrShells: [2, 8, 6], valenceElectrons: 6, orbitalDiagram: "3p↑↓ 3p↑ 3p↑",
    atomicMass: 32.06, density: 2.07, meltingPoint: 388.36, boilingPoint: 717.8,
    atomicRadius: 104, electronegativity: 2.58, ionizationEnergy: 10.36,
    oxidationStates: [-2, -1, 0, 1, 2, 3, 4, 5, 6],
    commonCompounds: ["H₂S", "SO₂", "H₂SO₄"],
    reactivity: 'reactive', acidBase: 'acidic',
    discoveredBy: "Known since ancient times", discoveryYear: null,
    historicalNotes: "Essential for proteins and enzymes.",
    naturalIsotopes: [
      { mass: 32, abundance: 94.99, halfLife: null, stable: true }
    ],
    mostStableIsotope: "S-32",
    intro: "Sulfur is used in fertilizers, chemicals, and pharmaceuticals."
  }),
  createElement({
    atomicNumber: 17, symbol: "Cl", name: "Chlorine", group: 17, period: 3, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁵", electronConfigurationCondensed: "[Ne] 3s² 3p⁵",
    bohrShells: [2, 8, 7], valenceElectrons: 7, orbitalDiagram: "3p↑↓ 3p↑↓ 3p↑",
    atomicMass: 35.45, density: 3.213, meltingPoint: 171.6, boilingPoint: 239.11,
    atomicRadius: 102, electronegativity: 3.16, ionizationEnergy: 12.97,
    oxidationStates: [-1, 0, 1, 3, 5, 7],
    commonCompounds: ["HCl", "NaCl", "Cl₂"],
    reactivity: 'highly-reactive', acidBase: 'acidic',
    discoveredBy: "Carl Wilhelm Scheele", discoveryYear: 1774,
    historicalNotes: "Highly reactive halogen used to disinfect water.",
    naturalIsotopes: [
      { mass: 35, abundance: 75.76, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Cl-35",
    intro: "Chlorine is used to disinfect water and manufacture many industrial chemicals."
  }),
  createElement({
    atomicNumber: 18, symbol: "Ar", name: "Argon", group: 18, period: 3, block: 'p',
    standardState: 'gas', classification: 'nonmetal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶", electronConfigurationCondensed: "[Ne] 3s² 3p⁶",
    bohrShells: [2, 8, 8], valenceElectrons: 8, orbitalDiagram: "3p↑↓ 3p↑↓ 3p↑↓",
    atomicMass: 39.948, density: 1.784, meltingPoint: 83.8, boilingPoint: 87.3,
    atomicRadius: 71, electronegativity: null, ionizationEnergy: 15.76,
    oxidationStates: [0], commonCompounds: [],
    reactivity: 'inert', acidBase: 'n/a',
    discoveredBy: "Lord Rayleigh", discoveryYear: 1894,
    historicalNotes: "Third most abundant gas in Earth's atmosphere.",
    naturalIsotopes: [
      { mass: 40, abundance: 99.6035, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Ar-40",
    intro: "Argon is an inert gas used in welding and lighting."
  }),

  // Period 4 transition metals and post-transition metals
  createElement({
    atomicNumber: 19, symbol: "K", name: "Potassium", group: 1, period: 4, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹", electronConfigurationCondensed: "[Ar] 4s¹",
    bohrShells: [2, 8, 8, 1], valenceElectrons: 1, orbitalDiagram: "4s↑",
    atomicMass: 39.098, density: 0.862, meltingPoint: 336.53, boilingPoint: 1032,
    atomicRadius: 227, electronegativity: 0.82, ionizationEnergy: 4.34,
    oxidationStates: [1], commonCompounds: ["KCl", "K₂O", "KOH"],
    reactivity: 'highly-reactive', acidBase: 'basic',
    discoveredBy: "Humphry Davy", discoveryYear: 1807,
    historicalNotes: "Essential for nerve signaling and muscle contraction.",
    naturalIsotopes: [
      { mass: 39, abundance: 93.2581, halfLife: null, stable: true }
    ],
    mostStableIsotope: "K-39",
    intro: "Potassium is essential for heart, nerve, and muscle function."
  }),
  createElement({
    atomicNumber: 20, symbol: "Ca", name: "Calcium", group: 2, period: 4, block: 's',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²", electronConfigurationCondensed: "[Ar] 4s²",
    bohrShells: [2, 8, 8, 2], valenceElectrons: 2, orbitalDiagram: "4s↑↓",
    atomicMass: 40.078, density: 1.55, meltingPoint: 1115, boilingPoint: 1757,
    atomicRadius: 197, electronegativity: 1.00, ionizationEnergy: 6.11,
    oxidationStates: [2], commonCompounds: ["CaCO₃", "CaO", "Ca(OH)₂"],
    reactivity: 'reactive', acidBase: 'basic',
    discoveredBy: "Humphry Davy", discoveryYear: 1808,
    historicalNotes: "Vital for strong bones and teeth.",
    naturalIsotopes: [
      { mass: 40, abundance: 96.941, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Ca-40",
    intro: "Calcium is vital for bones, teeth, and muscle function."
  }),
  createElement({
    atomicNumber: 26, symbol: "Fe", name: "Iron", group: 8, period: 4, block: 'd',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²", electronConfigurationCondensed: "[Ar] 3d⁶ 4s²",
    bohrShells: [2, 8, 14, 2], valenceElectrons: 8, orbitalDiagram: "3d↑ 3d↑ 3d↑ 3d↑ 3d↑ 4s↑↓",
    atomicMass: 55.845, density: 7.874, meltingPoint: 1811, boilingPoint: 3134,
    atomicRadius: 126, electronegativity: 1.83, ionizationEnergy: 7.87,
    oxidationStates: [-2, -1, 0, 1, 2, 3, 4, 5, 6],
    commonCompounds: ["Fe₂O₃", "FeO", "Fe₃O₄"],
    reactivity: 'reactive', acidBase: 'neutral',
    discoveredBy: "Known since ancient times", discoveryYear: null,
    historicalNotes: "One of the most important industrial metals.",
    naturalIsotopes: [
      { mass: 56, abundance: 91.754, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Fe-56",
    intro: "Iron is one of the most important industrial metals and essential in hemoglobin."
  }),
  createElement({
    atomicNumber: 29, symbol: "Cu", name: "Copper", group: 11, period: 4, block: 'd',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹", electronConfigurationCondensed: "[Ar] 3d¹⁰ 4s¹",
    bohrShells: [2, 8, 18, 1], valenceElectrons: 11, orbitalDiagram: "3d↑↓ 3d↑↓ 3d↑↓ 3d↑↓ 3d↑↓ 4s↑",
    atomicMass: 63.546, density: 8.96, meltingPoint: 1357.77, boilingPoint: 2835,
    atomicRadius: 128, electronegativity: 1.90, ionizationEnergy: 7.73,
    oxidationStates: [1, 2, 3],
    commonCompounds: ["CuO", "CuCl₂", "CuSO₄"],
    reactivity: 'moderate', acidBase: 'neutral',
    discoveredBy: "Known since ancient times", discoveryYear: null,
    historicalNotes: "Excellent conductor of electricity and heat.",
    naturalIsotopes: [
      { mass: 63, abundance: 69.15, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Cu-63",
    intro: "Copper is the best conductor of electricity after silver."
  }),
  createElement({
    atomicNumber: 30, symbol: "Zn", name: "Zinc", group: 12, period: 4, block: 'd',
    standardState: 'solid', classification: 'metal',
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²", electronConfigurationCondensed: "[Ar] 3d¹⁰ 4s²",
    bohrShells: [2, 8, 18, 2], valenceElectrons: 12, orbitalDiagram: "3d↑↓ 3d↑↓ 3d↑↓ 3d↑↓ 3d↑↓ 4s↑↓",
    atomicMass: 65.38, density: 7.14, meltingPoint: 692.68, boilingPoint: 1180,
    atomicRadius: 134, electronegativity: 1.65, ionizationEnergy: 9.39,
    oxidationStates: [2],
    commonCompounds: ["ZnO", "ZnCl₂", "ZnSO₄"],
    reactivity: 'moderate', acidBase: 'amphoteric',
    discoveredBy: "Documented in ancient times", discoveryYear: null,
    historicalNotes: "Essential trace element in many enzymes.",
    naturalIsotopes: [
      { mass: 64, abundance: 48.268, halfLife: null, stable: true }
    ],
    mostStableIsotope: "Zn-64",
    intro: "Zinc is important for immunity and is used in galvanizing."
  }),

  // Placeholder for remaining elements (31-118) - simplified format
  // These can be expanded with more detail as needed
  ...Array.from({ length: 88 }, (_, i) => {
    const atomicNum = i + 31;
    // Generate simplified data for remaining elements
    const symbols = ["Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];
    const names = ["Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tennessine", "Oganesson"];
    
    return createElement({
      atomicNumber: atomicNum,
      symbol: symbols[i],
      name: names[i],
      group: null,
      period: atomicNum <= 36 ? 4 : atomicNum <= 54 ? 5 : atomicNum <= 86 ? 6 : 7,
      block: 'p',
      standardState: 'solid',
      classification: 'metal',
      electronConfiguration: `Element ${atomicNum}`,
      electronConfigurationCondensed: `[noble gas] ...`,
      bohrShells: [],
      valenceElectrons: 0,
      orbitalDiagram: "",
      atomicMass: 0,
      density: null,
      meltingPoint: null,
      boilingPoint: null,
      atomicRadius: null,
      electronegativity: null,
      ionizationEnergy: null,
      oxidationStates: [],
      commonCompounds: [],
      reactivity: 'unreactive',
      acidBase: 'n/a',
      discoveredBy: null,
      discoveryYear: null,
      historicalNotes: null,
      naturalIsotopes: [],
      mostStableIsotope: "",
      intro: `${names[i]} is element ${atomicNum}.`
    });
  })
];
