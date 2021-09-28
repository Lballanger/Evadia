/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './styles.scss';
import avatar from '../../assets/images/avatar.png';

const About = () => (
  <>
    <div className="About__container">
      <h1 className="About__h1">A propos</h1>
      <h2 className="About__h2">Evadia</h2>
      <h3 className="About__h3">Qu'est-ce qu'est EVADIA ?</h3>
      <p className="About__p">
        EVADIA est un projet de fin d'année de 5 étudiants de la promo Uther
        d'O'Clock. Réalisé en 4 semaines, de A à Z, il a nécessité le savoir de
        3 personnes en Back et 2 et demie en Front. Nous comptons le "et demie"
        car Germain Michaud a été sur le front (
        <span className="italic">c'est le cas de le dire</span>) des deux côtés.
      </p>
      <h3 className="About__h3">Quelle est l'utilité de ce site ?</h3>
      <p className="About__p">
        Nous sommes partis de la problématique que quand une personne souhaite
        déménager dans une autre ville, pour diverses raisons, il lui est bien
        souvent difficile de trouver certaines informations essentielles
        facilement. Notre site regroupe toutes ces informations au même endroit.
      </p>
      <h3 className="About__h3">Comment avons-nous procédé ?</h3>
      <p className="About__p">
        L'équipe du Back, Alison Serra (qui est à l'initiative du projet), Loïc
        Ballanger et Germain Michaud ont récupéré une quantité folle
        d'informations à travers des API gouvernementales afin de créer leur
        propre API, celle que nous utilisons pour la quasi-intégralité du site.
      </p>

      <h3 className="About__h3">L'équipe</h3>
      <div className="About__team">
        <div className="About__team__display">
          <img src={avatar} className="About__team__avatar" alt="avatar" />
          <p className="About__team__dev">
            Germain <span className="italic">Le Grand Berlin</span>
          </p>

          <img src={avatar} className="About__team__avatar" alt="avatar" />
          <figcaption className="About__team__dev">
            Clément <span className="italic">Le Magnifique</span>
          </figcaption>

          <img src={avatar} className="About__team__avatar" alt="avatar" />
          <figcaption className="About__team__dev">
            Alison <span className="italic">Emoji Sensei</span>
          </figcaption>

          <img src={avatar} className="About__team__avatar" alt="avatar" />
          <figcaption className="About__team__dev">
            François <span className="italic">Le Talentueux</span>
          </figcaption>

          <img src={avatar} className="About__team__avatar" alt="avatar" />
          <figcaption className="About__team__dev">
            Loïc <span className="italic">Le Meilleur des Deux</span>
          </figcaption>
        </div>
      </div>
    </div>
  </>
);

export default About;
