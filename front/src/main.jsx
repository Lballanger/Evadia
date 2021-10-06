import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import clientQuery from './hooks';

import App from './components/App';
import ToastProvider from './context/toastContext';

setLogger({
  error: () => {},
  warn: () => {},
  log: () => {},
});

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
