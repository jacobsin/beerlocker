var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('mocha-phantomjs', function() {
  gulp.src('test/**/*.html', {
      read: false
    })
    .pipe(mochaPhantomJS({
      reporter: 'spec'
    }))
    .on('error', errorHandler.process);
});

gulp.task('watch-mocha-phantomjs', function() {
    errorHandler.setWatchingMode();
    gulp.watch(['app/scripts/**', 'test/spec/**', 'test/**/*.html'], ['mocha-phantomjs']);
});
