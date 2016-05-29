app = angular.module 'phonecatApp', [
    require('./directives').name,
    require('./controllers').name,
    require('./filters').name,
    require('./services').name,
    'ngRoute'
]

app.config require('./routes')

module.exports = app
