# vuejs-boilerplate

#### A Vue.js Boilerplate Project
Includes
- Vue.js 2.0
- Express
- Passport
- Vue-Auth
- RethinkDB


## Build Setup

``` bash
# install dependencies
npm install

# run RethinkDB
rethinkdb

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## CHANGE LOG
### 0.3
- Refactored all code to Vue JS 2.0 (with updated vue-webpack template)
- Switched from Bulma CSS library to Bootstrap 4.0 Alpha (looks great now)
- Login no longer works but register + listing of users works perfectly.

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
- Deploy to a demo server for people to try out + test
- Better error handling (almost none now)
