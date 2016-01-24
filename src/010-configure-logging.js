/*eslint-env node, es6 */

"use strict";

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 */

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

function initLogging( req, res, next ) {

	req.sleep.log = function log() {

		var message = [ timeStamp(), req.sleep.requestId ].concat( [].slice.call( arguments ) );
		if( arguments[ 0 ] === "ERROR" ) {

			console.error.apply( console, message );

		} else {

			console.log.apply( console, message );

		}

	};
	req.sleep.log( req.method, req.url );
	next();

}
module.exports = {

	configure: function( app, config, callback ) {

		app.use( initLogging );
		callback();

	}

};
