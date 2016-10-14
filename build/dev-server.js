//Imports
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.dev.conf.js');
const _ = require('lodash');
const thinky = require('thinky')({
	servers: [
		{ host: '138.197.141.185', port: 11599 }
	]
});
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
app.use(flash());

// import necessary modules for Passport
app.use(passport.initialize());
app.use(passport.session());
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
			console.log(result.length);
			if (result.length) {
				var user = result[0];
				if (isValidPassword(user, password)) {
					return done(null, user);
				} else {
					return done("Email or password is incorrect.", false);
				}
			} else {
				// no user found
				return done("No user found.", false);
			}
		});
	}));

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.hash);
};

//ROUTES
//AUTHENTICATION ROUTES
router.post('/auth/register', jsonParser, (req, res) => {
	User.filter({ email: req.body.email }).run().then(function(userArray) {
		if (userArray[0]) {
			return res.status(400).json({ error: "Email is already in use." });
		} else {
			var user = new User({
				email: req.body.email.toString(),
				password: req.body.password
			});
			user.save().then(function(result) {
				return res.send(result);
			}).error(handleError(res));
		}
	});
});

//Login Route
router.post('/auth/login', jsonParser, function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.status(400).json({ error: err });
		}
		if (user) {
			//user has authenticated correctly thus we create a JWT token
			var token = jwt.encode(user, 'lkmaspokjsafpaoskdpa8asda0s9a');
			return res.json({ success: true, token: 'JWT ' + token });
		}
	})(req, res, next);
});

//Get user info
router.get('/auth/user', (req, res) => {
	var splitToken = req.headers.authorization.split(' ');
	var token = splitToken[2];
	var decoded = jwt.decode(token, 'lkmaspokjsafpaoskdpa8asda0s9a');
	User.filter({ id: decoded.id }).run().then(function(result) {
		var user = result[0];
		return res.json({ success: true, data: user });
	});
});

//Refresh user data
router.get('/auth/refresh', jsonParser, (req, res) => {
	return res.json({ status: 'success' });
});

// DATA ROUTES
// GET - All User Data
router.get('/users', (req, res) => {
	User.run().then(function(result) {
		return res.json({ success: true, data: result });
	})
});

// DELETE - Single User Account
router.delete('/users/:id', (req, res) => {
	User.get(req.params.id).then(function(user) {
		user.delete().then(function(result) {
			return res.json({ success: true });
		});
	});
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
