const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const IMGPluginMin = require("image-minimizer-webpack-plugin")
const CLEANPlugin = require("clean-webpack-plugin").CleanWebpackPlugin
const TERSERPlugin = require('terser-webpack-plugin')
const EXTRACTCss = require('mini-css-extract-plugin')
const CSSMinPlugin = require('css-minimizer-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'script.bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [EXTRACTCss.loader, "css-loader"]
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: IMGPluginMin.loader,
                        options: {
                            minimizerOptions: {
                                plugins: [
                                    'gifsicle', 'svgo', 'optipng', ['mozjpeg', { quality: 60 }]
                                ]
                            }
                        }
                    }
                ]
            }, {
                test: /\.s[ac]ss$/i,
                use: [EXTRACTCss.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({ title: 'webPackAssginment', filename: 'index.html', inject: 'body' }),
        new CLEANPlugin(),
        new EXTRACTCss()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TERSERPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    },
                   
                },
                extractComments:false
            }),
            new CssMinimizerPlugin()
        ]
    }
}