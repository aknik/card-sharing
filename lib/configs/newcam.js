// newcam config
var Config = require( '../core/config' );

var newcam = module.exports = Config.extend({
    options: {
        key: '0102030405060708091011121314',
    },
});

newcam.renders = {};

newcam.addInitHook(function () {
    var options = this.options;

    if ( ! options.host ) {
        throw new TypeError( "please provide a options.host" );
    }

    this.host = options.host;

    if ( ! options.port ) {
        throw new TypeError( "please provide a options.port" );
    }

    this.port = options.port;

    if ( ! options.username ) {
        throw new TypeError( "please provide a options.username" );
    }

    this.username = options.username;

    if ( ! options.password ) {
        throw new TypeError( "please provide a options.password" );
    }

    this.password = options.password;

    if ( ! options.key ) {
        throw new TypeError( "please provide a options.key" );
    }

    this.key = options.key;

});
