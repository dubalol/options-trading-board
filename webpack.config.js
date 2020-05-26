const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', path.resolve(__dirname, 'src')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
  }
};