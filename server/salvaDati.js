// server/salvaDati.js
const fs = require('fs');

module.exports = async (req, res) => {
  const data = req.body;

  const existingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  existingData.push(data);
  fs.writeFileSync('data.json', JSON.stringify(existingData));

  res.json({ message: 'Dati salvati con successo.' });
};
