var Class = require( 'findhit-class' );

var Config = module.exports = Class.extend({

    options: {

        host: undefined,
        port: undefined,

        username: undefined,
        password: undefined,

    },

    initialize: function ( options ) {
        this.setOptions( options );

        this.renders = {};
    },

    render: function ( output ) {

        output =
            output === 'string' && output ||
            output instanceof require( './output' ) && output.name ||
            false;

        if ( ! output ) {
            throw new TypeError( "you must provide in which output we should render" );
        }

        if ( ! this.constructor.renders ) {
            throw new Error( "renders object not found" );
        }

        if ( typeof this.constructor.renders[ output ] !== 'function' ) {
            throw new Error( "config render method not found for this config" );
        }

        return this.constructor.renders[ output ].apply( this );
    },

});
