/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './styles.scss';
import { motion } from 'framer-motion';
import avatarFC from '../../assets/images/FC_small.jpg';
import avatarCK from '../../assets/images/CK_small.jpg';
import avatarLB from '../../assets/images/LB_small.jpg';
import avatarAS from '../../assets/images/AS_small.jpg';
import avatarGM from '../../assets/images/GM_small.jpg';
import git from '../../assets/images/git.png';
import linkedin from '../../assets/images/linkedin.png';

const About = () => (
  <>
    <div className="About__container">
      <div className="koho">
        <h1 className="About__h1">A PROPOS</h1>
      </div>
      <div className="font-link">
        <h2 className="About__h2">Evadia</h2>
      </div>
      <h3 className="About__h3">Qu'est-ce qu'EVADIA ?</h3>
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
        facilement. Ces informations, telles que la taille de la population
        d'une commune, les écoles ou encore les hôpitaux proches, sont toutes
        regroupées sur notre site. Nous planifions d'ors et déjà de rajouter
        davantage de critères telle qu'une messagerie interne entre
        utilisateurs.
      </p>
      <h3 className="About__h3">Comment avons-nous procédé ?</h3>
      <p className="About__p">
        L'équipe du Back, Alison Serra (qui est à l'initiative du projet), Loïc
        Ballanger et Germain Michaud ont récupéré une quantité folle
        d'informations à travers différentes API libre de droits afin de créer
        leur propre base de données.
      </p>

      <h3 className="About__h3">L'équipe</h3>
      <div className="About__team">
        <div className="About__team__display">
          <div className="About__team__one">
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
              src={avatarGM}
              className="About__team__avatar"
              alt="avatar"
            />
            <p className="About__team__dev">Germain Michaud</p>
            <p className="About__team__role">
              <span className="italic">Scrum Master / Dev FullStack</span>
            </p>
            <div className="About__team__links">
              <a
                href="https://github.com/GermainMichaud"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="github"
                  className="About__team__links__git"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/germainmichaud/"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="About__team__links__git"
                />
              </a>
            </div>
          </div>

          <div className="About__team__one">
            <motion.img
              whileHover={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 360, 360, 360],
                borderRadius: ['20%', '20%', '50%', '50%', '20%'],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 3],
              }}
              src={avatarAS}
              className="About__team__avatar"
              alt="avatar"
            />
            <p className="About__team__dev">Alison Serra</p>
            <p className="About__team__role">
              <span className="italic">Git Master / Dev Back</span>
            </p>
            <div className="About__team__links">
              <a
                href="https://github.com/AlisonSerra"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="github"
                  className="About__team__links__git"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/alison-serra/"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="About__team__links__git"
                />
              </a>
            </div>
          </div>

          <div className="About__team__one">
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
              src={avatarCK}
              className="About__team__avatar"
              alt="avatar"
            />
            <p className="About__team__dev">Clément Kieken</p>
            <p className="About__team__role">
              <span className="italic">Product Owner / Dev Front</span>
            </p>
            <div className="About__team__links">
              <a
                href="https://github.com/Clementkieken"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="github"
                  className="About__team__links__git"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/clement-kieken-1504b168/"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="About__team__links__git"
                />
              </a>
            </div>
          </div>
          <div className="About__team__one">
            <motion.img
              whileHover={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 360, 360, 360],
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
            <div className="About__team__links">
              <a
                href="https://github.com/FrancoisCHARRON"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="github"
                  className="About__team__links__git"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/fran%C3%A7ois-charron/"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="About__team__links__git"
                />
              </a>
            </div>
          </div>

          <div className="About__team__one">
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
              src={avatarLB}
              className="About__team__avatar"
              alt="avatar"
            />
            <p className="About__team__dev">Loïc Ballanger</p>
            <p className="About__team__role">
              <span className="italic">Lead Dev Back</span>
            </p>
            <div className="About__team__links">
              <a
                href="https://github.com/Lballanger"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={git}
                  alt="github"
                  className="About__team__links__git"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/loicballanger/"
                className="About__team__a"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="About__team__links__git"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
