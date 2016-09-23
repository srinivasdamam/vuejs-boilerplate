import Vue from 'vue';
import Router from 'vue-router';
import VueAuth from '@websanova/vue-auth';
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
		auth: true,
		component: Hello,
	},
	'/register': {
		auth: false,
		component: Register,
	},
	'/login': {
		auth: false,
		component: Login,
	},
});

Vue.router.redirect({
	'*': '/',
});

Vue.use(VueAuth, {
	rolesVar: 'roles'
});

Vue.http.options.root = 'http://localhost:8090/api';

Vue.http.headers.common['Content-Type'] = 'application/json';

Vue.router.start(App, '#app');
