'use strict';
// generated on 2014-05-13 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var requireDir = require('require-dir');
var runtime = require('./gulp/common/runtime');

requireDir('./gulp/tasks', {
  recurse: true
});

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('build', ['html', 'images', 'fonts', 'partials', 'extras']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('watch', ['watchify', 'serve'], function() {
  var server = $.livereload();

  // watch for changes
  runtime.setWatching();
  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/styles/**/*.css',
  ]).on('change', function(file) {
    server.changed(file.path);
  });

  //gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/styles/**/*.less', ['styles-less']);
  gulp.watch('test/specs/**/*.coffee', ['specs-coffee']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);

  //Watchify will watch and recompile our JS, so no need to gulp.watch it
  //gulp.watch('app/scripts/**/*.coffee', ['scripts-coffee', 'browserify']);
  //gulp.watch('app/scripts/**/*.js', ['scripts', 'browserify']);
});
