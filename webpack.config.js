const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/todo-app.js',
  output: {
    publicPath: '/',
    path: __dirname + '/public/',
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },

      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('precss')
  ],
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
