require '../../helpers/angular'
require '../../helpers/chai'
require '../../../app/scripts/angular/filters'

describe 'PhoneCat filters', ->

    beforeEach ngModule 'phonecatFilters'

    describe 'checkmark', ->

        it 'should convert boolean values to unicode checkmark or cross',
            inject (checkmarkFilter) ->
                expect(checkmarkFilter(true)).to.equal('\u2713')
                expect(checkmarkFilter(false)).to.equal('\u2718')
