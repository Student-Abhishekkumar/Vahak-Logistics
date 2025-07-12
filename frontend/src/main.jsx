import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log("Application is starting..."); // Add this line

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);