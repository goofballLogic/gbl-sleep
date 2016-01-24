var port = process.env.PORT;
var express = require( "express" );

var app = express();

function configure( expressApp ) {

	expressApp.get( "/", ( req, res ) => res.send( "hello world" ) );

}
configure( app );
app.listen( port );