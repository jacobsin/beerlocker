var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});
