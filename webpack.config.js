const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  build: path.resolve(__dirname, 'build'),
  app: path.resolve(__dirname, 'source')
};

var config = {
  entry: PATHS.app + '/App.tsx',
  devtool: 'inline-source-map',
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
  resolve: {
    extensions: [
      '.tsx', '.ts', '.jsx', '.js'
    ],
    modules: [
      path.resolve('./source'),
      path.resolve(__dirname, 'node_modules'),
      "node_modules"
    ],
    alias: {
      '@': path.resolve(__dirname, './source')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        include: PATHS.app,
        use: ['style-loader', 'css-loader', 'less-loader']
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
  node: {
    __dirname: true
  },
  target: 'electron-main'
};

module.exports = (env) => {
  var cfg = config;
  var loaderPluginConfig = {
    minimize: true,
    debug: false
  };
  cfg.mode = env;
  if (env == 'development') {
    cfg.plugins.push(new webpack.SourceMapDevToolPlugin());
    loaderPluginConfig.debug = true;
  } else {
    // TODO: use uglify instead
    // cfg.plugins.push(new Babili());
  }
  cfg.plugins.push(new webpack.LoaderOptionsPlugin(loaderPluginConfig));
  return cfg;
};
