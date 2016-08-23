const webpack = require('webpack');

module.exports = {
  entry: './src/todo-app.js',
  output: {
    publicPath: '/public/scripts/',
    path: __dirname + '/public/scripts',
    filename: 'app.js',
    libraryTarget: 'var',
    library: 'TodoApp'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
