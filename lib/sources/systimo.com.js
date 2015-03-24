var Source = require( '../core/Source' );

module.exports = Source.extend({

    name: 'systimo.com',
    url: 'http://www.systimo.com/free/',

    parseDom: function ( dom ) {
        return [];
    },

});
