const uuidv4 = require('uuid/v4')
const { post } = require('./services/axios')

const createUser = async (name, email, password) => {
  const url = 'users/signup'
  const request = { name, email, password }
  const serviceName = 'signUp'
  const user = await post(url, request, serviceName)
  return user
}
const login = async (email, password) => {
  const url = 'users/login'
  const request = { email, password }
  const serviceName = 'Login'
  const token = await post(url, request, serviceName)
  return token
}
const suspend = async (userId, isSuspended) => {
  const url = 'users/suspend'
  const request = { userId, isSuspended }
  const serviceName = 'Suspend'
  const user = await post(url, request, serviceName)
  return user
}
const getAllUsers = async (page, limit) => {
  const url = 'users/viewAll'
  const request = { page, limit }
  const serviceName = 'GetUsers'
  const users = await post(url, request, serviceName)
  return users
}
const getUser = async userId => {
  const url = 'users/specific'
  const request = { userId }
  const serviceName = 'GetSpecificUser'
  const users = await post(url, request, serviceName)
  return users
}
const updateUser = async (userId, name, email) => {
  const url = 'users/update'
  const request = { userId, name, email }
  const serviceName = 'UpdateUser'
  const user = await post(url, request, serviceName)
  return user
}

const freeze = async (userId, frozen) => {
  const url = 'users/freeze'
  const request = { userId, frozen }
  const serviceName = 'FreezeUser'
  const user = await post(url, request, serviceName)
  return user
}
const createHardcodedUser = async () => {
  const name = 'Irelia'
  const email = `${uuidv4()}@hotmail.com`
  const password = 'test'
  const user = await createUser(name, email, password)
  return user.data[0]
}

module.exports = {
  createUser,
  login,
  suspend,
  getAllUsers,
  getUser,
  updateUser,
  freeze,
  createHardcodedUser
}
