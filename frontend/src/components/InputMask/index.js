import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function Mask({ name, prefix, suffix, setChange }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value'
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    let onlyNumber = e.target.value
      .split('')
      .map(n => {
        if (n === ',') return '.';

        return n;
      })
      .join('');
    if (prefix) {
      [, onlyNumber] = onlyNumber.split(prefix);
    }
    setValue(parseFloat(onlyNumber));

    if (setChange) {
      setChange(parseFloat(onlyNumber));
    }
  }

  return (
    <>
      <NumberFormat
        thousandSeparator={false}
        decimalSeparator=","
        fixedDecimalScale={2}
        value={value}
        prefix={prefix}
        suffix={suffix}
        name={fieldName}
        onChange={handleChange}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
Mask.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string
};

Mask.defaultProps = {
  setChange: PropTypes.null,
  prefix: PropTypes.null,
  suffix: PropTypes.null
};
