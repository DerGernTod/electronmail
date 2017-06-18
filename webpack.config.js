const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Babili = require('babili-webpack-plugin');
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
    new webpack.SourceMapDevToolPlugin({
      include: PATHS.app,
      filename: '[file].map'
    }),
    new webpack.IgnorePlugin(/vertx/)
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
    },
    {
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    }
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  target: 'electron-main'
};

module.exports = (env) => {
  var cfg = config;
  var loaderPluginConfig = {
    minimize: true,
    debug: false
  };
  if (env == 'development') {
    cfg.plugins.push(new webpack.SourceMapDevToolPlugin());
    loaderPluginConfig.debug = true;
  } else {
    cfg.plugins.push(new Babili());
  }
  cfg.plugins.push(new webpack.LoaderOptionsPlugin(loaderPluginConfig));
  return cfg;
};
