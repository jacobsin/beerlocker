var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/styles/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official', 'bootstrap']
        }))
        .pipe(gulp.dest('app'));

    //gulp.src('test/*.html')
    //    .pipe(wiredep({
    //        directory: 'app/bower_components',
    //        exclude: ['bootstrap-sass-official']
    //    }))
    //    .pipe(gulp.dest('test'));
});
