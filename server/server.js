const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// Aggiunta di una logica per creare 'data.json' se non esiste
const dataFilePath = 'data.json';
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]', 'utf-8');
}

// Endpoint per generare e restituire il token CSRF
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  res.json({ csrfToken });
});

app.post('/api/salvaDati', (req, res) => {
  const data = req.body;

  // Leggi i dati attuali dal file JSON
  const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

  // Aggiungi i nuovi dati
  existingData.push(data);

  // Scrivi i dati aggiornati sul file JSON
  fs.writeFileSync(dataFilePath, JSON.stringify(existingData));

  res.json({ message: 'Dati salvati con successo.' });
});

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
