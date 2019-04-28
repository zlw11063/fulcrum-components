import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

const targetChildStyles = css`
  :hover + span {
    height: auto;
    clip: auto;
    overflow: visible;
    opacity: 1;
  }
`

const tooltipStyles = css`
  background: white;
  border-radius: 4px;
  bottom: 100%;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.35), 0px 3px 2px 0px rgba(0, 0, 0, 0.18);
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 10px;
  position: absolute;
  transform: translate(-50%, -15px);
  transition: opacity 0.2s;
  width: 1px;
  z-index: 99999;
  opacity: 0;
  max-width: 200px;
  width: max-content;
  &::before,
  &::after {
    background: white;
    position: absolute;
    border-radius: 4px;
    content: '';
  }
  &::before {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
  }
  &::after {
    box-shadow: 1px 0px 4px 1px rgba(0, 0, 0, 0.35), 0px 0px 2px 0px rgba(0, 0, 0, 0.18);
    height: 15px;
    width: 15px;
    z-index: -2;
    border-radius: 0;
  }
  /* Tooltip Body Directions */
  &[direction='above'] {
    left: 50%;
  }
  &[direction='right'] {
    left: 100%;
    transform: translate(15px, -50%);
    bottom: auto;
    top: 50%;
  }
  &[direction='below'] {
    left: 50%;
    top: 100%;
    bottom: auto;
    transform: translate(-50%, 15px);
  }
  &[direction='left'] {
    right: 100%;
    left: auto;
    transform: translate(-15px, -50%);
    bottom: auto;
    top: 50%;
  }
  /* Arrow Directions */
  &[direction='above']::after,
  &[direction='below']::after {
    transform: translateX(-50%) rotate(45deg);
    left: 50%;
  }
  &[direction='left']::after,
  &[direction='right']::after {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  &[direction='above']::after {
    bottom: -7px;
  }
  &[direction='right']::after {
    left: -7px;
  }
  &[direction='below']::after {
    top: -7px;
  }
  &[direction='left']::after {
    right: -7px;
  }
`

function generateId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`
}

/** Displays a tooltip when hovering over it's children. */
export default function Tooltip({ direction = 'above', children, id = generateId(), text = '' }) {
  const targetChild = React.cloneElement(children, {
    'aria-describedby': id,
  })
  return (
    <span role="tooltip" css={css({ position: 'relative' })}>
      <span css={targetChildStyles}>{targetChild}</span>
      <span css={tooltipStyles} direction={direction} id={id}>
        {text}
      </span>
    </span>
  )
}

Tooltip.propTypes = {
  /** The text displayed on the tooltip. This can be JSX, or any renderable content. */
  text: PropTypes.node.isRequired,
  /** Determines the direction the tooltip will appear from. */
  direction: PropTypes.oneOf(['left', 'right', 'above', 'below']),
  /** This can be set when you need to know the ID. A random ID is generated if one is not provided. */
  id: PropTypes.string,
}