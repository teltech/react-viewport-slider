var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

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
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1!postcss-loader'
        }),
        include: [path.join(__dirname, 'src')]
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
    extensions: ['.jsx', '.js', '.css']
  },

  plugins: [
    new ExtractTextPlugin('dist/styles.css'),
  ]
  
};
