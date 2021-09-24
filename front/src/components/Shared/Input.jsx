import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  className = '',
  id,
  labelText = '',
  type = 'text',
  value,
  onChange,
}) => (
  <div className={className}>
    <label htmlFor={id}>{labelText}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

Input.propTypes = PropTypes.shape({
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  value: PropTypes.string,
  onChange: PropTypes.func,
}).isRequired;

export default Input;
