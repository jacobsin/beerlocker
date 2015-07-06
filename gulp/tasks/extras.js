var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('extras', function() {
  return gulp.src(['app/*.*', '!app/*.html'], {
      dot: true
    })
    .pipe(gulp.dest('.tmp'))
    .pipe(browserSync.get('singleton').stream());
});
