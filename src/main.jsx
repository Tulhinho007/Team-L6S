import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx' // Certifique-se que o A é maiúsculo aqui
import './index.css'  // ← ADICIONE ESTA LINHA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)