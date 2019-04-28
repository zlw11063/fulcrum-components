module.exports = (componentName) =>
`import React from 'react'
import styles from './${componentName}.module.css'

export default function ${componentName}() {
  return (
    <div>
      ${componentName}
    </div>
  )
}

`