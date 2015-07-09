var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');
var coffee = require('gulp-coffee');
var cache = require('gulp-cached');

gulp.task('scripts-coffee', function() {
  return gulp.src('app/scripts/**/*.coffee')
        .pipe(cache('scripts-coffee'))
        .pipe($.sourcemaps.init())
        .pipe(coffee({ bare: false }).on('error', errorHandler.handle))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe($.size());
});

gulp.task('specs-coffee', function() {
    return gulp.src('test/specs/**/*.coffee')
        .pipe(cache('specs-coffee'))
        .pipe($.sourcemaps.init())
        .pipe(coffee({ bare: false }).on('error', errorHandler.handle))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('.tmp/specs'))
        .pipe($.size());
});
