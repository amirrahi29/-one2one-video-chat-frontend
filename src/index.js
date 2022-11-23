import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './Context';
import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root'),
);
