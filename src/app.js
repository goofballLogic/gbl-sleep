const express = require( "express" );
const PORT = process.env.PORT;
const app = express();

function configure( expressApp ) {

	expressApp.get( "/", ( req, res ) => res.send( "hello world" ) );

}
configure( app );
app.listen( port, function( e ) {

	if( e ) { throw e; }
	console.log( "Running on port: " + PORT );

} );