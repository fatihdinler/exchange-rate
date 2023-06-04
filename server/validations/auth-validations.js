const login = {
  "username": "required|string",
  "password": "required|string|min:3",
}

const refreshToken = {
  "refreshToken": "required|string",
}

module.exports = { login, refreshToken }