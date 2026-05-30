// Periodic table API controller
// Serves element data with filtering, search, and sorting capabilities

// Import element data (in a real app, this would come from a database)
// For now, we'll use a in-memory store or import from a JSON file
const elementData = [
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", group: 1, period: 1, block: 's', standardState: 'gas', classification: 'nonmetal', atomicMass: 1.008 },
  { atomicNumber: 2, symbol: "He", name: "Helium", group: 18, period: 1, block: 's', standardState: 'gas', classification: 'nonmetal', atomicMass: 4.0026 },
  { atomicNumber: 3, symbol: "Li", name: "Lithium", group: 1, period: 2, block: 's', standardState: 'solid', classification: 'metal', atomicMass: 6.94 },
  { atomicNumber: 6, symbol: "C", name: "Carbon", group: 14, period: 2, block: 'p', standardState: 'solid', classification: 'nonmetal', atomicMass: 12.011 },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", group: 15, period: 2, block: 'p', standardState: 'gas', classification: 'nonmetal', atomicMass: 14.007 },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", group: 16, period: 2, block: 'p', standardState: 'gas', classification: 'nonmetal', atomicMass: 15.999 },
  { atomicNumber: 11, symbol: "Na", name: "Sodium", group: 1, period: 3, block: 's', standardState: 'solid', classification: 'metal', atomicMass: 22.990 },
  { atomicNumber: 17, symbol: "Cl", name: "Chlorine", group: 17, period: 3, block: 'p', standardState: 'gas', classification: 'nonmetal', atomicMass: 35.45 },
  { atomicNumber: 26, symbol: "Fe", name: "Iron", group: 8, period: 4, block: 'd', standardState: 'solid', classification: 'metal', atomicMass: 55.845 },
  { atomicNumber: 29, symbol: "Cu", name: "Copper", group: 11, period: 4, block: 'd', standardState: 'solid', classification: 'metal', atomicMass: 63.546 }
];

/**
 * GET /api/elements
 * Returns all elements or filtered by query parameters
 * Query params: group, period, block, classification, state, search
 */
export const getElements = (req, res) => {
  try {
    const { group, period, block, classification, state, search } = req.query;
    let filtered = [...elementData];

    // Apply filters
    if (group) filtered = filtered.filter(e => e.group === parseInt(group));
    if (period) filtered = filtered.filter(e => e.period === parseInt(period));
    if (block) filtered = filtered.filter(e => e.block === block);
    if (classification) filtered = filtered.filter(e => e.classification === classification);
    if (state) filtered = filtered.filter(e => e.standardState === state);
    
    // Search by name or symbol
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(searchLower) || 
        e.symbol.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      count: filtered.length,
      elements: filtered
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/elements/:id
 * Returns a specific element by atomic number
 */
export const getElementById = (req, res) => {
  try {
    const { id } = req.params;
    const atomicNumber = parseInt(id);
    const element = elementData.find(e => e.atomicNumber === atomicNumber);
    
    if (!element) {
      return res.status(404).json({ error: `Element with atomic number ${atomicNumber} not found` });
    }
    
    res.json(element);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/elements
 * Creates a new element (for future use with admin panel)
 */
export const createElement = (req, res) => {
  try {
    const { atomicNumber, symbol, name, group, period, block, standardState, classification, atomicMass } = req.body;
    
    // Validation
    if (!atomicNumber || !symbol || !name) {
      return res.status(400).json({ error: 'Missing required fields: atomicNumber, symbol, name' });
    }

    const newElement = {
      atomicNumber,
      symbol,
      name,
      group: group || null,
      period: period || null,
      block: block || 's',
      standardState: standardState || 'solid',
      classification: classification || 'nonmetal',
      atomicMass: atomicMass || 0
    };

    elementData.push(newElement);
    res.status(201).json(newElement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/elements/by-symbol/:symbol
 * Returns an element by chemical symbol
 */
export const getElementBySymbol = (req, res) => {
  try {
    const { symbol } = req.params;
    const element = elementData.find(e => e.symbol.toLowerCase() === symbol.toLowerCase());
    
    if (!element) {
      return res.status(404).json({ error: `Element with symbol ${symbol} not found` });
    }
    
    res.json(element);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/periodic-table
 * Returns the full periodic table organized by period and group
 */
export const getPeriodicTable = (req, res) => {
  try {
    const table = {
      periods: {},
      groups: {}
    };

    elementData.forEach(element => {
      // Organize by period
      if (!table.periods[element.period]) {
        table.periods[element.period] = [];
      }
      table.periods[element.period].push(element);

      // Organize by group
      if (element.group) {
        if (!table.groups[element.group]) {
          table.groups[element.group] = [];
        }
        table.groups[element.group].push(element);
      }
    });

    res.json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/statistics
 * Returns statistics about elements
 */
export const getStatistics = (req, res) => {
  try {
    const stats = {
      totalElements: elementData.length,
      byClassification: {},
      byState: {},
      byPeriod: {},
      averageAtomicMass: 0
    };

    let totalMass = 0;
    elementData.forEach(element => {
      // Count by classification
      stats.byClassification[element.classification] = (stats.byClassification[element.classification] || 0) + 1;
      
      // Count by state
      stats.byState[element.standardState] = (stats.byState[element.standardState] || 0) + 1;
      
      // Count by period
      stats.byPeriod[element.period] = (stats.byPeriod[element.period] || 0) + 1;
      
      // Sum for average
      totalMass += element.atomicMass;
    });

    stats.averageAtomicMass = elementData.length > 0 ? (totalMass / elementData.length).toFixed(2) : 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
