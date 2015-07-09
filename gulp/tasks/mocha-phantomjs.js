var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runtime = require('../common/runtime');
var errorHandler = require('../common/error-handler');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('mocha-phantomjs', ['scripts-coffee', 'specs-coffee'], function() {
  gulp.src('test/**/*.html', { read: false })
      .pipe(mochaPhantomJS({ reporter: 'spec' }))
      .on('error', errorHandler.handle);
});

gulp.task('watch-mocha-phantomjs', function() {
    runtime.setWatching();
    gulp.watch(['app/scripts/**', 'test/specs/**', 'test/**/*.html'], ['mocha-phantomjs']);
});
