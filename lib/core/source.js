var Class = require( 'findhit-class' )
var Util = require( 'findhit-util' )
var Promise = require( 'bluebird' )
var Configs = require( '../configs' )
var cheerio = require( 'cheerio' )
var shuffle = require( 'knuth-shuffle' ).knuthShuffle
var request = require('request')

var Source = module.exports = Class.extend({

    name: undefined,
    url: undefined,

    options: {
        maxRepeat: 2
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
        var self = this

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
        .then(function ( configs ) {

            if ( ! self.options.maxRepeat ) return configs

            var repeats = {}

            return shuffle( configs.slice(0) )
            .filter(function ( config ) {

                if ( typeof repeats[ config.host ] == 'undefined' ) {
                    repeats[ config.host ] = 0
                }

                var count = repeats[ config.host ]++

                return count < self.options.maxRepeat
            })

        })
        .map(function ( options ) {
            return this.generateConfig( options );
        })
        .tap(function ( configs ) {
            this.configs = configs;
        });
    },

    parseDom: function ( dom ) {
        var clines = (
                dom( 'body' ).html()
                    .replace( /(\n|\t|<[^>]*>)/g, ' ' )
                    .replace( /\s+/g, ' ' )
                    .match( /C: [a-z0-9.-]+ [0-9]+ [a-z0-9.-]+ [a-z0-9.-]+/g ) ||
                []
            )
            .map(function ( cline ) {
                cline = cline.split( ' ' )
                return {
                    type: 'cccam',

                    host: cline[1],
                    port: cline[2],
                    username: cline[3],
                    password: cline[4],
                }
            })

        return this.options.randomify ?
            Util.Array.randomFilter( clines, this.options.randomify ) :
            clines;
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
