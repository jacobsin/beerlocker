// For info about this file refer to webpack and webpack-hot-middleware documentation
// Rather than having hard coded webpack.config.js for each environment, this
// file generates a webpack config for the environment passed to the getConfig method.
import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const developmentEnvironment = 'development' ;
const productionEnvironment = 'production';
const testEnvironment = 'test';

const getPlugins = function (env) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === developmentEnvironment
  };

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS) //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
  ];

  switch (env) {
    case productionEnvironment:
      plugins.push(new ExtractTextPlugin('styles.css'));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin());
      break;

    case developmentEnvironment:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
};

const getEntry = function (env) {
  const entry = {};

  entry.plain = ['./app/scripts/plain'];
  entry.angular = ['./app/scripts/angular'];
  entry.slingshot = ['./app/scripts/slingshot'];
  entry.react = ['./app/scripts/react'];

  if (env === developmentEnvironment ) { // only want hot reloading when in dev.
    Object.keys(entry).forEach(function (key) {
      entry[key].push('webpack-hot-middleware/client?reload=true');
    });
  }

  return entry;
};

const getLoaders = function (env) {
  const loaders = [{ test: /\.js$/, include: path.join(__dirname, 'app', 'scripts'), loaders: ['babel', 'eslint'] },
                   { test: /\.coffee$/, include: path.join(__dirname, 'app', 'scripts'), loader: 'coffee-loader' },
                   { test: /\.html$/, loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html'},
                   { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000&name=[name].[ext]'}];

  if (env === productionEnvironment ) {
    // generate separate physical stylesheet for production build using ExtractTextPlugin. This provides separate caching and avoids a flash of unstyled content on load.
    loaders.push({test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap")});
    loaders.push({test: /\.less$/, loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap")});
  } else {
    loaders.push({test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']});
    loaders.push({test: /\.less$/, loaders: ['style', 'css?sourceMap', 'less?sourceMap']});
  }

  return loaders;
};

function getConfig(env) {
  return {
    debug: true,
    devtool: env === productionEnvironment  ? 'source-map' : 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: getEntry(env),
    target: env === testEnvironment ? 'node' : 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
      path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
      publicPath: '/scripts/',
      filename: '[name]-bundle.js'
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env)
    },
    resolve: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js', '.json', '.coffee', '.html']
    }
  };
}

export default getConfig;
