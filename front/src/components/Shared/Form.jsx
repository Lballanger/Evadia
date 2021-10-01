import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  form: {
    width: '100%',
    maxWidth: '800px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    padding: '2rem 1rem',
    background: '#fff',
    borderRadius: '7px',
    boxShadow: '0 2px 10px -4px rgba(0, 0, 0, .3)',
  },
};

const Form = ({ children, onSubmit, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <form onSubmit={onSubmit} {...props} style={styles.form}>
    {children}
  </form>
);

Form.propTypes = PropTypes.shape({
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
}).isRequired;

export default Form;
