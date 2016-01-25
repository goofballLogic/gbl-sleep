/*eslint-env node, es6*/

"use strict";

var providers = {

	"s3": require( "./storage-providers/s3" )

};

module.exports = {

	configure: function( app, config, callback ) {

		var provider = ( config.PROVIDER || "" ).toLowerCase();
		if( provider in providers ) {

			providers[ provider ].build( config, ( e, store ) => {

				if( e ) { callback( e ); }
				else {

					app.set( "store", store );
					callback();

				}

			} );

		} else {

			callback( new Error( "Unrecognised storage provider: " + provider ) );

		}

	}

};
