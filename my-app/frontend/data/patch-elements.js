const { Project } = require("ts-morph");
const fs = require("fs");

const DISCOVERY = {
  1: ["Henry Cavendish", 1766],
  2: ["Pierre Janssen / Norman Lockyer", 1868],
  3: ["Johan August Arfwedson", 1817],
  4: ["Friedrich Wöhler / A. A. Bussy", 1798],
  5: ["Joseph Louis Gay-Lussac / Louis Jacques Thénard", 1808],
  6: ["Ancient civilizations", 0],
  7: ["Daniel Rutherford", 1772],
  8: ["Carl Wilhelm Scheele", 1771],
  9: ["Henri Moissan", 1886],
  10: ["William Ramsay / Morris Travers", 1898],
  11: ["Humphry Davy", 1807],
  12: ["Joseph Black", 1755],
  13: ["Hans Christian Ørsted", 1825],
  14: ["Jöns Jacob Berzelius", 1824],
  15: ["Hennig Brand", 1669],
  16: ["Ancient civilizations", 0],
  17: ["Carl Wilhelm Scheele", 1774],
  18: ["Lord Rayleigh / William Ramsay", 1894],
  19: ["Humphry Davy", 1807],
  20: ["Humphry Davy", 1808],
  21: ["Lars Fredrik Nilson", 1879],
  22: ["William Gregor", 1791],
  23: ["André-Marie Ampère", 1830],
  24: ["Louis Nicolas Vauquelin", 1797],
  25: ["Carl Wilhelm Scheele", 1774],
  26: ["Ancient civilizations", 0],
  27: ["Georg Brandt", 1735],
  28: ["Axel Cronstedt", 1751],
  29: ["Ancient civilizations", 0],
  30: ["Andreas Marggraf", 1746],
  31: ["Paul Émile Lecoq de Boisbaudran", 1875],
  32: ["Clemens Winkler", 1886],
  33: ["Albertus Magnus", 1250],
  34: ["Jöns Jacob Berzelius", 1817],
  35: ["Antoine Jérôme Balard", 1826],
  36: ["William Ramsay / Morris Travers", 1898],
  37: ["Robert Bunsen / Gustav Kirchhoff", 1861],
  38: ["William Cruickshank", 1790],
  39: ["Johan Gadolin", 1794],
  40: ["Martin Heinrich Klaproth", 1789],
  41: ["Charles Hatchett", 1801],
  42: ["Carl Wilhelm Scheele", 1778],
  43: ["Emilio Segrè", 1937],
  44: ["Karl Samuel Leberecht Hermann", 1817],
  45: ["William Hyde Wollaston", 1803],
  46: ["William Hyde Wollaston", 1803],
  47: ["Ancient civilizations", 0],
  48: ["Friedrich Stromeyer", 1817],
  49: ["Ferdinand Reich", 1863],
  50: ["Ancient civilizations", 0],
  51: ["Basil Valentine", 1450],
  52: ["Franz-Joseph Müller von Reichenstein", 1783],
  53: ["Bernard Courtois", 1811],
  54: ["William Ramsay / Morris Travers", 1898],
  55: ["Gustav Kirchhoff", 1860],
  56: ["Humphry Davy", 1808],
  57: ["Carl Gustaf Mosander", 1839],
  58: ["Jöns Jacob Berzelius", 1804],
  59: ["Carl Gustaf Mosander", 1841],
  60: ["Carl Auer von Welsbach", 1885],
  61: ["Charles D. Coryell", 1945],
  62: ["Paul-Émile Lecoq de Boisbaudran", 1879],
  63: ["Eugène-Anatole Demarçay", 1901],
  64: ["Jean Charles Galissard de Marignac", 1880],
  65: ["Carl Gustaf Mosander", 1843],
  66: ["Paul-Émile Lecoq de Boisbaudran", 1886],
  67: ["Jacques-Louis Soret", 1878],
  68: ["Carl Gustaf Mosander", 1843],
  69: ["Per Teodor Cleve", 1879],
  70: ["Jean Charles Galissard de Marignac", 1878],
  71: ["Georges Urbain / Carl Auer von Welsbach", 1907],
  72: ["George de Hevesy", 1922],
  73: ["Anders Gustaf Ekeberg", 1802],
  74: ["Fausto Elhuyar", 1783],
  75: ["Walter Noddack", 1925],
  76: ["William Hyde Wollaston", 1804],
  77: ["Smithson Tennant", 1803],
  78: ["Julius Caesar Scaliger", 1557],
  79: ["Ancient civilizations", 0],
  80: ["Ancient civilizations", 0],
  81: ["William Crookes", 1861],
  82: ["Ancient civilizations", 0],
  83: ["Georgius Agricola", 1546],
  84: ["Marie Curie", 1898],
  85: ["Emilio Segrè", 1940],
  86: ["Ernest Rutherford", 1899],
  87: ["Marguerite Perey", 1939],
  88: ["Marie Curie / Pierre Curie", 1898],
  89: ["André-Louis Debierne", 1899],
  90: ["Jöns Jacob Berzelius", 1828],
  91: ["Lise Meitner", 1917],
  92: ["Martin Heinrich Klaproth", 1789],
  93: ["Edwin McMillan", 1940],
  94: ["Edwin McMillan", 1941],
  95: ["Glenn Seaborg", 1944],
  96: ["Glenn Seaborg", 1944],
  97: ["Glenn Seaborg", 1949],
  98: ["Glenn Seaborg", 1950],
  99: ["Glenn Seaborg", 1952],
  100: ["Glenn Seaborg", 1952],
  101: ["Glenn Seaborg", 1955],
  102: ["Glenn Seaborg", 1958],
  103: ["Albert Ghiorso", 1961],
  104: ["Albert Ghiorso", 1964],
  105: ["JINR", 1970],
  106: ["Yuri Oganessian", 1974],
  107: ["Yuri Oganessian", 1976],
  108: ["GSI Helmholtz Centre", 1984],
  109: ["GSI Helmholtz Centre", 1982],
  110: ["GSI Helmholtz Centre", 1994],
  111: ["GSI Helmholtz Centre", 1994],
  112: ["GSI Helmholtz Centre", 1996],
  113: ["JINR", 2003],
  114: ["Joint Institute for Nuclear Research", 1999],
  115: ["Joint Institute for Nuclear Research", 2003],
  116: ["Joint Institute for Nuclear Research", 2000],
  117: ["Yuri Oganessian / JINR", 2009],
  118: ["Lawrence Livermore Lab", 2002],
};

const project = new Project();
project.addSourceFileAtPath("my-app/frontend/data/elements.ts");

const file = project.getSourceFileOrThrow("my-app/frontend/data/elements.ts");

let missing = [];

file.getDescendantsOfKind(264).forEach((obj) => {
  const atomicProp = obj.getProperty("atomicNumber");
  if (!atomicProp) return;

  const atomicValue = atomicProp.getInitializer()?.getText();
  const num = Number(atomicValue);

  if (!DISCOVERY[num]) {
    missing.push(num);
    return;
  }

  const existingBy = obj.getProperty("discoveredBy");
  const existingYear = obj.getProperty("discoveredYear");

  if (existingBy || existingYear) return;

  const [by, year] = DISCOVERY[num];

  obj.insertProperties(0, [
    {
      name: "discoveredBy",
      initializer: `"${by}"`,
    },
    {
      name: "discoveredYear",
      initializer: `${year}`,
    },
  ]);
});

file.saveSync();

console.log("✔ PATCH COMPLETE");

if (missing.length) {
  console.log("⚠ Missing elements:", [...new Set(missing)].sort((a,b)=>a-b));
}