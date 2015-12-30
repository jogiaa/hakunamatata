/////////////////////////
//DB config
////////////////////////

var db = {
		url:'mongodb://localhost/library',
		options:{ 
			server: { 
				socketOptions: { 
					keepAlive: 1 
				} 
			} 
		}
	};

 module.exports.db = db;
