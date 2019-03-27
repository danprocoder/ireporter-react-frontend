const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    entry: './src/index.js',
    output: {
      path: './dist',
      filename: 'app.js'
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};
