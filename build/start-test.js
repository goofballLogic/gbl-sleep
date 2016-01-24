/*eslint-env node*/

const fork = require( "child_process" ).fork;
const spawn = require( "child_process" ).spawn;

var server = fork( "index.js" );
server.on( "message", m => {


	if( m === "HUP" ) {

		var tests = spawn( "npm", [ "run", "test" ] );
		tests.stdout.on( "data", data => console.log( data.toString() ) );

	}

} );
