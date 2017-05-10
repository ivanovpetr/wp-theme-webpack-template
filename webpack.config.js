var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/js/app.js',
        vendor: 'jquery'
    },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/js')
  },

  module: {
    rules: [
     {
        test   : /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
     },
     {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [ 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
     },
     {
        test: /\.js$/,
        use: "imports-loader?$=jquery,define=>false"
     },
     {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=../img/[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=../fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
      new BrowserSyncPlugin(
          {
              // browse to http://localhost:3000/ during development
              host: 'localhost',
              port: 3000,
              //proxy: 'http://dev.lomus.ru/',
              server: { baseDir: ['./'] }
          }
      ),
      new ExtractTextPlugin('../css/bundle.css'),
      //new webpack.ProvidePlugin({
      //    $: 'jquery',
      //    jQuery: 'jquery'
      //})
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor' // Specify the common bundle's name.
      })
  ]
};