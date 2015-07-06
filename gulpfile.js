'use strict';
// generated on 2014-05-13 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var requireDir = require('require-dir');
var errorHandler = require('./gulp/common/error-handler');

requireDir('./gulp/tasks', {
  recurse: true
});

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('build', ['html', 'images', 'fonts', 'partials', 'extras']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('watch', ['browser-sync'], function() {

  // watch for changes
  errorHandler.setWatchingMode();

  //gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/styles/**/*.less', ['styles-less']);
  gulp.watch('app/scripts/**/*.coffee', ['scripts-coffee', 'browserify']);
  gulp.watch('test/specs/**/*.coffee', ['specs-coffee']);
  gulp.watch('app/scripts/**/*.js', ['scripts', 'browserify']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
