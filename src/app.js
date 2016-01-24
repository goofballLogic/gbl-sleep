const express = require( "express" );
const config = require( "../config" );

const PORT = config.PORT;
const app = express();

function configure( expressApp ) {

	expressApp.get( "/", ( req, res ) => res.send( "hello world" ) );

}
configure( app );
app.listen( PORT, function( e ) {

	if( e ) { throw e; }
	console.log( "Running on port: " + PORT );

} );