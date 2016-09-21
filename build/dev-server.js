//Imports
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.dev.conf.js');
const _ = require('lodash');
const thinky = require('thinky')({});
var bCrypt = require('bcrypt');

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
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		User.filter({ email: email }).run().then(function(result) {
			if (!result.length) {
				// no user found
				console.log("No user found");
				return done(null, true, { blame: 'submit', reason: 'Ups, look like you typed something wrong, recheck your entry please.' });
			}
			var user = result[0];
			console.log(user.hash);
			console.log(password);
			if (!isValidPassword(user, password)) {
				// wrong password
				console.log("Wrong password");
				return done(null, true, { blame: 'submit', reason: 'Ups, look like you typed something wrong, recheck your entry please.' });
			} else {
				console.log("should work");
				return done(null, user);
			}
		});
	}));

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.hash);
};

//ROUTES
router.post('/register', jsonParser, (req, res) => {
	console.log("SIGNUP TRIGGERED");
	console.log(req.body);
	var user = new User({
		email: req.body.email.toString(),
		password: req.body.password
	});
	user.save().then(function(result) {
		res.send(result);
		console.log("Worked");
	}).error(handleError(res));
});

router.post('/login', jsonParser, function(req, res, next) {
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


function handleError(res) {
	return function(error) {
		return res.send(500, { error: error.message });
	}
};

//Server port
app.use('/api', router);
app.listen(8090, 'localhost', function(err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:8090')
});
