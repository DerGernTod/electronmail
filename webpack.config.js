const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  build: path.resolve(__dirname, 'build'),
  app: path.resolve(__dirname, 'source/jsx')
};



var config = {
  entry: PATHS.app + '/App.jsx',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Electronmail',
      template: 'webpack-index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin()
  ],
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      include: PATHS.app,
      use: ['style-loader', 'css-loader', 'less-loader']
    },
    {
      test: /\.jsx?/,
      include: PATHS.app,
      use: ['babel-loader']
    }
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  }
};

module.exports = (env) => {
  var cfg = config;
  if (env == 'development') {
    cfg.plugins.push(new webpack.SourceMapDevToolPlugin());
  }
  return cfg;
};