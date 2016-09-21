import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';

// Import components
import Register from './components/Register.vue';
import Hello from './components/Hello.vue';
import Login from './components/Login.vue';

// Vue Use Imports
Vue.use(Router);
Vue.use(Resource);

// Router
Vue.router = new Router({
	hashbang: false,
	history: true,
	linkActiveClass: 'active',
	mode: 'html5',
});

Vue.router.map({
	'/': {
		component: Hello,
	},
	'/register': {
		component: Register,
	},
	'/login': {
		component: Login,
	},
});

Vue.router.redirect({
	'*': '/',
});
Vue.http.options.emulateJSON = true;

Vue.router.start(App, '#app');
