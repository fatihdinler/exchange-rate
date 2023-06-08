const signUp = {
  "email": "required|string|email",
  "username": "required|string",
  "firstname": "required|string",
  "lastname": "required|string",
  "password": "required|string|min:3",
}

const updateUser = {
  "email": "string|email",
  "username": "string",
  "firstname": "string",
  "lastname": "string",
  "password": "string|min:6"
}


module.exports = { signUp, updateUser }