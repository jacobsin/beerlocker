var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('.tmp/images'))
    .pipe($.size())
    .pipe(browserSync.get('singleton').stream());;
});
