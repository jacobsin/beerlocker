var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});
