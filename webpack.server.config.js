var nodeExternals = require('webpack-node-externals');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: {
    bundle: ['../server/index.js']
  },
  target: 'node',
  node: {
      __dirname: false,
      __filename: false
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        }
      }
    ]
  },
  output: {
    path: __dirname + '/src',
    publicPath: __dirname + '/src',
    filename: 'server.bundle.js'
  },
  externals: nodeExternals(),
  plugins: function() {
    var pluginList = [
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
