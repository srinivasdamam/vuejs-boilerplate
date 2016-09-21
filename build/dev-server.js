//Imports
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.dev.conf.js');
const _ = require('lodash');
const thinky = require('thinky')({});
const bCrypt = require('bcrypt');
const jwt = require('jwt-simple');

const app = express();
const router = express.Router();
const compiler = webpack(config);
const jsonParser = bodyParser.json();
const flash = require('connect-flash');
const passport = require('passport');

var User = require('./models/user.js');

//Express Config
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.set('jwtTokenSecret', 'secret');

// import necessary modules for Passport
app.use(passport.initialize());
app.use(passport.session());

// Import this at the top of index.js
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

// Passport needs to be able to serialize and deserialize users to support persistent login sessions
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.get(id).run().then(function(result) {
		if (null === result) {
			// no user found
			done(true, null);
		} else {
			// user was succesfully deleted
			done(null, result);
		}
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
			if (!isValidPassword(user, password)) {
				// wrong password
				console.log("Wrong password");
				return done(null, true, { blame: 'submit', reason: 'Ups, look like you typed something wrong, recheck your entry please.' });
			} else {
				console.log("User authenticated");
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

//Login Route
router.post('/login', jsonParser, function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.json(401, { error: 'message' });
		}
		//user has authenticated correctly thus we create a JWT token
		var token = jwt.encode({ username: user.email }, 'tokenSecret');
		res.json({ token: token });
	})(req, res, next);
});

//Error Handling
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
