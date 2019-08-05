const {
  createTask,
  getTasks,
  getUserTasks,
  edit,
  freeze
} = require('../functions/task.functions')
const { createHardcodedUser } = require('../functions/user.functions')

const {
  entityNotFound,
  validation,
  editFrozen,
  wrongStatus,
  alreadyAccepted,
  success
} = require('../constants/statusCodes')
// Test Descriptions
const postTask = 'Creates a new task'
const viewAllTasks = 'Views all tasks'
const viewUserTaks = 'Views all tasks made by a specific user'
const editTask = 'Edits a task'
const editFrozenTask = 'Edits an edit_frozen task'
const freezeTask = 'Freezes a task'
const freezesFrozen = 'Freezes a frozen task'

test(postTask, async () => {
  const user = await createHardcodedUser()
  const name = 'Gnar'
  const task = await createTask(user.id, name)
  const { headers, data } = task
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    name,
    user_id: user.id,
    end_date: null
  })
})
test(viewAllTasks, async () => {
  const tasks = await getTasks(0, 1000)
  const { headers, data } = tasks
  expect(headers.statuscode).toEqual(success)
  if (data.length === 0) expect(data).toEqual([])
  else
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          user_id: expect.any(Number)
        })
      ])
    )
})

test(viewUserTaks, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'fizz')
  const tasks = await getUserTasks(user.id, 0, 1000)
  const { headers, data } = tasks
  expect(headers.statuscode).toEqual(success)
  if (data.length === 0) expect(data).toEqual([])
  else
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: user.id
        })
      ])
    )
})

test(editTask, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'leblanc')
  const newTask = await edit(task.data[0].id, 'Lissandra')
  const { headers, data } = newTask
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    name: 'Lissandra'
  })
})

test(editFrozen, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'soraka')
  const newTask = await freeze(task.data[0].id, true)
  const errorTask = await edit(task.data[0].id, 'Lissandra')
  const { headers, data } = errorTask
  expect(headers.statuscode).toEqual(editFrozen)
})

test(freezeTask, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'soraka')
  const newTask = await freeze(task.data[0].id, true)
  const { headers, data } = newTask
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    edit_frozen: true
  })
})

test(freezesFrozen, async () => {
  const user = await createHardcodedUser()
  const task = await createTask(user.id, 'soraka')
  const newTask = await freeze(task.data[0].id, true)
  const errorTask = await freeze(task.data[0].id, true)
  const { headers, data } = errorTask
  expect(headers.statuscode).toEqual(wrongStatus)
})
