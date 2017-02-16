var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: '6b35eef1a861cfb999be',
		clientSecret: 'e65271034fc4b68bb6e444fb8ab37d49e6c4b5d9',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate(
			{"login": profile.username},
			{"nome": profile.username},
			function(erro, usuario){
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);
	}));

	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});
	
	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
		.then(function(usuario){
			done(null, usuario);
		});
	});
};