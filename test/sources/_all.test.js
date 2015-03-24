var Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' ),

    Config = require( '../../lib/core/config' ),
    Sources = require( '../../lib/sources' ),

    chai = require( 'chai' ),
    expect = chai.expect;

describe( "Source", function () {
    Util.Object.each( Sources, function ( Source, name ) {

        describe( name, function () {
            var source = new Source(),
                fetchPromise;

            before(function () {
                fetchPromise = source.fetch();
            });

            it( "promise should be fulfilled", function () {
                return fetchPromise;
            });

            it( "should return an array", function () {
                return fetchPromise
                .then(function ( configs ) {
                    expect( configs ).to.be.instanceof( Array );
                });
            });

            it( "array shouldn't be empty, otherwise source isn't fetching", function () {
                return fetchPromise
                .then(function ( configs ) {
                    expect( configs ).to.have.length.above( 0 );
                });
            });

            it( "all items should be instance of Config", function () {
                return fetchPromise
                .each(function ( config ) {
                    expect( config ).to.be.instanceof( Config );
                });
            });

        });
    });
});
