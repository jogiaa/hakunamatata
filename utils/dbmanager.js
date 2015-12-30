///////////////////
//DB setup 
///////////////

var mongoose = require('mongoose');
var log = require('./logmanager')();
var dbconfig = require('../config/db.config.js');



    var connectDB = function(){
      log.info('Connecting to DB..');
      mongoose.connect(dbconfig.db.url , dbconfig.db.options);
      // Mongoose DB connection error handling
      mongoose.connection.on('error' ,connectionDBError );
      //Mongoose DB connected 
      mongoose.connection.on('connected' ,connectonSuccess);
      //Mongoose DB disconnected
      mongoose.connection.on('disconnected' , connectionDisconnected );

      //using native promisses
      mongoose.Promise = global.Promise;
    };

    //Callback function when error occured on Mongoose connection
    var connectionDBError = function(err){
      
      log.info('Error occured on connecting DB :' + dbconfig.db.url);
      log.debug(err);
    };

    //Callback function when Mongoose connection is successfull
    var connectonSuccess = function(){
      log.info('Connected to DB :' + dbconfig.db.url);

    };

    //Callback function when Mongoose connection is diconnected
    var connectionDisconnected = function(){
      log.info('Connected lost to DB :' + dbconfig.db.url);
      log.info('Connecting again...');
      connectDB();
    };
    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {  
      mongoose.connection.close(function () { 
        log.info('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      }); 
    });

    connectDB();
    
 


///////////////////////////////////
