var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleError = require('../common/handle-error');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('mocha-phantomjs', function() {
  gulp.src('test/**/*.html', {
      read: false
    })
    .pipe(mochaPhantomJS({
      reporter: 'spec'
    }))
    .on('error', handleError);
});
