
const derive = (variableName, defaultValue) =>
	( variableName in process.env ) ? process.env[ variableName ] : defaultValue;

module.exports = {

	"PORT" : derive( "PORT", 8080 );

}