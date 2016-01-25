/*eslint-env node*/

"use strict";

const fork = require( "child_process" ).fork;
const spawn = require( "child_process" ).spawn;

var server = fork( "index.js" );
server.on( "message", m => {

	if( m === "HUP" ) {

		var tests = spawn( "./node_modules/.bin/cucumberjs" );
		tests.stdout.on( "data", data => console.log( data.toString() ) );
		tests.stderr.on( "data", data => console.error( data.toString() ) );

	}

} );
