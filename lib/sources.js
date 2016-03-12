var Source = require( './core/source' )

exports[ '4cardsharing.com' ] = Source.extend({
    name: '4cardsharing.com',
    url: 'http://www.4cardsharing.com/free-cccam-servers/',

    options: {
        randomify: 5,
    },

    /* change parseDom again */

/*
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
*/
})

exports[ 'cccam.fr' ] = Source.extend({
    name: 'cccam.fr',
    url: 'http://www.cccam.fr/',
})


exports[ 'testious' ] = Source.extend({
    name: 'testious',
    url: 'http://www.testious.com/free-cccam-servers/',
})
