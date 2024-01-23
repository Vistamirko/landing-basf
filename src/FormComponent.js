// FormComponent.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'react-bootstrap';

function FormComponent() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: ''
  });

  const [isChecked, setIsChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    if (!formData.nome || !formData.email || !formData.messaggio) {
      showAlert('Compila tutti i campi obbligatori prima di inviare il modulo.');
      return;
    }

    // Verifica la validità dell'indirizzo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showAlert('Inserisci un indirizzo email valido.');
      return;
    }

    try {
      const response = await fetch('/api/salvaDati', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        showAlert(`Dati inviati con successo: ${result.message}`);
        // Svuota i campi del form dopo l'invio
        setFormData({
          nome: '',
          email: '',
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
          <label className="form-label">Email<span className="text-danger">*</span>:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
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
