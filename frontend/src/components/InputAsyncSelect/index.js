import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function InputAsyncSelect({ name, label, loadOptions }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => setValue(defaultValue), [defaultValue]);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      }
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    setValue(e);
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <AsyncSelect
        name={fieldName}
        defaultValue
        value={value}
        ref={ref}
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Buscar aluno"
        className="asyncSelectInput"
      />

      {error && <span>{error}</span>}
    </Container>
  );
}
InputAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
