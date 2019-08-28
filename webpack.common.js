const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: {
    index: ['./src/js/index.js', './src/css/index.sass']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/css/build/*.css', 'dist/css/build/*.css.map']),
  ]
};

module.exports = config;