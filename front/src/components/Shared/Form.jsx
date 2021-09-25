import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} {...props} style={styles.form}>
    {children}
  </form>
);

const styles = {
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 1rem',
    padding: '2rem 1rem',
    background: '#fff',
    borderRadius: '7px',
    boxShadow: '0 2px 10px -4px rgba(0, 0, 0, .3)',
  },
};

Form.propTypes = PropTypes.shape({
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
}).isRequired;

export default Form;
