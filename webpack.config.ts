// const Htmlwebpackplg = require('html-webpack-plugin');
import {Configuration} from 'webpack';
//import Htmlwebpackplg from 'html-webpack-plugin';
const path = require('path');
const Htmlwebpackplg = require('html-webpack-plugin');
const HtmlcleanWebpackPlg = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin =  require('sw-precache-webpack-plugin');
declare const __dirname: any;
// sw-precache-webpack-plugin configurations
const SERVICE_WORKER_FILENAME = 'sw.js';
const SERVICE_WORKER_CACHEID = 'my-project-name';
const SERVICE_WORKER_IGNORE_PATTERNS = [/dist\/.*\.html/];
const SW_PRECACHE_CONFIG = {
    minify: true,
    cacheId: SERVICE_WORKER_CACHEID,
    filename: SERVICE_WORKER_FILENAME,
    staticFileGlobsIgnorePatterns: SERVICE_WORKER_IGNORE_PATTERNS,
  };
const SRC_PATH = path.join(__dirname, '/src');
const config : Configuration = {
    //entry: './src/index.ts',
    entry: {
        app: './src/index.ts',
        //loop: './src/main_loop/index.ts',
    },
    output: {
        filename: '[name]_[hash].bundle.js',
        path: `${__dirname}/dist`,
        publicPath:`http://localhost:5555`
    },
    plugins: [
        new HtmlcleanWebpackPlg(['dist']),
        
        new Htmlwebpackplg({
            title: 'canvas block game',
            template: './src/index.ejs',
            serviceWorker: './sw.js'
        }),
       // new SWPrecacheWebpackPlugin(SW_PRECACHE_CONFIG)
        
    ],
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader",
                include: SRC_PATH
            },{
                test: /\.ejs$/,
                loader: 'ejs-loader',
                query: {
                  includePaths: [
                    path.resolve(__dirname, 'src/'),
                  ],
                },
              },
            
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
                include: SRC_PATH
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: "source-map",
    devServer: {
        port: 7777,
        disableHostCheck: true,
        //contentBase:`${__dirname}/dist`,
    }
};
module.exports = config;