'use strict';
// generated on 2014-05-13 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var mochaPhantomJS = require('gulp-mocha-phantomjs');


// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('coffee', function () {
    return gulp.src('app/scripts/**/*.coffee')
        .pipe(sourcemaps.init())
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
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

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var url = require('url');
    var proxy = require('proxy-middleware');

    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'))
        .use('/api', proxy(url.parse('http://localhost:9001/api')));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));

    //gulp.src('test/*.html')
    //    .pipe(wiredep({
    //        directory: 'app/bower_components',
    //        exclude: ['bootstrap-sass-official']
    //    }))
    //    .pipe(gulp.dest('test'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.coffee',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.coffee', ['coffee']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('mocha-phantomjs', function () {
    gulp.src('test/**/*.html', {read: false})
        .pipe(mochaPhantomJS({reporter: 'spec'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha-phantomjs', function () {
    gulp.watch(['app/scripts/**', 'test/spec/**'], ['mocha-phantomjs']);
});
