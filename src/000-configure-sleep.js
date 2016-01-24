/*eslint-env node, es6*/

"use strict";

var rid = 10000000;
function attachSleep( req, res, next ) {

	req.sleep = { requestId: rid++ };
	next();

}
module.exports = {

	configure: function( app, config, callback ) {

		app.use( attachSleep );
		callback();

	}

};
