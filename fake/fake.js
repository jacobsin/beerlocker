var Interfake = require('interfake');
var requireDir = require('require-dir');
var _ = require('lodash');

var interfake = new Interfake({debug:false, path:'api'});

var port = 9001;


_(requireDir('routes')).values().each(function (routes) {
    routes(interfake);
}).value();

interfake.serveStatic('/static', 'static');

interfake.listen(port);
console.log('Faking on port ' + port);
