/*eslint-env node, es6*/

"use strict";

var store;

function getThing( req, res ) {

	store.get( req.params, function( e, thing ) {

		if( e ) {

			req.sleep.log( "ERROR", e.stack );
			res.status( 500 ).send( "Server error" );

		} else {

			if( thing ) {

				res.status( 200 ).type( thing.type ).send( thing.data );

			} else {

				res.status( 404 ).send( "Not found" );

			}

		}

	} );

}
function putThing( req, res ) {

	var data = [];
	req.on( "data", chunk => data.push( chunk ) );
	req.on( "end", () => {

		var thing = {

			type: req.headers[ "content-type" ],
			data: Buffer.concat( data )

		};
		store.put( req.params, thing, ( e, isNew ) => {

			if( e ) {

				req.sleep.log( "ERROR", e.stack );
				res.status( 500 ).send( e );

			} else {

				res.status( isNew ? 201 : 200 ).type( thing.type ).send( thing.data );

			}

		} );

	} );

}
const MAPPING = "/:app/:tenant/:user/:domain/:category/:id";

module.exports = {

	configure: function( app, config, callback ) {

		store = app.get( "store" );
		if( !store ) { throw new Error( "No store" ); }
		app.get( MAPPING, getThing );
		app.put( MAPPING, putThing );
		callback();

	}

};
