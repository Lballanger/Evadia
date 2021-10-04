/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import Axios from 'axios';

const AutoSuggest = ({ onSelected, limit = 10 }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
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
  const renderInputComponent = (inputProps) => (
    <div className="auto-suggest">
      <input ref={inputRef} {...inputProps} />
    </div>
  );
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Nom de la ville',
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
};
AutoSuggest.propTypes = {
  onSelected: PropTypes.func,
  limit: PropTypes.number,
};
export default AutoSuggest;
