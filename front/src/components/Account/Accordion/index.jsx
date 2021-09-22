import React from 'react';
import './styles.scss';

const Accordion = () => {
  const accordionData = {
    title: 'Favoris',
    content: `Paris`,
  };

  const { title, content } = accordionData;

  return (
    <>
      <div className="accordion">
        <div className="accordion__item">
          <div className="accordion__title">
            <div>{title}</div>
            <div>+</div>
          </div>
          <div className="accordion__content">
            <ul className="accordion__content__ul">
              <li className="accordion__content__li">{content}</li>
            </ul>
            <button className="accordion__content__btn" type="button">
              Enlever
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
