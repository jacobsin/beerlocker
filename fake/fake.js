var Interfake = require('interfake');
var interfake = new Interfake({debug:true, path:'api'});
var port = 9001;

require('./comments')(interfake);
require('./phones')(interfake);

//interfake.serveStatic('/', 'app');

interfake.listen(port);
console.log('Faking on port ' + port);
