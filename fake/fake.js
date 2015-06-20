var Interfake = require('interfake');
var interfake = new Interfake({debug:false, path:'api'});
var port = 9001;

interfake.get(/\/comments.json.*/).body([
    {"author": "Pete Hunt", "text": "This is one comment"},
    {"author": "Jordan Walke", "text": "This is *another* comment"}
]);
interfake.post('/comments.json').body([
    {"author": "Pete Hunt", "text": "This is one comment"},
    {"author": "Jordan Walke", "text": "This is *another* comment"},
    {"author": "moo", "text": "moo"}
]).extends.get(/\/comments.json.*/).body([
    {"author": "moo", "text": "moo"}
]);

//interfake.serveStatic('/', 'app');

interfake.listen(port);
console.log('Faking on port ' + port);
