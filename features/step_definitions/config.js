const derive = (variableName, defaultValue) =>
	( variableName in process.env ) ? process.env[ variableName ] : defaultValue;
const required = variableName => {

	var value = derive( variableName );
	if( typeof value === "undefined" ) { throw new Error( "Undefined environment variable: " + variableName ); }
	return value;

};

module.exports = {

	"service": derive( "service-url", "http://localhost:8080")

};
