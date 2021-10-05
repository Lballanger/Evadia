/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './styles.scss';
import { motion } from 'framer-motion';
import avatar from '../../assets/images/avatar.png';
import avatarFC from '../../assets/images/FC.png';

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
        facilement. Ces informations, tel que la météo à l'année, la taille de
        la population d'une commune, les écoles ou encore les hôpitaux proches,
        sont toutes regroupées sur notre site. Nous planifions d'or et déjà de
        rajouter davantage de critères comme l'éligibilité de la fibre, liker un
        lieu et une messagerie interne entre utilisateurs.
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
          <div className="About__team__one">
            <a
              href="https://github.com/GermainMichaud"
              className="About__team__a"
            >
              <motion.img
                whileHover={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, -360, -360, -360],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 3],
                }}
                src={avatar}
                className="About__team__avatar"
                alt="avatar"
              />
              <p className="About__team__dev">Germain Michaud</p>
              <p className="About__team__role">
                <span className="italic">Scrum Master</span>
              </p>
            </a>
          </div>

          <div className="About__team__one">
            <a href="https://github.com/AlisonSerra" className="About__team__a">
              <motion.img
                whileHover={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, -360, -360, -360],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 3],
                }}
                src={avatar}
                className="About__team__avatar"
                alt="avatar"
              />
              <p className="About__team__dev">Alison Serra</p>
              <p className="About__team__role">
                <span className="italic">Git Master</span>
              </p>
            </a>
          </div>

          <div className="About__team__one">
            <a
              href="https://github.com/Clementkieken"
              className="About__team__a"
            >
              <motion.img
                whileHover={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, -360, -360, -360],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 3],
                }}
                src={avatar}
                className="About__team__avatar"
                alt="avatar"
              />
              <p className="About__team__dev">Clément Kieken</p>
              <p className="About__team__role">
                <span className="italic">Product Owner</span>
              </p>
            </a>
          </div>
          <div className="About__team__one">
            <a
              href="https://github.com/FrancoisCHARRON"
              className="About__team__a"
            >
              <motion.img
                whileHover={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, -360, -360, -360],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 3],
                }}
                src={avatarFC}
                className="About__team__avatar"
                alt="avatar"
              />
              <p className="About__team__dev">François Charron</p>
              <p className="About__team__role">
                <span className="italic">Lead Dev Front</span>
              </p>
            </a>
          </div>

          <div className="About__team__one">
            <a href="https://github.com/Lballanger" className="About__team__a">
              <motion.img
                whileHover={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, -360, -360, -360],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 3],
                }}
                src={avatar}
                className="About__team__avatar"
                alt="avatar"
              />
              <p className="About__team__dev">Loïc Ballanger</p>
              <p className="About__team__role">
                <span className="italic">Lead Dev Back</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
