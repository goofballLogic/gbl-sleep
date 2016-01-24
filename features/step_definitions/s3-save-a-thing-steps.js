/*eslint-env node, es6*/
/*eslint-disable new-cap*/

"use strict";

var should = require( "should" );

module.exports = function() {

	this.Given(/^I put a thing$/, function (table, callback) {

		var thing = table.hashes()[ 0 ];
		var value = thing.value;
		var url = [

			this.config.service,
			thing.tenant, thing.app, thing.user,
			thing.domain, thing.category, thing.id

		].join( "/" );
		this.lastThing = url;
		this.sendPUT( url, thing.type, value, callback );

	} );

	this.When(/^I get the last thing$/, function (callback) {

		this.sendGET( this.lastThing, callback );

	} );

	this.Then(/^the value should be "([^"]*)"$/, function ( expected ) {

		var actual = Buffer.concat( this.response.data ).toString();
		actual.should.eql( expected );

	} );

};
