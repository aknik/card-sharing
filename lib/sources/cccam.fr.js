var Source = require( '../core/source' ),
    Promise = require( 'bluebird' );

module.exports = Source.extend({

    name: 'cccam.fr',
    url: 'http://www.cccam.fr/',

    parseDom: function ( $ ) {
        var els = $( '[class^="tab_line_"]' );

        return Promise.cast(
            Object.keys( els )
            .filter(function ( el ) {
                return parseInt( el ) > 0;
            })
        )
        .map(function ( i ) {
            return els.eq( i );
        })
        .map(function ( el ) {
            var childrens = el.children();

            var options = {
                type: childrens.eq( 0 ).text() === 'C:' && 'cccam' || 'newcam',

                host: childrens.eq( 1 ).text(),
                port: childrens.eq( 2 ).text(),

                username: childrens.eq( 3 ).text(),
                password: childrens.eq( 4 ).text(),
            };

            return options;
        });
    },

});
