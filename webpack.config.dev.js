const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin= require('clean-webpack-plugin');
const pathsToClean = [
    'dist',
];

module.exports = {
    entry: ['./src/main.js'],
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /(\.js)$/,
            use: [
                {
                    loader: 'babel-loader',
                },
            ],
            exclude: [
                path.resolve(__dirname, 'mode_modules'),
                path.resolve(__dirname, 'test'),
            ]
        }],
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './index.html',
        }),
        new CleanWebpackPlugin(pathsToClean),
    ],
    mode: 'development',
};