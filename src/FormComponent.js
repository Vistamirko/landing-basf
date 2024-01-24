// FormComponent.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'react-bootstrap';

function FormComponent() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    email: '',
    telefono: '',
    messaggio: ''
  });

  const [isChecked, setIsChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Carica il token CSRF dal server quando il componente viene montato
    fetch('http://localhost:5001/api/csrf-token')
      .then(response => response.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(error => console.error('Errore nel recupero del token CSRF:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 4000); // Nasconde l'alert dopo 3 secondi
  };

  const handleSubmit = async () => {
    if (!isChecked) {
      showAlert('Devi accettare i termini prima di inviare il modulo.');
      return;
    }

    // Verifica che tutti i campi obbligatori siano compilati
    if (!formData.nome || !formData.cognome || !formData.azienda || !formData.email || !formData.messaggio) {
      showAlert('Compila tutti i campi obbligatori prima di inviare il modulo.');
      return;
    }

    // Verifica la validità dell'indirizzo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showAlert('Inserisci un indirizzo email valido.');
      return;
    }

    // Verifica la validità del numero di telefono (opzionale)
    const phoneRegex = /^\d{4}$/; // Esempio: 1234567890
    if (formData.telefono && !phoneRegex.test(formData.telefono)) {
      showAlert('Inserisci un numero di telefono valido.');
      return;
    }

    try {
      // Inserisci qui il codice per il tracking pixel al click del bottone "Invia"
      const trackingPixelUrl = 'URL_DEL_TUO_PIXEL';
      const img = new Image();
      img.src = trackingPixelUrl;
      // Fine del codice del tracking pixel

      // Codice di invio del modulo
      const response = await fetch('http://localhost:5001/api/salvaDati', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Includi il token CSRF nelle intestazioni della richiesta
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert(`Dati inviati con successo: ${result.message}`);
        // Svuota i campi del form dopo l'invio
        setFormData({
          nome: '',
          cognome: '',
          azienda: '',
          email: '',
          telefono: '',
          messaggio: '',
        });
      } else {
        showAlert(`Errore nell'invio dei dati: ${result.error}`);
      }
    } catch (error) {
      console.error('Errore nell\'invio dei dati:', error);
      showAlert('Errore nell\'invio dei dati. Controlla la console per ulteriori dettagli.');
    }
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label className="form-label">Nome<span className="text-danger">*</span>:</label>
          <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Cognome<span className="text-danger">*</span>:</label>
          <input type="text" className="form-control" name="cognome" value={formData.cognome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Azienda<span className="text-danger">*</span>:</label>
          <input type="text" className="form-control" name="azienda" value={formData.azienda} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email<span className="text-danger">*</span>:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefono:</label>
          <input type="tel" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Messaggio<span className="text-danger">*</span>:</label>
          <textarea className="form-control" name="messaggio" value={formData.messaggio} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="termsCheckbox" checked={isChecked} onChange={handleCheckboxChange} required />
          <label className="form-check-label" htmlFor="termsCheckbox">Accetto i termini</label>
        </div>
        <div className="mb-3">
          <p>Aggiungo testo</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Invia</button>
      </form>
      <Toast
        show={!!alertMessage}
        onClose={() => setAlertMessage('')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Notifica</strong>
        </Toast.Header>
        <Toast.Body>{alertMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default FormComponent;
