const path = require('path')
const fs = require('fs')

const buildPackageJson = require('./build-package-json.js')
const buildIndexFile = require('./build-index-file.js')
const buildComponentFile = require('./build-component-file.js')
const buildMarkdownFile = require('./build-markdown-file.js')
const buildCssFile = require('./build-css-file.js')

function camelToDash(str) {
  const short = str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`)
  return short[0] === '-' ? short.slice(1) : short
}

const componentName = process.argv[2]
const packageName = camelToDash(componentName)
const componentPath = path.resolve(__dirname, '../packages/' + packageName)

// Create the package's folders
fs.mkdirSync(componentPath)
fs.mkdirSync(`${componentPath}/src`)

// Create the package.json and index.js in the new folder
fs.writeFileSync(`${componentPath}/package.json`, buildPackageJson(packageName))
fs.writeFileSync(`${componentPath}/src/index.js`, buildIndexFile(componentName))

// Create the component files
fs.writeFileSync(`${componentPath}/src/${componentName}.js`, buildComponentFile(componentName))
fs.writeFileSync(`${componentPath}/src/${componentName}.module.css`, buildCssFile())
fs.writeFileSync(`${componentPath}/src/${componentName}.md`, buildMarkdownFile(componentName))