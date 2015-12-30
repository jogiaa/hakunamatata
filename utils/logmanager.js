var winston = require('winston');
var winstonConfig = require('../config/winston.config.js');

var getLogger = function (env) {

	if(!env)
		var env  = 'dev';
	
	var wlogger = winston.loggers;
	wlogger.add ('dev-service' , {
		console : {
			level : winstonConfig.level ,
			colorize : winstonConfig.colorize,
			label : winstonConfig.label_service,
			handleExceptions: winstonConfig.handleExceptions,
			exitOnError: winstonConfig.exitOnError
		} ,
		file : {
			filename: winstonConfig.filename_service , 
			level : winstonConfig.level ,
			label : winstonConfig.label_service, 
			handleExceptions: winstonConfig.handleExceptions,
			exitOnError: winstonConfig.exitOnError,
			json: winstonConfig.json
		}
	});
	

	return wlogger.get('dev-service');


};

module.exports = getLogger;

