var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var glob = require('glob');
var es = require('event-stream');
var errorHandler = require('../common/error-handler');
var bundleLogger = require('../common/bundle-logger');
var runtime = require('../common/runtime');

gulp.task('browserify', function(done) {
    glob('app/scripts/**/*-main.{js,coffee}', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            var bundleConfig = {
                entries: [entry],
                debug: true,
                transform: ['coffeeify'],
                extensions: ['.coffee']
            };

            var outputFile = entry
                .replace(/^app\/scripts\//,'')
                .replace(/-main\.(js|coffee)/, '-bundle.js');

            var watching = runtime.isWatching(), server;

            if(watching) {
                // Add watchify args and debug (sourcemaps) option
                _.extend(bundleConfig, watchify.args);
                // A watchify require/external bug that prevents proper recompiling,
                // so (for now) we'll ignore these options during development. Running
                // `gulp browserify` directly will properly require and externalize.
                bundleConfig = _.omit(bundleConfig, ['external', 'require']);
                server = $.livereload();
            }

            var b = browserify(bundleConfig);

            var bundle = function () {
                bundleLogger.start(entry);
                return b
                    .bundle()
                    .on('error', errorHandler.handle)
                    .on('end', function () {
                        bundleLogger.end(outputFile);
                        if (watching) {
                            server.changed(outputFile);
                        }
                    })
                    .pipe(source(outputFile))
                    .pipe(buffer())
                    .pipe($.sourcemaps.init({loadMaps: true}))
                    .pipe($.sourcemaps.write('./maps'))
                    .pipe(gulp.dest('.tmp/scripts'));
            };

            if(watching) {
                b = watchify(b);
                // Rebundle on update
                b.on('update', bundle);
                bundleLogger.watch(outputFile);
            } else {
                // Sort out shared dependencies.
                // b.require exposes modules externally
                if(bundleConfig.require) b.require(bundleConfig.require);
                // b.external excludes modules from the bundle, and expects
                // they'll be available externally
                if(bundleConfig.external) b.external(bundleConfig.external);
            }

            return bundle();

        });

        es.merge(tasks).on('end', done);
    })
});

gulp.task('watchify', function() {
    runtime.setWatching();
    return gulp.start('browserify');
});
