const { post } = require('./services/axios')

const createTask = async (userId, name) => {
  const url = 'tasks/create'
  const request = { userId, name }
  const serviceName = 'PostTask'
  const task = await post(url, request, serviceName)
  return task
}
const getTasks = async (page, limit) => {
  const url = 'tasks/viewAll'
  const request = { page, limit }
  const serviceName = 'GetTasks'
  const tasks = await post(url, request, serviceName)
  return tasks
}
const getUserTasks = async (userId, page, limit) => {
  const url = 'tasks/viewUser'
  const request = { userId, page, limit }
  const serviceName = 'UserTaskView'
  const tasks = await post(url, request, serviceName)
  return tasks
}
const edit = async (taskId, name) => {
  const url = 'tasks/edit'
  const request = { taskId, name }
  const serviceName = 'EditTask'
  const task = await post(url, request, serviceName)
  return task
}
const freeze = async (taskId, editFreeze) => {
  const url = 'tasks/freezeEdit'
  const request = { taskId, editFreeze }
  const serviceName = 'FreezeTaskEdit'
  const task = await post(url, request, serviceName)
  return task
}

module.exports = { createTask, getTasks, getUserTasks, edit, freeze }
