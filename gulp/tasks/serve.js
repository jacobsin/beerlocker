var gulp = require('gulp');

var port = 9000;

gulp.task('serve', ['connect' /*, 'styles'*/ , 'styles-less'], function() {
    require('opn')('http://localhost:' + port);
});

gulp.task('serve-dist', ['connect-dist'], function() {
    require('opn')('http://localhost:' + port);
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
        .use('/api/static', proxy(url.parse('http://localhost:9001/static')))
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
