var express = require('express');
var home = require('../app/routes/home');

module.exports = function(){
	var app = express();
	
	// configuração de ambiente
	app.set('port', 3000);
	
	//middleware
	app.use(express.static('./public'));
	home(app);
	
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	
	return app;
}
