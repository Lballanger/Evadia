import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import clientQuery from './hooks';

import App from './components/App';
import ToastProvider from './context/toastContext';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <QueryClientProvider client={clientQuery}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </Router>,

  document.getElementById('root')
);
