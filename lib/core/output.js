var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    Config = require( './config' ),
    Promise = require( 'bluebird' );

var Output = module.exports = Class.extend({

    name: undefined,

    options: {

    },

    initialize: function ( options ) {
        this.setOptions( options );
        this.configs = [];
    },

    addConfigs: function ( configs ) {
        return Promise.cast( configs )
        .each( this.addConfig.bind( this ) );
    },

    addConfig: function ( config ) {

        // config validation
        if ( ! ( config instanceof Config ) ) {
            throw new TypeError( "invalid config specified" );
        }

        this.configs.push( config );
    },

    render: function ( configs ) {
        var configs = configs || this.configs;

        return Promise.try(function () {
            throw new Error( "please replace your Output.render method" );
        });
    },

});
