const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rimraf = require('rimraf');

const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        port: 4000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/svg/sprite.svg'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new (class {
            apply(compiler) {
                compiler.hooks.done.tap('Remove LICENSE', () => {
                    rimraf.sync('./dist/*.LICENSE.txt');
                });
            }
        })()
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

if (isDev) webpackConfig.devtool = 'source-map';

module.exports = webpackConfig;