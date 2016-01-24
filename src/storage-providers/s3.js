/*eslint-env node, es6 */

"use strict";

const aws = require( "aws-sdk" );

module.exports = {

	build: function( config, callback ) {

		callback( null, new Store( config ) ); //eslint-disable-line no-use-before-define

	}

};

function Store( config ) {

	this.name = "Amazon S3 storage provider";
	this.config = config;

}

