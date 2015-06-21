function routes(interfake) {

    interfake.get(/^\/comments.json.*$/).body([
        {"author": "Pete Hunt", "text": "This is one comment"},
        {"author": "Jordan Walke", "text": "This is *another* comment"}
    ]);

    interfake.post('/comments.json').body([
        {"author": "Pete Hunt", "text": "This is one comment"},
        {"author": "Jordan Walke", "text": "This is *another* comment"},
        {"author": "moo", "text": "moo"}
    ]).extends.get(/^\/comments.json.*$/).body([
        {"author": "moo", "text": "moo"}
    ]);
}

module.exports = routes;
