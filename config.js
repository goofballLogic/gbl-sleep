/*eslint-env node, es6 */

"use strict";

const derive = (variableName, defaultValue) =>
	( variableName in process.env ) ? process.env[ variableName ] : defaultValue;
const required = variableName => {

	var value = derive( variableName );
	if( typeof value === "undefined" ) { throw new Error( "Undefined environment variable: " + variableName ); }
	return value;

};
module.exports = {

	"PORT": derive( "PORT", 8080 ),
	"PROVIDER": required( "PROVIDER" )
};
