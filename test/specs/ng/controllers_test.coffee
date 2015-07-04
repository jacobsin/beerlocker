describe 'PhoneCat controllers', ->

    # Load our app module definition before each test.
    beforeEach module 'phonecatApp'

    describe 'PhoneListCtrl', ->

        scope = null
        ctrl = null
        $httpBackend = null

        # The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        # This allows us to inject a service but then attach it to a variable
        # with the same name as the service in order to avoid a name conflict.
        beforeEach inject (_$httpBackend_, $rootScope, $controller) ->
            $httpBackend = _$httpBackend_
            $httpBackend.expectGET('api/static/phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}])
            scope = $rootScope.$new()
            ctrl = $controller('PhoneListCtrl', {$scope:scope})

        it 'should create "phones" model with 2 phones fetched from xhr', ->
            expect(scope.phones).to.be.undefined
            $httpBackend.flush()

            expect(scope.phones).to.deep.equal([{name: 'Nexus S'}, {name: 'Motorola DROID'}])

        it 'should set the default value of orderProp model', ->
            expect(scope.orderProp).to.equal('age')

    describe 'PhoneDetailCtrl', ->

        scope = null
        ctrl = null
        $httpBackend = null
        xyzPhoneData = () ->
            name: 'phone xyz',
            images: ['image/url1.png', 'image/url2.png']

        beforeEach inject (_$httpBackend_, $rootScope, $routeParams, $controller) ->
            $httpBackend = _$httpBackend_
            $httpBackend.expectGET('api/static/phones/xyz.json').respond(xyzPhoneData())

            $routeParams.phoneId = 'xyz'
            scope = $rootScope.$new()
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope})


        it 'should fetch phone detail', ->
            expect(scope.phone).to.be.undefined
            $httpBackend.flush()

            expect(scope.phone).to.deep.equal(xyzPhoneData())
