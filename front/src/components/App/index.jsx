import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../Homepage';
import Contact from '../Contact';
import About from '../About';
import Legals from '../Legals';
import Criteria from '../Criteria';
import Results from '../Results';
import Details from '../Details';

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
    <Route path="/criteria" exact>
      <Criteria />
    </Route>
    <Route path="/results" exact>
      <Results />
    </Route>
    <Route path="/details" exact>
      <Details />
    </Route>
  </Switch>
);

export default App;
