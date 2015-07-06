var gulp = require('gulp');
var browserSync = require('browser-sync');
// load plugins
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');

gulp.task('html-dev', function () {
    return gulp.src('app/*.html')
        .on('error', errorHandler.process)
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.get('singleton').stream());
});

gulp.task('html', [ /*'styles',*/ 'styles-less', 'browserify'], function() {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe(gulp.dest('.tmp'))
        .pipe($.useref.assets({
            searchPath: '{.tmp,app}'
        }))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});
