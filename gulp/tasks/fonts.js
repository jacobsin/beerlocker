var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('fonts', function() {
  return $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});
