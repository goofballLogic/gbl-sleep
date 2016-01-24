/*eslint-env node, es6*/

/*eslint-disable new-cap*/

"use strict";

var http = require( "http" );
var https = require( "https" );
var url = require( "url" );

var config = require( "../config" );

function send( method, iri, options, payload, callback ) {

	if( typeof callback === "undefined" ) {

		callback = typeof options === "function" ? options : payload;
		payload = typeof options === "function" ? undefined : options;
		options = {};

	}
	if( typeof options === "string" ) {

		var headers = {};
		headers[ method === "GET" ? "Accept" : "Content-Type" ] = options;
		options = { headers: headers };

	}
	var protocol = /^https/.test( url ) ? https : http;
	var opts = url.parse( iri );
	opts.method = method;
	for( var k in options ) { opts[ k ] = options[ k ]; }
	var req = protocol.request( opts, res => {

		res.data = [];
		res.on( "data", chunk => res.data.push( chunk ) );
		res.on( "end", () => {

			this.response = res;
			callback( null, res );

		} );

	} );
	if( payload ) { req.write( payload ); }
	req.end();

}
function World() {

	this.sendGET = function( iri, options, callback ) {

		send.call( this, "GET", iri, options, null, callback );

	};
	this.sendPUT = function( iri, options, payload, callback ) {

		send.call( this, "PUT", iri, options, payload, callback );

	};

}

module.exports = function() {

	this.Before( function() {

		this.config = config;

	} );

	this.World = World;

};
