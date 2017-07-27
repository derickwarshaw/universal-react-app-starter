var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: {
    bundle: ['./js/index.js', './assets/styles/main.scss']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css/,
        include: [/(src)/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: ['css-loader']
        }),
      },
      {
        test: /\.(scss|sass)$/,
        include: [/(src)/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties', 'async-to-promises'],
        }
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/src/assets/',
    publicPath: '',
    filename: 'scripts/app.bundle.js'
  },
  plugins: function() {
    var pluginList = [
      new ExtractTextPlugin({ filename: '/styles/app.bundle.css' }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ];
    if (!debug) {
      pluginList = pluginList.concat([
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
      ]);
    }
    return pluginList;
  }()
};
