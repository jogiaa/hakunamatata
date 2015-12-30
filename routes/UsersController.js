var router = require('express').Router();
var log = require('../utils/logmanager')();
var User = require('../dbmodels/UsersDO');
var errorHandler = require('../utils/errorhandler')();
var authManager = require('../utils/AuthManager');


var registerUser = function(req , res , next) {

	var user = new User({
    	username: req.body.username,
    	password: req.body.password
  	});

	log.info('savingn user...' + user);
  	var prUserSave = user.save();

  	prUserSave.then(function(data){
		res.json({data:data , status:true});

	}).catch(function(err){
		var message = errorHandler.dbErrorHandler(err , req,res);
		res.status(400).send({message : message , status:false});
		
	});



};

var getUser = function(req , res , next) {

	var prUserGetAll = User.find().exec();

	prUserGetAll.then(function(data){
		res.json({data : data , status:true});
	}).catch(function(err){
		var message = errorHandler.dbErrorHandler(err , req,res);
		res.status(400).send({message : message});//);
	});
};

router.post('/register' , registerUser);
router.get('/' , authManager.isAuthenticated , getUser);

module.exports = router;