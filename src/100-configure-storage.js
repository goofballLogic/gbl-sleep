/*eslint-env node, es6*/

"use strict";

module.exports = {

	configure: function( app, config, callback ) {

		var provider = config.PROVIDER;
		switch( provider ) {

			default:
				callback( new Error( "Unrecognised storage provider: " + provider ) );

		}

	}

};
