import React from 'react';
import './styles.scss';

const Accordion = () => {
  const accordionData = {
    title: 'Section 1',
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`,
  };

  const { title, content } = accordionData;

  return (
    <>
      <h1>Favoris</h1>
      <div className="accordion">
        <div className="accordion__item">
          <div className="accordion__title">
            <div>{title}</div>
            <div>+</div>
          </div>
          <div className="accordion__content">{content}</div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
