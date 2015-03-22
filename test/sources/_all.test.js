var Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' ),

    Sources = require( '../../lib/sources' );

describe( "Source", function () {

    Util.Object.each( Sources, function ( Source, name ) {
        describe( name, function ( Source ) {
            var source = new Source(),
                fetchPromise;

            before(function () {
                fetchPromise = source.fetch();
            });

            it( "should return an array with some configs", function ( done ) {
                return fetchPromise
                .then(function ( configs ) {
                    expect( configs ).to.be.instancof( Array );
                    expect( configs.length ).to.be.more.than( 0 );
                });
            });

        });
    });
});
