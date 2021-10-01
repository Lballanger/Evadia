/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Autosuggest from 'react-autosuggest';

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

const AutoSuggest = ({ onSelected, limit = 10, inForm }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!value.trim().length) onSelected(null);
  }, [value]);

  const getCommunes = ({ value: searchTerm }) => {
    const inputValue = searchTerm.trim().toLowerCase();
    Axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${inputValue}&limit=${limit}&type=municipality`
    )
      .then((data) => {
        const communes = data.data.features.map((commune) => ({
          city_name: commune.properties.name,
          code_insee: commune.properties.citycode,
          code_postal: commune.properties.postcode,
        }));
        setSuggestions(communes);
        return communes;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const clearCommunes = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => {
    onSelected(suggestion);
    return suggestion.city_name;
  };

  const renderSuggestion = (suggestion) => (
    <div className="auto-suggest__result">
      {suggestion.code_postal} {suggestion.city_name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const renderInputComponent = (inputProps) =>
    inForm ? (
      <div style={styles.group}>
        <label htmlFor="ville" style={styles.label}>
          Ville
        </label>
        <div style={styles.inputDiv}>
          <input
            ref={inputRef}
            id="ville"
            name="ville"
            style={styles.input}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...inputProps}
          />
        </div>
      </div>
    ) : (
      <div className="auto-suggest">
        <input ref={inputRef} placeholder="Nom de la ville" {...inputProps} />
      </div>
    );

  const inputProps = {
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={getCommunes}
      onSuggestionsClearRequested={clearCommunes}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
    />
  );
};

AutoSuggest.defaultProps = {
  onSelected: () => {},
  limit: 10,
  inForm: false,
};

AutoSuggest.propTypes = {
  onSelected: PropTypes.func,
  limit: PropTypes.number,
  inForm: PropTypes.bool,
};

export default AutoSuggest;
