import { NavLink } from 'react-router-dom';
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Results = () => (
  <>
    <Header />

    <div className="results">
      <div className="results__criteria">
        <div className="criteria__return">
          <NavLink type="button" to="/criteria">
            Retour vers la page des critères
          </NavLink>
        </div>
        <div className="resultsNbr">0 villes dans votre recherches</div>
      </div>
    </div>

    <div className="result">
      <button type="button" className="result__button">
        <img className="picture" src="../public/paris.jpg" alt="city" />
        <div className="result__info">
          <p>Paris</p>
          <div className="infos">
            <p>info</p>
            <p>info</p>
          </div>
        </div>
      </button>
    </div>

    <div className="result">
      <button type="button" className="result__button">
        <img className="picture" src="../public/paris.jpg" alt="city" />
        <div className="result__info">
          <p>Paris</p>
          <div className="infos">
            <p>info</p>
            <p>info</p>
          </div>
        </div>
      </button>
    </div>

    <div className="result">
      <button type="button" className="result__button">
        <img className="picture" src="../public/paris.jpg" alt="city" />
        <div className="result__info">
          <p>Paris</p>
          <div className="infos">
            <p>info</p>
            <p>info</p>
          </div>
        </div>
      </button>
    </div>

    <div className="result">
      <button type="button" className="result__button">
        <img className="picture" src="../public/paris.jpg" alt="city" />
        <div className="result__info">
          <p>Paris</p>
          <div className="infos">
            <p>info</p>
            <p>info</p>
          </div>
        </div>
      </button>
    </div>

    <Footer />
  </>
);

export default Results;
