var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

const externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  },
  'popper.js': {
    root: 'Popper',
    commonjs2: 'Popper',
    commonjs: 'Popper',
    amd: 'Popper'
  }
};

var config = {
  entry: {
    index: './src/react-popper.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-popper.js',
    sourceMapFilename: 'react-popper.sourcemap.js',
    library: 'ReactPopper',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
    { test: /\.(js|jsx)/, loader: 'babel?stage=0' }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: externals,
};

if (TARGET === 'minify') {
  config.output.filename = 'react-popper.min.js';
  config.output.sourceMapFilename = 'react-popper.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'Popper']
    }
  }));
}

module.exports = config;
