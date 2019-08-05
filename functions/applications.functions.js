const { post } = require('./services/axios')
const { createHardcodedUser } = require('../functions/user.functions')
const { createTask } = require('../functions/task.functions')

const createApplication = async (userId, taskId) => {
  const url = 'applications/apply'
  const request = { userId, taskId }
  const serviceName = 'ApplyTask'
  const application = await post(url, request, serviceName)
  return application
}
const accept = async (userId, taskId) => {
  const url = 'applications/accept'
  const request = { userId, taskId }
  const serviceName = 'AcceptApplication'
  const application = await post(url, request, serviceName)
  return application
}
const createHardCodedApp = async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'cait')
  const app = await createApplication(user.id, task.data[0].id)
  return app.data[0]
}

module.exports = { createApplication, accept, createHardCodedApp }
