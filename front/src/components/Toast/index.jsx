import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Toast = ({ toast = [], onClose, duration = 3000 }) => (
  <div className="toast">
    <div className="toast__container">
      {toast.map((t) => (
        <Item key={t.id} toast={t} duration={duration} onClose={onClose} />
      ))}
    </div>
  </div>
);

Toast.defaultProps = {
  toast: [],
  duration: 2000,
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
  duration: PropTypes.number,
};

export default Toast;
