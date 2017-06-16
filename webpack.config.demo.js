'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'eval',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  output: {
    filename: 'demo/bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './demo'
  }

};
