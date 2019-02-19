const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const pathsToClean = [
    'dist',
];

module.exports = {
    entry: ['./src/main.js'],
    output: {
        filename: 'js/[name].min.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    devtool:'null',
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
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            include: [path.resolve(__dirname, 'static'), path.resolve(__dirname, 'src')],
            use: 'url-loader?limit=1024&name=[name].[hash].[ext]&outputPath=img/&publicPath=/img/',
        },
        {
            test: /(\.css)$/,
            include: [path.resolve(__dirname, 'static'), path.resolve(__dirname, 'src')],
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 50240,
            minRatio: 0.8
        }),
    ],
    mode: 'production',
};