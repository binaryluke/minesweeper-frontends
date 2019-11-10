const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './client/scripts/app-react.js',
  output: {
    path: path.resolve(__dirname, 'dist/react'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: require.resolve('jquery'), use: [{ loader: 'expose-loader', options: '$' }] },
      { test: require.resolve('jquery'), use: [{ loader: 'expose-loader', options: 'jQuery' }] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'fonts/' }}]}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Minesweeper - React Edition'
    })
  ]
}
