module.exports = (componentName) =>
`import ${componentName} from './${componentName}.js'

export default ${componentName}
`