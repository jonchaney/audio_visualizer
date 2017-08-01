const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './lib/js/entry.js',
  output: {
    filename: './lib/bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
  "plugins": [
    "syntax-dynamic-import"
  ]
};