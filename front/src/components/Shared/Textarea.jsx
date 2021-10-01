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
  textarea: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    minHeight: '15.2rem',
    fontSize: '1.3rem',
    fontFamily: 'inherit',
    borderRadius: '0.3rem',
    boxShadow: '0px 2px 10px -4px rgba(0,0,0,.3)',
    border: '1px solid #efefef',
    padding: '0.8rem 0.6rem',
  },
};

const Textarea = ({
  className,
  id,
  labelText,
  value,
  onChange,
  placeholder,
}) => (
  <div className={className} style={styles.group}>
    <label htmlFor={id} style={styles.label}>
      {labelText}
    </label>
    <textarea
      style={styles.textarea}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      name={id}
      defaultValue={value}
    />
  </div>
);

Textarea.defaultProps = {
  className: '',
  id: new Date().getTime().toString(),
  labelText: 'Label Text',
  value: '',
  onChange: () => {},
  placeholder: 'Saisissez votre message',
};

Textarea.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  id: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Textarea;
