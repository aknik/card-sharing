var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' );

var Source = module.exports = Class.extend({

    options: {

    },

    initialize: function ( options ) {
        this.setOptions( options );
    },

    fetch: function () {
        return Promise.try(function () {
            throw new Error( "please replace your Source.fetch method" );
        });
    },

});
