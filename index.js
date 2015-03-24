var Promise = require( 'bluebird' ),
    Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),

    Source = require( './lib/core/source' ),
    Sources = require( './lib/sources' ),

    Output = require( './lib/core/output' ),
    Outputs = require( './lib/outputs' );


module.exports = Class.extend({

    options: {

        sources: undefined,
        output: 'plain-lines',

    },

    initialize: function ( options ) {
        options = this.setOptions( options );

        this.setOutput( options.output );
        this.setSources( options.sources );

    },

    setOutput: function ( output ) {

        var _Output =
            output instanceof Output && output ||
            Outputs[ output ] ||
            output && output.name && Outputs[ output.name ] ||
            Outputs[ 'plain-lines' ];

        this.output = new _Output();

        return this.output;
    },

    setSources: function ( _sources ) {
        var sources;

        if ( ! _sources ) {

            sources = Util.Array.map( Sources, function ( Source ) {
                return new Source();
            });

        } else {

            if ( Util.isnt.Array( _sources ) ) {
                _sources = [ _sources ];
            }

            sources = [];

            Util.Array.each( _sources, function ( source ) {

                if ( Util.is.String( source ) ) {
                    var ClassSource = Sources[ source ];

                    if ( ! ClassSource ) {
                        throw new Error( "Source type not found" );
                    }

                    return sources.push(
                        new ClassSource()
                    );
                }

                if ( Util.is.instanceof( Source, source ) ) {
                    return sources.push(
                        source
                    );
                }

                throw new TypeError( "Array.# should be a string or instance of Source" );

            });

        }

        this.sources = sources;

        return sources;
    },

    fetch: function () {

        if ( this.configs ) {
            return this.configs;
        }

        var configs = this.configs = [];

        return Promise.cast( this.sources ).bind( this )
        .map(function ( source ) {
            return source.fetch()
            .each(function ( config ) {
                configs.push( config );
            });
        })
        .return( configs );
    },

    render: function () {
        return this.fetch().bind( this )
        .then(function ( configs ) {
            return this.output.render( configs );
        });
    },

});
