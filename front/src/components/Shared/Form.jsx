import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

Form.propTypes = PropTypes.shape({
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
}).isRequired;

export default Form;
