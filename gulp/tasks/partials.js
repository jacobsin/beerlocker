var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('partials', function() {
    return gulp.src(['app/scripts/**/*.html'], {
        dot: true
    })
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.get('singleton').stream({match: '**/*.html'}));
});
