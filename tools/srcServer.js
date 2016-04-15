// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigBuilder from '../webpack.config';

import url from 'url';
import proxy from 'proxy-middleware';

const webpackConfig = webpackConfigBuilder('development');
const bundler = webpack(webpackConfig);

const apiProxyOptions = url.parse('http://localhost:9001/api');
apiProxyOptions.route = '/api';

const staticProxyOptions = url.parse('http://localhost:9001/static');
staticProxyOptions.route = '/api/static';

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'app',

    middleware: [
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      proxy(staticProxyOptions),
      
      proxy(apiProxyOptions),

      historyApiFallback()
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'app/*.html'
  ]
});
