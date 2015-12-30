var router = require('express').Router();
var log = require('../utils/logmanager')();
var Bear = require('../dbmodels/BearsDO');
var errorHandler = require('../utils/errorhandler')();
var authManager = require('../utils/AuthManager');

//adding a new record..using call backs
router.post('/add',authManager.isAuthenticated ,function(req , res , next){
	var b  = new Bear();
	b.name = req.body.name;
	b.type = req.body.type;
	b.y   = 'g';
	log.info('Saving :' + b);

	b.save(function(err){
		if(err){
			log.error('Error occured');
			log.debug(err);
			res.send('Error');
		}else{
			res.json({status:true});
		}

			

	});
		
});

//adding new document using promise instead of call backs
router.post('/addPr', authManager.isAuthenticated ,function(req , res , next){
	var b  = new Bear();
	b.name = req.body.name;
	b.type = req.body.type;
	
	log.info('Saving :' + b);
	var promiseSaveBear = b.save();

	console.log(errorHandler);

	promiseSaveBear.then( function(data){
		res.json({data:data , status:true});
	}).catch(function(err){
		var message = errorHandler.dbErrorHandler(err , req,res);
		res.status(400).send({message : message});//);
		//next(err);
	});
		
});

//getting all documents by type
router.get('/allbytype' , authManager.isAuthenticated ,function(req , res ,next){

	var requestedType = req.query.type;
	log.info('Getting all bears of type..' +requestedType );

	var prGetBears = Bear.find()
	.where('type').equals(requestedType) // applying where conditiond
	.limit(10) // limiting result to 10
	.sort('name') //sorting by name // use '-' to sort desc , default is asc
	.select('name') // selecting only name
	.exec();

	prGetBears.then(function(data){
		res.json({data : data , status:true});
	}).catch(function(err){
		var message = errorHandler.dbErrorHandler(err , req,res);
		res.status(400).send({message : message});//);
	});
}); 

module.exports = router;