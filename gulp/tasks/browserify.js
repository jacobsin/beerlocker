var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var errorHandler = require('../common/error-handler');
var bundleLogger = require('../common/bundle-logger');

gulp.task('browserify', ['scripts', 'scripts-coffee'], function() {
    var bundleConfig = {
        entries: ['app/scripts/angular-main.coffee'],
        extensions: ['.coffee'],
        outputName: 'angular-bundle.js',
        dest: '.tmp/scripts',
        debug: true
    };
    bundleLogger.start(bundleConfig.outputName);
    return browserify(bundleConfig)
        .bundle().on('error', errorHandler.process)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(bundleConfig.dest));
});
