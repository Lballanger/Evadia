import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import clientQuery from './hooks';

import App from './components/App';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <QueryClientProvider client={clientQuery}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </Router>,

  document.getElementById('root')
);
