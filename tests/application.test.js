const { createHardcodedUser } = require('../functions/user.functions')
const { createTask } = require('../functions/task.functions')
const {
  createApplication,
  accept,
  createHardCodedApp
} = require('../functions/applications.functions')
const {
  alreadyAccepted,
  validation,
  entityNotFound,
  alreadyApplied,
  success
} = require('../constants/statusCodes')

const apply = 'Applies on task successfully'
const applyAccepted = 'Applies on an an accepted task'
const applyNotExistent = 'Applies on a non-existent task'
const acceptApplication = 'Accepts and application'
const acceptAcceptedApplication = 'Accepts an accepted application'
const applyAgain = 'Apply on the same task again'

test(apply, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'cait')
  const app = await createApplication(user.id, task.data[0].id)
  const { data, headers } = app
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    user_id: user.id,
    task_id: task.data[0].id
  })
})

test(acceptApplication, async () => {
  const app = await createHardCodedApp()
  const acceptedApp = await accept(app.user_id, app.task_id)
  const { data, headers } = acceptedApp
  expect(headers.statuscode).toEqual(success)
  expect(data).toMatchObject({
    accepted: true
  })
})

test(applyAgain, async () => {
  const app = await createHardCodedApp()
  //const acceptedApp = await accept(app.user_id, app.task_id)
  const apply = await createApplication(app.user_id, app.task_id)
  const { data, headers } = apply
  expect(headers.statuscode).toEqual(alreadyApplied)
})

test(alreadyAccepted, async () => {
  const user = await createHardcodedUser()
  const app = await createHardCodedApp()
  const acceptedApp = await accept(app.user_id, app.task_id)
  const apply = await createApplication(user.id, app.task_id)
  const { headers } = apply
  expect(headers.statuscode).toEqual(alreadyAccepted)
})

test(acceptAcceptedApplication, async () => {
  const app = await createHardCodedApp()
  const acceptedApp = await accept(app.user_id, app.task_id)
  const acceptedAppError = await accept(app.user_id, app.task_id)
  const { headers } = acceptedAppError
  expect(headers.statuscode).toEqual(alreadyAccepted)
})

test(applyNotExistent, async () => {
  const app = await createApplication(12345, 24525)
  const { headers } = app
  expect(headers.statuscode).toEqual(entityNotFound)
})
