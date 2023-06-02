const express = require('express')
const router = express.Router()

const controllers = {
  auth: require('./controllers/auth-controller.js'),
  user: require('./controllers/user-controller.js')
}

const routes = [
  { method: 'post', path: '/login', controller: 'auth', action: 'login' },

  { method: 'post', path: '/sign-up', controller: 'user', action: 'signUp' },
]

routes.forEach(route => {
  if (controllers[route.controller][route.action]) {
    router[route.method](route.path, controllers[route.controller][route.action])
  }

})

module.exports = { router }
