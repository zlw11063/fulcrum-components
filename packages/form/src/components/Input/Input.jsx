import React from 'react';
import styles from './Input.module.css';
import { generateId, camelToCapitalized } from '../../lib/helpers'

export default function Input({ type, label, onChange, required, ...otherProps }) {
  const id = generateId()
  const {
    labelText,
    hideLabel,
    ...rest
  } = otherProps

  // Whether or not the input is required for the form
  // const isRequired = required || value.required

  return (
    <>
      <label htmlFor={id} className={`${styles.label} ${hideLabel ? styles.hidden : ''}`}>{camelToCapitalized(labelText || label)}</label>
      <input type={type} {...rest} label={label} onChange={onChange} id={id} className={styles.input} />
    </>
  );
}
  
