/*eslint-env node, es6 */

"use strict";

const aws = require( "aws-sdk" );
const async = require( "async" );
const catchFail = ( failHandler, successHandler ) => function() {

	if( arguments[ 0 ] ) {

		failHandler( arguments[ 0 ] );

	} else {

		successHandler.apply( null, [].slice.call( arguments, 1 ) );

	}

};

module.exports = {

	build: function( config, callback ) {

		var store;
		try {

			store = new Store( config ); //eslint-disable-line no-use-before-define

		} catch( e ) {

			callback( e );
			return;

		}
		callback( null, store );

	}

};

function Store( config ) {

	this.name = "Amazon S3 storage provider";
	this.config = config;
	this.bucket = this.config.S3 && this.config.S3.bucket;
	if( !this.bucket ) {

		throw new Error( "Bucket not defined" );

	}
	this.S3 = new aws.S3();

}
Store.prototype.get = function( parts, callback ) {

	var opts = {

		Bucket: this.bucket,
		Key: [ parts.app, parts.tenant, parts.user, parts.domain, parts.category, parts.id ].join( "/" )

	};
	this.S3.getObject( opts, catchFail( callback,

		data => callback( null, { data: data.Body, type: data.ContentType } )

	) );

};
Store.prototype.put = function( parts, thing, callback ) {

	var opts = {

		Bucket: this.bucket,
		Key: [ parts.app, parts.tenant, parts.user, parts.domain, parts.category, parts.id ].join( "/" ),
		Body: thing.data,
		ContentType: thing.type

	};
	this.S3.putObject( opts, callback );

};
Store.prototype.deleteTenancy = function( parts, callback ) {

	var isComplete = false;
	async.doWhilst(

		// list objects for this app+tenant
		done => this.S3.listObjects( {

			Bucket: this.bucket,
			Prefix: [ parts.app, parts.tenant ].join( "/" )

		}, catchFail( done,

			data => {

				// if there is content, we're not complete yet
				isComplete = !( data.Contents && data.Contents.length );
				if( isComplete ) { done(); }
				else {

					// delete what we found
					this.S3.deleteObjects( {

						Bucket: this.bucket,
						Delete: { Objects: data.Contents.map( x => ( { Key: x.Key } ) ) }

					}, done );

				}

			}

		) ),
		// are we done?
		() => isComplete,
		// when done, callback
		callback

	);

};

