var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  output: {
    filename: 'dist/react-viewport-slider.js',
    libraryTarget: 'umd',
    library: 'ViewportSlider'
  },

  resolve: {
    extensions: ['.jsx', '.js']
  }
};
