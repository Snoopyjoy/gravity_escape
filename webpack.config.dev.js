const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pathsToClean = [
    'dist',
];

module.exports = {
    entry: ['./src/main.js'],
    output: {
        filename: 'js/[name].dev.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                },
            ],
            exclude: [
                path.resolve(__dirname, 'mode_modules'),
                path.resolve(__dirname, 'test'),
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            include: [path.resolve(__dirname, 'src')],
            use: 'url-loader?limit=1024&name=[name].[hash].[ext]&outputPath=img/&publicPath=/img/',
        },
        {
            test: /(\.css)$/,
            include: [path.resolve(__dirname, 'src')],
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 最好设置成绝对路径
        host: 'localhost',
        port: 8090,
    },
    // 插件
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(true),
        }),
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './index.html',
        }),
        new ExtractTextWebpackPlugin('css/styles.[hash].css'),
        new CopyPlugin([
            { from: 'res', to: 'res' },
        ]),
        // new CompressionPlugin({
        //     filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        //     algorithm: 'gzip', // 算法
        //     test: new RegExp(
        //         '\\.(js|css)$' // 压缩 js 与 css
        //     ),
        //     threshold: 10240, // 只处理比这个值大的资源。按字节计算
        //     minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
        // }),
    ],
    mode: 'development',
};
