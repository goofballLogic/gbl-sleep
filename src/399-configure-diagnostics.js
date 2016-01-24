/*eslint-env node, es6*/

"use strict";

function sendPlainJane( res, thing ) {

	var html = "<html><body><pre>" + JSON.stringify( thing, null, 3 ) + "</pre></body></html>";
	res.type( "text/html" ).send( html );

}
module.exports = {

	configure: function( app, config, callback ) {

		app.get( "/_diagnostic/vars", ( req, res ) => sendPlainJane( res, process.env ) );
		app.get( "/_diagnostic/store", ( req, res ) => sendPlainJane( res, app.get( "store" ) ) );
		callback();

	}

};
