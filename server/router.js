const express = require('express')
const router = express.Router()
const authValidations = require('./validations/auth-validations')
const userValidations = require('./validations/user-validations')
const { validate } = require('./middleware/validate.js')

const controllers = {
  auth: require('./controllers/auth-controller.js'),
  user: require('./controllers/user-controller.js'),
  rate: require('./controllers/rate-controller.js'),
}

const routes = [
  { method: 'post', path: '/login', controller: 'auth', action: 'login', validation: authValidations.login },
  { method: 'post', path: '/refresh-token', controller: 'auth', action: 'refreshToken', validation: authValidations.refreshToken },

  { method: 'post', path: '/sign-up', controller: 'user', action: 'signUp', validation: userValidations.signUp },
  { method: 'get', path: '/users/:id', controller: 'user', action: 'getUser', validation: '' },
  { method: 'patch', path: '/users/:id', controller: 'user', action: 'updateUser', validation: userValidations.updateUser },

  { method: 'get', path: '/rates', controller: 'rate', action: 'getLastRate', validation: '' },
]

routes.forEach(route => {
  if (controllers[route.controller][route.action]) {
    router[route.method](route.path, validate(route.validation), controllers[route.controller][route.action])
  }
})

module.exports = { router }
