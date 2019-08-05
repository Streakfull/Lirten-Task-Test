const { entityNotFound, success } = require('../constants/statusCodes')
const {
  createHardCodedApp,
  accept
} = require('../functions/applications.functions')
const {
  createSubmission,
  acceptSubmission
} = require('../functions/submissions.functions')
// const {} = require('../functions/task.functions')

const submit = 'Submit a task successfully'
const submitNotAccepted = 'Submit a task on a non-accepted application'
const acceptSub = 'Accept a submission'
const acceptNonExistentSub = 'Accepting a submissions that is non-existent'

test(submit, async () => {
  const app = await createHardCodedApp()
  const acceptedApp = await accept(app.user_id, app.task_id)
  const submission = await createSubmission(app.user_id, app.task_id, 'HI')
  const { headers, data } = submission
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    user_id: app.user_id,
    task_id: app.task_id,
    is_confirmed: false
  })
})
test(submitNotAccepted, async () => {
  const app = await createHardCodedApp()
  const submission = await createSubmission(app.user_id, app.task_id, 'HI')
  const { headers } = submission
  expect(headers.statuscode).toEqual(entityNotFound)
})

test(acceptSub, async () => {
  const app = await createHardCodedApp()
  const acceptedApp = await accept(app.user_id, app.task_id)
  const submission = await createSubmission(app.user_id, app.task_id, 'HI')
  const acceptedSub = await acceptSubmission(app.user_id, app.task_id)
  const { headers } = acceptedSub
  expect(headers.statuscode).toEqual(success)
})

test(acceptNonExistentSub, async () => {
  const submission = await createSubmission(13124124, 124214124, 'Mi')
  const { headers } = submission
  expect(headers.statuscode).toEqual(entityNotFound)
})
