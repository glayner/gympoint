import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import pt from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, setChange }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected'
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(date) {
    setSelected(date);
    if (setChange) {
      setChange(date);
    }
  }

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={handleChange}
        locale={pt}
        defaultValue
        placeholderText="Escolha a data"
        ref={ref}
        dateFormat="P"
      />
      {error && <span>{error}</span>}
    </>
  );
}
DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func
};

DatePicker.defaultProps = {
  setChange: PropTypes.null
};
