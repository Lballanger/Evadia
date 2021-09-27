/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Homepage from '../Homepage';
import Contact from '../Contact';
import About from '../About';
import Legals from '../Legals';
import Criteria from '../Criteria';
import Results from '../Results';
import Details from '../Details';
import Connexion from '../Connexion';
import Account from '../Account';
import Inscription from '../Inscription';
import Notfound from '../Notfound';
import API from '../../api';
import { useUser } from '../../hooks/useAuth';

import './index.scss';
import NewPassword from '../NewPassword';
import ForgottenPassword from '../ForgottenPassword';
import userStore from '../../store/user';

const App = () => {
  const setUser = userStore((state) => state.setUser);
  const { data, isError, error, isLoading } = useUser();
  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (isError) {
      console.log('APP USER ERROR: ', error);
      setUser(null);
    }
  }, [data, isError]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Header />
      <main>
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
          <Route path="/connexion" exact>
            <Connexion />
          </Route>
          <Route path="/account" exact>
            {/* <ProtectedRoute component={Account} /> */}
            <Account />
          </Route>
          <Route path="/inscription" exact>
            <Inscription />
          </Route>
          <Route path="/newpassword" exact>
            <NewPassword />
          </Route>
          <Route path="/forgottenPassword" exact>
            <ForgottenPassword />
          </Route>
          <Route>
            <Notfound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
};

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = userStore((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        }
        return <Redirect to="/connexion" />;
      }}
    />
  );
};

export default App;
