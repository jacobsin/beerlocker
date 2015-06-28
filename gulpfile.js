'use strict';
// generated on 2014-05-13 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var requireDir = require('require-dir');
var errorHandler = require('./gulp/common/error-handler');

requireDir('./gulp/tasks', {
  recurse: true
});

// load plugins
var $ = require('gulp-load-plugins')();
var port = 9000;

gulp.task('html', [ /*'styles',*/ 'styles-less', 'scripts-coffee', 'scripts'],
  function() {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
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

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('connect', function() {
  var connect = require('connect');
  var url = require('url');
  var proxy = require('proxy-middleware');

  var app = connect()
    .use(require('connect-livereload')({
      port: 35729
    }))
    //.use(connect.logger('dev'))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use('/api', proxy(url.parse('http://localhost:9001/api')))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(port)
    .on('listening', function() {
      console.log('Started connect web server on http://localhost:' +
        port);
    });
});

gulp.task('connect-dist', function() {
  port = 9999;
  var connect = require('connect');
  var url = require('url');
  var proxy = require('proxy-middleware');

  var app = connect()
    .use(connect.static('dist'))
    .use('/api', proxy(url.parse('http://localhost:9001/api')))
    .use(connect.directory('dist'));

  require('http').createServer(app)
    .listen(port)
    .on('listening', function() {
      console.log(
        'Started connect web server from dist on http://localhost:' +
        port);
    });
});

gulp.task('serve-dist', ['connect-dist'], function() {
  require('opn')('http://localhost:' + port);
});

gulp.task('serve', ['connect' /*, 'styles'*/ , 'styles-less'], function() {
  require('opn')('http://localhost:' + port);
});

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

gulp.task('watch', ['connect', 'serve'], function() {
  var server = $.livereload();

  // watch for changes
  errorHandler.setWatchingMode();
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    '.tmp/scripts/**/*.js',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', function(file) {
    server.changed(file.path);
  });

  //gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/styles/**/*.less', ['styles-less']);
  gulp.watch('app/scripts/**/*.coffee', ['scripts-coffee', 'browserify']);
  gulp.watch('app/scripts/**/*.js', ['scripts', 'browserify']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('watch-mocha-phantomjs', function() {
  errorHandler.setWatchingMode();
  gulp.watch(['app/scripts/**', 'test/spec/**'], ['mocha-phantomjs']);
});
