var fs = require( "fs" );
var async = require( "async" );

module.exports = function( folder, app, config, callback ) {

	fs.readdir( folder, ( e, files ) => {

		var configurators = files.filter( f => /^[0-9]{3}-configure-/.test( f ) );
		async.each( configurators, ( f, next ) => {

			console.log( f );
			require( "./" + f ).configure( app, config, next );

		}, callback );

	} );

};
