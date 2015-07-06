var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync');

gulp.task('scripts-coffee', function() {
  return gulp.src('app/scripts/**/*.coffee')
    .pipe($.sourcemaps.init())
    .pipe(coffee({
      bare: true
    }).on('error', errorHandler.process))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.get('singleton').stream({match: '**/*.js'}))
    .pipe($.size());
});

gulp.task('specs-coffee', function() {
    return gulp.src('test/specs/**/*.coffee')
        .pipe($.sourcemaps.init())
        .pipe(coffee({
            bare: true
        }).on('error', errorHandler.process))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('.tmp/specs'))
        .pipe($.size());
});
