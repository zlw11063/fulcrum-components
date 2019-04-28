import React, { useRef, useState } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const buttonCss = css`
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  color: inherit;
  cursor: inherit;

  &:focus {
    outline: none;
  }
`

export default function ClickToCopy(props) {
  const {
    value,
    disableCopy, 
    children
  } = props

  const buttonRef = useRef(null)

  function copyValue() {
    const tempTextarea = document.createElement('textarea')
    const button = buttonRef.current
    tempTextarea.value = value || button.textContent
    document.body.appendChild(tempTextarea)
    tempTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(tempTextarea)
    button.focus()
  }

  return (
    <button css={buttonCss} type="button" ref={buttonRef} onClick={!disableCopy ? copyValue : null}>
      {children || value}
    </button>
  )
}

ClickToCopy.propTypes = {
  /**
   * The value to be copied when clicked. This can be used when
   * a different value than what is shown needs to be copied.
   * If it is not provided, the textContent of the children will
   * be used as the value.
   */
  value: PropTypes.string,
  /** If true, disables copying */
  disableCopy: PropTypes.bool,
}
