const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer:
        {
            hot: true
        }
});