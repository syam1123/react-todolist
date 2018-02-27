/**
 * @Author: Syam Pillai <apple>
 * @Date:   2018-02-27T12:06:19+05:30
 * @Email:  syam@wealthy.in
 * @Last modified by:   apple
 * @Last modified time: 2018-02-27T12:22:47+05:30
 */

 const webpack = require('webpack')
 const BundleTracker = require('webpack-bundle-tracker')
 const ExtractTextPlugin = require("extract-text-webpack-plugin")
 const WebpackStrip = require('strip-loader');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');
 const ncp = require('ncp').ncp;


 setApiHost();

 module.exports= {
   context: __dirname,
   entry:{
       main:[
         "babel-polyfill",
          './src/index.js'
       ]
   },
   output:{
     path : __dirname + '/dist',
     filename:'[name]-[hash].js',
     publicPath: '/'
   },

   plugins: [
     new CleanWebpackPlugin('dist'),
     new CleanWebpackPlugin('build/prod'),
     new HtmlWebpackPlugin({
       title: 'react todolist',
       template: 'index.ejs'
     }),
     new BundleTracker({filename: './webpack-stats.json'}),

     new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production'),
       }
     }),
     new webpack.optimize.DedupePlugin(),
     new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false
       }
     }),
     new webpack.optimize.AggressiveMergingPlugin()
   ],

   module : {
     loaders : [
       {
         test:/\.jsx?$/,
         exclude:/node_modules/,
         loader: 'babel-loader',
         query:{
           presets: ['es2015','react','stage-0']
         }
       },
       {
         test:/\.jsx?$/,
         loader: WebpackStrip.loader('debug', 'console.log')
       },
       {
         test: /\.less$/,
         loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
       },
       {
         test: /\.css$/,
         loader: "style-loader!css-loader"
       },
       {
         test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
         loader: "url-loader?limit=100000"
       },
       {
         test: /\.jpg/,
         loader: "file-loader"
       }
     ]
   },

   postcss: function () {
     return [
       require('autoprefixer')({ browsers: ['last 3 versions', '> 5%']})
     ]
   },

   resolve: {
     modulesDirectories: ['node_modules', 'bower_components'],
     extensions: ['', '.js', '.jsx']
   },
 }
