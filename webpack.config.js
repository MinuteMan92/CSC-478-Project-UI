const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.jsx',
  node: {
    fs: 'empty',
  },
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist'), // eslint-disable-line no-undef
  },
  resolve: {
    modules: [ 'node_modules', path.resolve(__dirname, 'src/client') ],
    extensions: [ '.css', '.js', '.jsx' ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // eslint-disable-line no-undef
    compress: true,
    port: 8081,
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lackluster Video',
      template: './index.html',
    }),
  ],
}
