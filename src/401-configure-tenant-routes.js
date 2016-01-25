/*eslint-env node, es6*/

"use strict";

var store;

function deleteApp( req, res ) {

	req.sleep.log( "WARNING", "Deleting app tenancy", req.params );
	store.deleteTenancy( req.params, e => {

		if( e ) {

			req.sleep.log( "ERROR", e.stack || e );
			res.status( 500 ).send( e );

		} else {

			res.status( 200 ).send( "Ok" );
		}

	} );

}

const MAPPING = "/:app/:tenant";

module.exports = {

	configure: function( app, config, callback ) {

		store = app.get( "store" );
		if( !store ) { throw new Error( "No store" ); }
		app.delete( MAPPING, deleteApp );
		callback();

	}

};
