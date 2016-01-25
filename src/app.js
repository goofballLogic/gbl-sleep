/*eslint-env node, es6*/

"use strict";

const express = require( "express" );
const config = require( "../config" );
const boot = require( "./boot" );
const async = require( "async" );

const PORT = config.PORT;

const app = express();

async.series( [

	next => boot( __dirname, app, config, next ),
	next => app.listen( PORT, next )

], startupError => {

	if( startupError) {

		throw startupError;

	}
	console.log( "Running on port: " + PORT ); //eslint-disable-line no-console
	if( process.send ) { process.send( "HUP" ); }

} );
