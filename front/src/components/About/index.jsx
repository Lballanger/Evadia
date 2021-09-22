/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './styles.scss';
import Header from '../Header';
import Footer from '../Footer';

const About = () => (
  <>
    <Header />

    <h1 className="About__h1">A propos</h1>
    <h2 className="About__h2">Evadia</h2>
    <p>
      Le Lorem Ipsum est simplement du faux texte employé dans la composition et
      la mise en page avant impression. Le Lorem Ipsum est le faux texte
      standard de l'imprimerie depuis les années 1500, quand un imprimeur
      anonyme assembla ensemble des morceaux de texte pour réaliser un livre
      spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles,
      mais s'est aussi adapté à la bureautique informatique, sans que son
      contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce
      à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et,
      plus récemment, par son inclusion dans des applications de mise en page de
      texte, comme Aldus PageMaker.
    </p>

    <div className="About__dev">
      <figcaption>Germain alias Le Grand Berlin</figcaption>
      <figcaption>Clément aliast Le Magnifique</figcaption>
      <figcaption>Alison alias Emoji Sensei</figcaption>
      <figcaption>François alias Le Talentueux</figcaption>
      <figcaption>Loïc alias Le Meilleur des Deux</figcaption>
    </div>

    <Footer />
  </>
);

export default About;
