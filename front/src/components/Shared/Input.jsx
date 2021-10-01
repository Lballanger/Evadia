import React from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

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
  inputDiv: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    fontSize: '1.3rem',
    borderRadius: '0.3rem',
    boxShadow: '0px 2px 10px -4px rgba(0,0,0,.3)',
    border: '1px solid #efefef',
    padding: '0.8rem 0.6rem',
  },
  inputBtn: {
    position: 'absolute',
    right: '.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#e4e4e4',
    width: '30px',
    height: '30px',
    borderRadius: '.3rem',
    border: 'none',
    cursor: 'pointer',
  },
};

const Input = ({
  id,
  labelText = '',
  placeholder = '',
  type = 'text',
  value,
  onChange,
  onClear,
  ...props
}) => (
  <div style={styles.group}>
    <label htmlFor={id} style={styles.label}>
      {labelText}
    </label>
    <div style={styles.inputDiv}>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {value.length ? (
        <button
          type="button"
          style={styles.inputBtn}
          onClick={() => onClear(id)}
        >
          <IoClose width="30px" height="30px" />
        </button>
      ) : null}
    </div>
  </div>
);

Input.defaultProps = {
  labelText: '',
  type: 'text',
  value: '',
  onChange: () => {},
  onClear: () => {},
  placeholder: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

export default Input;
