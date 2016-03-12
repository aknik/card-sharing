var Output = require( '../core/output' ),
    Configs = require( '../configs' ),
    Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' );

var name = 'plain-lines';

module.exports = Output.extend({
    name: name,
    options: {

        nl: '\n',

    },

    render: function ( configs ) {
        return Promise.cast( configs || this.configs )
        .bind( this )
        .map(function ( config ) {
            return config.render( this );
        })
        .then(function ( configs ) {
            return configs.join( this.options.nl );
        });
    },
});

// Renders for each config type
Util.Object.each({

    cccam: function () {
        var c = this;

        return [

            'C:',
            c.host,
            c.port,
            c.username,
            c.password

        ].join( ' ' ).trim();
    },

    newcam: function () {
        var c = this;

        return [

            'N:',
            c.host,
            c.port,
            c.username,
            c.password

        ].join( ' ' ).trim();
    },

}, function ( render, configName ) {
    Configs[ configName ].renders[ name ] = render;
});
