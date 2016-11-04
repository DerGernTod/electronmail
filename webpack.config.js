const webpack = require('webpack');
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'source/jsx');

var config = {
    entry : APP_DIR + '/App.jsx',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            }
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    }
};

module.exports = config;
