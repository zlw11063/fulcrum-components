import React, { useState, useEffect } from 'react'
import Input from './components/Input/Input'
import PropTypes from 'prop-types'

/**
 * @param {Array} keyValue The key and value as an array, as provided from Object.entries
 * @param {*} valueChangeHandler Handler that updates the formValues state whenever this input component changes values
 * @returns {Element} Returns a react component for the given type
 */
function getFormComponent([key, value], valueChangeHandler) {
  const type = typeof value === 'object' ? value.type : value
  let component;

  const props = typeof value === 'string' ? {} : value

  switch (type) {
    case 'string':
    case 'number':
    case 'email':
    case 'checkbox':
    case 'radio':
      component = (
        <Input
          key={key}
          label={key}
          type={type}
          onChange={valueChangeHandler}
          {...props}
        />
      )
      break
    default:
      break
  }
  return component
}

/**
 * Extracts all default values from the provided object.
 * @param {Object} values 
 */
function getDefaultValues(values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const type = typeof value === 'object' ? value.type : value
    acc[key] = value.defaultValue || value.defaultChecked || ['radio', 'checkbox'].includes(type) ? false : null
    return acc
  }, {})
}

export default function Form({ values, onChange }) {

  const [formValues, setFormValues] = useState(getDefaultValues(values))

  /**
   * Runs whenever a value is changed in the form. Updates the formValues state.
   * @param {SyntheticEvent} e 
   */
  function valueChangeHandler(e) {
    const { type } = e.target
    const key = e.target.getAttribute('label')
    let propertyName = 'value'

    switch (type) {
      case 'checkbox':
        propertyName = 'checked'
    }

    setFormValues(oldValues => {
      const newValues = {...oldValues}
      newValues[key] = e.target[propertyName]
      return newValues
    })
  }

  /** Runs the provided prop onChange handler whenever form values change */
  useEffect(() => {
    onChange(formValues)
  }, [formValues])

  return (
    <>
      {Object.entries(values).map(v => getFormComponent(v, valueChangeHandler))}
    </>
  )
}

Form.propTypes = {
  /** Handler that runs whenever any value in the form is changed */
  onChange: PropTypes.func.isRequired,
  /** The values used to dynamically build the form */
  values: PropTypes.object.isRequired
}

/**
 * Accepted Data Types
 * ----
 * string
 * number
 * email
 * password
 * phone number
 * select
 * boolean (checkbox)
 * radiobutton
 */
