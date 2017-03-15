/**
 * Created by zhangxin on 2/10 0010.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:[
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src'
    ],
    output:{
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css")
    ],
    devServer: {
        proxy: {
            '**': {
                target: 'http://114.251.53.22/xitenggamejar',
                secure: false,
                changeOrigin: true,
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                    if (req.headers.accept.indexOf('css') !== -1) {
                        console.log(req.url)
                        return '/src/Util/base.css';
                    }
                    if (req.headers.accept.indexOf('images') !== -1) {
                        console.log(req.url)
                        return "/src/images"+req.url;
                    }
                    if(req.url.endsWith('.png')){
                        console.log("我滴个亲娘")
                        return "/src/images"+req.url;
                    }
                }
            }
        }
    },
    devtool: 'source-map'
}