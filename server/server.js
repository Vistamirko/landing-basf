// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const salvaDati = require('./salvaDati'); // Importa la funzione di gestione della richiesta

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/salvaDati', salvaDati); // Utilizza la funzione di gestione della richiesta

module.exports = app;
