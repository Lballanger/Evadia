import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../Homepage';
import Contact from '../Contact';
import About from '../About';

import './index.scss';

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Homepage />
    </Route>
    <Route path="/contact" exact>
      <Contact />
    </Route>
    <Route path="/about" exact>
      <About />
    </Route>
  </Switch>
);

export default App;
