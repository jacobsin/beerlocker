var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var errorHandler = require('../common/error-handler');
var bundleLogger = require('../common/bundle-logger');
var runtime = require('../common/runtime');
var _ = require('lodash');

gulp.task('browserify', ['scripts', 'scripts-coffee'], function() {
    var bundleConfig = {
        entries: ['app/scripts/angular-main.coffee'],
        extensions: ['.coffee'],
        outputName: 'angular-bundle.js',
        dest: '.tmp/scripts',
        debug: true
    };

    var watching = runtime.isWatching();

    if(watching) {
        // Add watchify args and debug (sourcemaps) option
        _.extend(bundleConfig, watchify.args, { debug: true });
        // A watchify require/external bug that prevents proper recompiling,
        // so (for now) we'll ignore these options during development. Running
        // `gulp browserify` directly will properly require and externalize.
        bundleConfig = _.omit(bundleConfig, ['external', 'require']);
    }

    var b = browserify(bundleConfig);

    var bundle = function () {
        bundleLogger.start(bundleConfig.outputName);
        return b
            .bundle()
            .on('error', errorHandler.handle)
            .pipe(source(bundleConfig.outputName))
            .pipe(buffer())
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe($.sourcemaps.write('./maps'))
            .pipe(gulp.dest(bundleConfig.dest));
    };

    if(watching) {
        b = watchify(b);
        // Rebundle on update
        b.on('update', bundle);
        bundleLogger.watch(bundleConfig.outputName);
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

gulp.task('watchify', function() {
    runtime.setWatching();
    return gulp.start('browserify');
});
