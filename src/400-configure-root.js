module.exports = {

	configure: function( app, config, callback ) {

		app.get( "/", ( req, res ) => res.send( "hello world" ) );
		callback();

	}

}