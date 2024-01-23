// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './Navbar';
import FormComponent from './FormComponent';

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <FormComponent />
    </div>
  );
}

export default App;