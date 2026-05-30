import fs from "fs";

const OUTPUT = "./elements.ts";

const PERIODIC_URL =
  "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json";

const PUBCHEM_PERIODIC =
  "https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON";

async function getJSON(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} -> ${url}`);
  }

  return await res.json();
}

function safe(v) {
  return v === undefined ? null : v;
}

function mergeObjects(...objs) {
  const out = {};

  for (const obj of objs) {
    for (const [k, v] of Object.entries(obj || {})) {
      if (
        v !== null &&
        v !== undefined &&
        v !== "" &&
        !(Array.isArray(v) && v.length === 0)
      ) {
        out[k] = v;
      }
    }
  }

  return out;
}

async function loadPeriodicTableJSON() {
  const data = await getJSON(PERIODIC_URL);

  const map = {};

  for (const el of data.elements) {
    map[el.number] = {
      source_periodicTableJSON: true,

      atomicNumber: safe(el.number),
      symbol: safe(el.symbol),
      name: safe(el.name),

      atomic_mass: safe(el.atomic_mass),

      appearance: safe(el.appearance),
      category: safe(el.category),
      phase: safe(el.phase),

      density: safe(el.density),

      melt: safe(el.melt),
      boil: safe(el.boil),

      molar_heat: safe(el.molar_heat),

      discovered_by: safe(el.discovered_by),

      named_by: safe(el.named_by),

      summary: safe(el.summary),

      source: safe(el.source),

      spectral_img: safe(el.spectral_img),

      xpos: safe(el.xpos),
      ypos: safe(el.ypos),

      shells: safe(el.shells),

      electron_configuration: safe(
        el.electron_configuration
      ),

      electron_configuration_semantic: safe(
        el.electron_configuration_semantic
      ),

      electron_affinity: safe(
        el.electron_affinity
      ),

      electronegativity_pauling: safe(
        el.electronegativity_pauling
      ),

      ionization_energies: safe(
        el.ionization_energies
      ),

      block:
        el.xpos <= 2
          ? "s"
          : el.xpos <= 12
          ? "d"
          : el.xpos <= 18
          ? "p"
          : "f",

      period: safe(el.ypos),
      group: safe(el.xpos),
    };
  }

  return map;
}

async function loadPubChem() {
  const data = await getJSON(PUBCHEM_PERIODIC);

  const map = {};

  const rows =
    data?.Table?.Row ||
    data?.Rows ||
    [];

  for (const row of rows) {
    const n =
      row.AtomicNumber ||
      row.atomicNumber;

    if (!n) continue;

    map[n] = {
      source_pubchem: true,
      ...row,
    };
  }

  return map;
}

async function loadWikidata(number) {
  const query = `
SELECT ?element ?elementLabel ?discovererLabel ?namedAfterLabel
WHERE {
  ?element wdt:P1086 ${number}.

  OPTIONAL {
    ?element wdt:P61 ?discoverer.
  }

  OPTIONAL {
    ?element wdt:P138 ?namedAfter.
  }

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }
}
LIMIT 1
`;

  const url =
    "https://query.wikidata.org/sparql?format=json&query=" +
    encodeURIComponent(query);

  try {
    const data = await getJSON(url);

    const row =
      data?.results?.bindings?.[0];

    if (!row) return {};

    return {
      source_wikidata: true,

      wikidata_label:
        row.elementLabel?.value,

      discoverer:
        row.discovererLabel?.value,

      named_after:
        row.namedAfterLabel?.value,
    };
  } catch {
    return {};
  }
}

async function main() {
  console.log(
    "Downloading datasets..."
  );

  const periodic =
    await loadPeriodicTableJSON();

  const pubchem =
    await loadPubChem();

  const elements = [];

  for (
    let atomicNumber = 1;
    atomicNumber <= 118;
    atomicNumber++
  ) {
    console.log(
      `Element ${atomicNumber}/118`
    );

    const wikidata =
      await loadWikidata(
        atomicNumber
      );

    const merged =
      mergeObjects(
        periodic[atomicNumber],
        pubchem[atomicNumber],
        wikidata
      );

    elements.push(merged);

    await new Promise((r) =>
      setTimeout(r, 150)
    );
  }

  const ts =
    `export const elements = ` +
    JSON.stringify(
      elements,
      null,
      2
    ) +
    ` as const;\n`;

  fs.writeFileSync(
    OUTPUT,
    ts,
    "utf8"
  );

  console.log(
    `\nDONE -> ${OUTPUT}`
  );

  console.log(
    `Generated ${elements.length} elements`
  );
}

main().catch(console.error);