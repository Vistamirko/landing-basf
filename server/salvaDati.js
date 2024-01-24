const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const dataFilePath = 'data.json';
    const data = req.body;

    // Leggi i dati attuali dal file JSON
    const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

    // Aggiungi i nuovi dati
    existingData.push(data);

    // Scrivi i dati aggiornati sul file JSON
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData));

    res.json({ message: 'Dati salvati con successo.' });
  } catch (error) {
    console.error('Errore durante il salvataggio dei dati:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante il salvataggio dei dati.' });
  }
};
