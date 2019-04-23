// Import example web component for WebComponent
const path = require('path')
const fs = require('fs')

module.exports = {
  components: 'packages/**/src/**/*.js',
  ignore: ['packages/**/src/lib/**'],
  webpackConfig: require('./webpack.config.js'),
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  require: [
    path.resolve(__dirname, 'setup-scripts/styleguide.setup.js')
  ],
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: "'Lato', sans-serif"
      }
    }
  },
  theme: {
    fontFamily: {
      base: "'Lato', sans-serif"
    }
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Lato'
        },
        {
          rel: 'stylesheet',
          href: './demo-styles.css'
        }
      ]
    }
  }
}


module.exports.updateExample = (props, exampleFilePath) => {
  // props.settings are passed by any fenced code block, in this case
  const { settings, lang } = props
  // "../mySourceCode.js"
  if (typeof settings.file === 'string') {
    // "absolute path to mySourceCode.js"
    const filepath = path.resolve(path.dirname(exampleFilePath), settings.file)
    // displays the block as static code
    settings.static = true
    // no longer needed
    delete settings.file
    return {
      content: fs.readFileSync(filepath, 'utf8'),
      settings,
      lang
    }
  }
  return props
}