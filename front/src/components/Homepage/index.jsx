import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Homepage = () => (
  <>
    <Header />
    <div className="homepage__container">
      <p>Hello world</p>
    </div>
    <Footer />
  </>
);

export default Homepage;
