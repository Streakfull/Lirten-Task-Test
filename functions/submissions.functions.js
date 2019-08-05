const { post } = require('./services/axios')
// const {createHard} = require()

const createSubmission = async (userId, taskId, text) => {
  const url = 'submissions/submit'
  const request = { userId, taskId, text }
  const serviceName = 'SubmitTask'
  const sub = await post(url, request, serviceName)
  return sub
}

const acceptSubmission = async (userId, taskId) => {
  const url = 'submissions/acceptSubmission'
  const request = { userId, taskId }
  const serviceName = 'AcceptTask'
  const sub = await post(url, request, serviceName)
  return sub
}

module.exports = { createSubmission, acceptSubmission }
