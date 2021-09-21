import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../Homepage';
import Contact from '../Contact';
import About from '../About';
import Legals from '../Legals';

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
    <Route path="/legals" exact>
      <Legals />
    </Route>
  </Switch>
);

export default App;
