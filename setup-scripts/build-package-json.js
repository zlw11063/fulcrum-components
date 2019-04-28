module.exports = (packageName) => `
    {
      "name": "fulcrum-${packageName}",
      "main": "dist/index.js",
      "scripts": {
        "prepublish": "rollup -c ../../rollup.config.js",
        "build": "rollup -c ../../rollup.config.js"
      },
      "peerDependencies": {
        "react": "^16.8.6",
        "react-dom": "^16.8.6"
      }
    }
  
  `