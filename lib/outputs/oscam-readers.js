var Output = require( '../core/output' ),
    Configs = require( '../configs' ),
    Util = require( 'findhit-util' ),
    Promise = require( 'bluebird' );

var name = 'oscam-readers';

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

            '',
            '[reader]',
            'label     = '+ Util.uniqId(),
            'protocol  = cccam',
            'device    = '+ c.host +','+ c.port,
            'user      = '+ c.username,
            'password  = '+ c.password,
            'group     = '+ ( c.group || 1 ),
            'inactivitytimeout             = 3600',
            'ccckeepalive                  = 1'
        ].join( '\n' );
    },

    newcam: function () {
        var c = this;

        return [

            '',
            '[reader]',
            'label     = '+ Util.uniqId(),
            'protocol  = newcamd',
            'key       = '+ c.key,
            'device    = '+ c.host +','+ c.port,
            'user      = '+ c.username,
            'password  = '+ c.password,
            '',

        ].join( '\n' );
    },

}, function ( render, configName ) {
    Configs[ configName ].renders[ name ] = render;
});
