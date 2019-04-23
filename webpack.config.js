module.exports = {
  module: {
    rules: [
      // Babel loader, will use your project’s babel.config.js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      
      // Loads in CSS Files
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      },
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
}