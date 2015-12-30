
var winstonConfig =  {
	
	level : 'silly' , //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
	colorize : true , //only console output
	label_service : 'DEV SERVICE',
	label_server : 'SERVER',
	handleExceptions: true,
	exitOnError: false,
	msg: "HTTP ({{res.statusCode}}) {{req.method}} {{req.url}} [[{{req.body}}]] :  {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: false, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
	colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
	ignoreRoute: function (req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
	statusLevels: true,
	///////////
	//CONSOLE
	json_console: false, //json format 
	meta_console: false, // optional: control whether you want to log the meta data about the request (default to true)

	///////////
	//FILE
	json_file:true,
	filename_service : './logs/service.log',
	filename_server : './logs/server.log',
	maxsize: 5242880, //5MB
    maxFiles: 5,
	meta_file: true


	};

module.exports = winstonConfig;



