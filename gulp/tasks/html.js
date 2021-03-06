var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');

gulp.task('html', [ /*'styles',*/ 'styles-less', 'browserify'], function() {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'})).on('error', errorHandler.handle)
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
