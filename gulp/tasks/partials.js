var gulp = require('gulp');

gulp.task('partials', function() {
    return gulp.src(['app/scripts/**/*.html'], {
        dot: true
    })
    .pipe(gulp.dest('dist/scripts'));
});
