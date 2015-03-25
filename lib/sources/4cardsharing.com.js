var Source = require( '../core/source' ),
    Util = require( 'findhit-util' );

module.exports = Source.extend({

    name: '4cardsharing.com',
    url: 'http://www.4cardsharing.com/free-cccam-servers/',

    options: {
        randomify: 15,
    },

    parseDom: function ( $ ) {
        var cline = $( 'span:contains(4cardsharing.noip.us)' )
        .eq( 0 ).html().split( ' ' );

        var configs = [];

        for( var i = 0; i < 100; i++ ) {
            configs[ i ] = {
                type: 'cccam',

                host: cline[1],
                port: cline[2],
                username: cline[3].substr( 0, cline[3].length - 1 ) + ( i + 1 ),
                password: cline[4],
            };
        }

        return this.options.randomify ?
            Util.Array.randomFilter( configs, this.options.randomify ) :
            configs;
    },

});
