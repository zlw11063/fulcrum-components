import React, { useEffect, useRef, lazy } from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'

/**
 * Converts a string from dash-case to camel-case.
 * @param {string} str The string to convert to camel-case. 
 */
function dashToCamel(str) {
  return str.replace(/(-[a-z])/g, val => val.toUpperCase().replace('-', ''));
}

export function WebComponent(props) {

  const { tag, children, forwardedRef, ...attributes } = props
  const ref = forwardedRef || React.createRef()

  if (!tag || !window.customElements.get(tag)) {
    console.error(new Error(`"${tag}" is not a registered custom element!`))
    return <></>
  }

  const webComponent = document.createElement(tag, { is: tag })
  
  /**
   * This converts the children from React children to markup the component can use.
   * ReactDOMServer is included with ReactDOM (unless webpack tree-shakes it out).
   */
  webComponent.innerHTML = ReactDOMServer.renderToStaticMarkup(children)

  /**
   * This sets the all props besides "children", and "forwardedRef"
   * as either attributes or properties on the web component. Primitive
   * values are set as attributes so they can be consumed by the web
   * component naturally. Arrays and Objects are set as properties. If
   * a property is set, the property name is converted to camelcase.
   */
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'object' || value instanceof Array) {
      webComponent[dashToCamel(key)] = value
    } else {
      webComponent.setAttribute(key, value)
    }
  })

  useEffect(() => {
    const { eventHandlers } = props;

    if (ref.current) {
      // Apend the web component to our empty span wrapper
      ref.current.appendChild(webComponent)
  
      // Switch the ref (which is forwarded, so accessible from the parent) to our new web component
      ref.current = webComponent
    }

    // If event handlers were provided, set them on the web component
    if (eventHandlers) {
      Object.entries(eventHandlers).forEach(([eventName, handler]) => {
        webComponent.addEventListener(eventName, handler)
      })
    }
  })

  // It is wrapped in a span to prevent display:block styling issues
  return <span ref={ ref }></span>
}

/**
 * This is a wrapper component that handles _most_ of the things you have to do to
 * run a web component inside of react. It will handle displaying the web component,
 * passing props on as attributes, and adding event listeners.
 */
export default React.forwardRef((props, ref) => <WebComponent {...props} forwardedRef={ref} />)

WebComponent.propTypes = {
  /** The tagname of the custom element to be used */
  tag: PropTypes.string.isRequired,
  /** Event handlers, where the event name is the key and the function is the value */
  eventHandlers: PropTypes.object
}