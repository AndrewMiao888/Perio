// Sample controller for periodic table API

export const getElements = (req, res) => {
  try {
    const elements = [
      { id: 1, name: 'Hydrogen', symbol: 'H', number: 1 },
      { id: 2, name: 'Helium', symbol: 'He', number: 2 },
      { id: 3, name: 'Lithium', symbol: 'Li', number: 3 }
    ];
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getElementById = (req, res) => {
  try {
    const { id } = req.params;
    const element = { id, name: 'Sample Element', symbol: 'Se', number: parseInt(id) };
    res.json(element);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createElement = (req, res) => {
  try {
    const { name, symbol, number } = req.body;
    const newElement = { id: Date.now(), name, symbol, number };
    res.status(201).json(newElement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
