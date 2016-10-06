# vuejs-starter-kit
Vue.js Starter Kit Boilerplate
#### Includes
- Vue.js
- Express
- Passport 
- Vue-Auth
- RethinkDB

## Ideas?
So the team behind RethinkDB just shut down... meaning the future of the database is uncertain. I'd be interested to hear anyones thoughts on alternatives to Rethink with easy setup and similar features.
Vue was also upgraded to 2.0 so I will most likely be "re-writing" the codebase to the new 2.0 webpack template as well.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
## CHANGE LOG
### 0.2
- Vue-Auth working properly now, shows user data with $auth.user().email, etc.
- Register/Login/Logout works, needs more error checking though

### 0.1
- Vue-auth + Passport JS working together for Authentication
- RethinkDB connected and hosts the user accounts
- Bulma.io CSS library for UI

## TODO LIST
- Basic CRUD
- More advanced user system (roles + forgot password)
