const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa il pacchetto CORS
const fs = require('fs');



const app = express();
const port = 5001;

app.use(cors());  // Usa il middleware CORS

app.use(bodyParser.json());

app.post('/api/salvaDati', (req, res) => {
    const data = req.body;

    // Leggi i dati attuali dal file JSON
    const existingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  
    // Aggiungi i nuovi dati
    existingData.push(data);
  
    // Scrivi i dati aggiornati sul file JSON
    fs.writeFileSync('data.json', JSON.stringify(existingData));
  
    res.json({ message: 'Dati salvati con successo.' });
});

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});