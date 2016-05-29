phonecatServices = angular.module 'phonecatServices', ['ngResource']

phonecatServices.factory 'Phone', ['$resource', ($resource)->
    $resource 'api/static/phones/:phoneId.json', {},
        query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
]

module.exports = phonecatServices
