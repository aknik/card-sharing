var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    Type = require( './type' );

var Output = module.exports = Class.extend({

    options: {

    },

    initialize: function ( options ) {
        this.setOptions( options );
    },

    setTypes: function ( arrayTypes ) {

        // types validation
        Util.Array.each(function ( type ) {
            if ( ! ( type instanceof Type ) ) {
                throw new TypeError( "invalid type specified" );
            }
        });

        this.types = arrayTypes;

    },

    render: function () {
        var types = this.types;

        return Promise.try(function () {
            throw new Error( "please replace your Output.render method" );
        });
    },

});
