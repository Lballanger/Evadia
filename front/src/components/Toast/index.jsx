/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

const Toast = ({ toast = [], onClose }) => {
  const renderItem = (content) => {
    if (typeof content === 'function') return content();
    return <p>{content}</p>;
  };

  return (
    <div className="toast">
      <div className="toast__container">
        {toast.map((t) => (
          <div
            key={t.id}
            className={`toast__container__item ${t.type ? t.type : ''}`}
          >
            <span
              role="img"
              aria-label="close toast"
              className="toast__close"
              onClick={() => onClose(t.id)}
            >
              <IoClose />
            </span>
            {renderItem(t.content)}
          </div>
        ))}
      </div>
    </div>
  );
};

Toast.defaultProps = {
  toast: [],
};

Toast.propTypes = {
  toast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    })
  ),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
