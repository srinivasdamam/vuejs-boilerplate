import Vue from 'vue';
import Router from 'vue-router';
import VueAuth from '@websanova/vue-auth';
import Resource from 'vue-resource';
import App from './App';

// Import components
import Register from './components/pages/Register.vue';
import Hello from './components/pages/Hello.vue';
import Login from './components/pages/Login.vue';
import Users from './components/pages/Users.vue';

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
	'/users': {
		auth: true,
		component: Users,
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
