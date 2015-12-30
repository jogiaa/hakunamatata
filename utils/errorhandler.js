///////////////////////////////////////////////////////////
var log = require('./logmanager')();


var errorHandlerUtil = function(){

    var errorHandler = {

        dbErrorHandler : function(err,req,res) {
            
            var message = '';
            if (err.code) {
                
                switch (err.code) {
                    case 11000:
                    case 11001:
                        
                        message = this.dbUniqueFieldErrorMessage(err);
                        break;
                    default:
                        message = 'Something went wrong. We have logged this issue and will correct';
                }
            } else {
                 
                for (var errName in err.errors) {
                    if (err.errors[errName].message){
                         message = err.errors[errName].message;
                    }
                }
            }
            //log the error to log file
            log.error('Error occured on DB operation');
            log.error('With Message : ' + message);
            log.debug('Complete Error log : ' + err);
          
            return message;
        },
        dbUniqueFieldErrorMessage : function(err) {
            var output;
            
            try {
                
                var fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
                
                output = fieldName.toUpperCase()  + ' already exists';

            } catch (ex) {
                output = 'Unique field already exists';
            }
            return output;
        }
    };

    return errorHandler;
};  

module.exports = errorHandlerUtil;