module.exports = {

	configure: function( app, config, callback ) {

		app.get( "/_diagnostic/vars", ( req, res ) => res.send(

			"<html><head><title>Environment variables</title><body><pre>" +
			JSON.stringify( process.env, null, 3 ) +
			"</pre></body></html>"

		) );
		callback();

	}

}