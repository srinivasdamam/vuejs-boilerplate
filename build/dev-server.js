//Imports
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.dev.conf.js');
const _ = require('lodash');

const app = express();
const router = express.Router();
const compiler = webpack(config);
const jsonParser = bodyParser.json();
const flash = require('connect-flash');
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());


// import necessary modules for Passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Import this at the top of index.js
var User = require('./models/user.js');
const LocalStrategy = require('passport-local').Strategy;

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());
// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

// Pass just the user id to the passport middleware
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// Reading your user base ont he user.id
passport.deserializeUser(function(id, done) {
	User.get(id).run().then(function(user) {
		done(null, user.public());
	});
});

passport.use(new LocalStrategy({
		passReqToCallback: true,
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {
		User.getAll(email, { index: 'email' }).run()
			.then(function(users) {
				// Was a user found?
				if (users.length) {
					// Attempt authenticating with the supplied password
					if (users[0].authenticate(password)) {
						done(null, user.public());
						console.log("LOGGED IN");
					}
					// Supplied password incorrect
					else {
						setTimeout(function() {
							("Sorry, your password is incorrect", false);
						}, 3000);
					}
				}
				// No user was found
				else {
					setTimeout(function() {
						return done("Sorry, no account was found for that email", false);
					}, 3000);
				}
			});
	}));

//ROUTES
router.post('/register', jsonParser, (req, res) => {
	console.log("SIGNUP TRIGGERED");
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});
	user.save().then(function(result) {
		res.send(result);
		console.log("Worked");
	}).error(handleError(res));
});

// router.post('/login',
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login',
// 		failureFlash: true
// 	})
// );

router.post('/login', bodyParser.urlencoded({ extended: true }), function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			console.log('bad');
			req.session.messages = [info.message];
			return res.redirect('/login')
		}
		req.logIn(user, function(err) {
			console.log('good');
			if (err) {
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
});

// router.post('/login', jsonParser, (req, res) => {
// 	console.log("LOGIN TRIGGERED");
// 	res.json({ loggedin: true });
// });

// router.post('/login', passport.authenticate('local', {
// 	successRedirect: '/',
// 	failureRedirect: '/login'
// }));

function handleError(res) {
	return function(error) {
		return res.send(500, { error: error.message });
	}
}

//Server port
app.use('/api', router)
app.listen(8090, 'localhost', function(err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:8090')
})
