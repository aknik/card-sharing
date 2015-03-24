var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' ),
    Configs = require( '../configs' ),
    cheerio = require( 'cheerio' ),

    request = require('request');

var Source = module.exports = Class.extend({

    name: undefined,
    url: undefined,

    options: {

    },

    initialize: function ( options ) {
        this.setOptions( options );

        // Check if name is defined
        if ( ! this.name ) {
            throw new Error( "No source name, please check source file" );
        }

        // Check if url is defined
        if ( ! this.url ) {
            throw new Error( "No source url, please check source file" );
        }

        this.configs = [];

    },

    fetch: function () {
        if ( this.configs.length > 0 ) {
            return Promise.cast( this.configs );
        }

        return Promise.cast( this.url ).bind( this )
        .then(function ( url ) {
            return new Promise(function ( fulfill, reject ) {
                var req = request( url, function ( err, res, body ) {
                    if ( err ) {
                        reject( err );
                        return;
                    }
                    fulfill( body );
                });
            });
        })
        .then(function ( body ) {
            return cheerio.load( body );
        })
        .then(function ( dom ) {
            return this.parseDom( dom );
        })
        .map(function ( options ) {
            return this.generateConfig( options );
        })
        .tap(function ( configs ) {
            this.configs = configs;
        });
    },

    parseDom: function ( dom ) {
        return Promise.try(function () {
            throw new Error( "please replace your Source.parseDom method" );
        });
    },

    generateConfig: function ( options ) {

        if ( Util.isnt.Object( options ) ) {
            throw new TypeError( "options should be an object" );
        }

        var type = options.type;

        if ( Util.isnt.String( type ) ) {
            throw new TypeError( "type should be a string" );
        }

        var Config = Configs[ type ];

        if ( ! Config ) {
            throw new Error( "invalid config provided" );
        }

        delete options.type;

        return new Config( options );
    },

});
