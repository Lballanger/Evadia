import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    width: '100%',
    marginBottom: '0.8rem',
  },
  label: {
    fontSize: '1.1rem',
    color: '#666',
  },
  input: {
    width: '100%',
    fontSize: '1.3rem',
    borderRadius: '0.3rem',
    boxShadow: '0px 2px 10px -4px rgba(0,0,0,.3)',
    border: '1px solid #efefef',
    padding: '0.8rem 0.6rem',
  },
};

const Input = ({
  className = '',
  id,
  labelText = '',
  placeholder = '',
  type = 'text',
  value,
  onChange,
}) => (
  <div className={className} style={styles.group}>
    <label htmlFor={id} style={styles.label}>
      {labelText}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={styles.input}
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
