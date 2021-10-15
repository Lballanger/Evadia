import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import clientQuery from './hooks';

import App from './components/App';

setLogger({
  error: () => {},
  warn: () => {},
  log: () => {},
});

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <QueryClientProvider client={clientQuery}>
        <Toaster position="bottom-center" />
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </Router>,

  document.getElementById('root')
);
