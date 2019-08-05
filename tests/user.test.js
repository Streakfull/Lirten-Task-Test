const {
  createUser,
  login,
  suspend,
  getAllUsers,
  getUser,
  updateUser,
  freeze,
  createHardcodedUser
} = require('../functions/user.functions')
const {
  emailExists,
  validation,
  entityNotFound,
  wrongInfo,
  suspended,
  success
} = require('../constants/statusCodes')
// Test Descriptions
const createUserSuccess = 'Creates a successful new user'
const createUserFail = 'Creates a user with an existing email'
const loginSuccess = 'Logs in with a correct email and password'
const loginFail = 'Logs in with a wrong password'
const suspendUserSuccess = 'Suspends a user'
const suspendUserFail = 'Suspends an already suspended user'
const unsuspendAUser = 'Unsuspends a user'
const getUsers = 'Gets all users'
const getSpecificUser = 'Gets an existing Specific user'
const getInvalidUser = 'Gets an invalid user'
const updateUserSuccess = 'Updates a user successfully'
const updateUserFail =
  'Updates user email to an email belonging to another user'
const freezeUser = 'Freezes a specific user'
const unfreezeUser = 'Unfreezes a specific user'

test(createUserSuccess, async () => {
  const name = 'youssef'
  const email = 't24@hotmail.com'
  const password = 'test'
  const user = await createUser(name, email, password)
  const { headers, data } = user
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    id: expect.any(Number),
    name,
    email
  })
})

test(createUserFail, async () => {
  const name = 'Ashe'
  const email = 'email@hotmail.com'
  const password = 'test'
  const newUser = await createUser(name, email, password)
  const user = await createUser(name, email, password)
  const { headers } = user
  expect(headers.statuscode).toEqual(emailExists)
})
test(loginSuccess, async () => {
  const user = await createHardcodedUser()
  const loggedUser = await login(user.email, 'test')
  const { headers, data } = loggedUser
  console.log(data)
  expect(headers.statuscode).toEqual(success)
})
test(loginFail, async () => {
  const email = 't24@hotmail.com'
  const password = 'wrongPassword'
  const loggedUser = await login(email, password)
  const { headers } = loggedUser
  expect(headers.statuscode).toEqual(wrongInfo)
})

test(suspendUserSuccess, async () => {
  const savedUser = await createHardcodedUser()
  const suspendedUser = await suspend(savedUser.id, true)
  const { headers, data } = suspendedUser
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    is_suspended: true
  })
})
test(suspendUserFail, async () => {
  const user = await createHardcodedUser()
  const savedUser = await suspend(user.id, true)
  const suspendedUser = await suspend(savedUser.data[0].id, true)
  const { headers } = suspendedUser
  expect(headers.statuscode).toEqual(suspended)
})

test(unsuspendAUser, async () => {
  const user = await createHardcodedUser()
  const savedUser = await suspend(user.id, true)
  const unsuspendedUser = await suspend(savedUser.data[0].id, false)
  const { headers, data } = unsuspendedUser
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    is_suspended: false
  })
})
test(getUsers, async () => {
  const users = await getAllUsers(0, 1000)
  const { headers, data } = users
  expect(headers.statuscode).toEqual(success)
  if (data.length === 0) expect(data).toEqual([])
  else
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String)
        })
      ])
    )
})
test(getSpecificUser, async () => {
  const user = await createHardcodedUser()
  expect(user).toMatchObject({ name: 'Irelia' })
})

test(getInvalidUser, async () => {
  const user = await getUser(12314124215)
  const { headers } = user
  expect(headers.statuscode).toEqual(entityNotFound)
})

test(updateUserSuccess, async () => {
  const savedUser = await createHardcodedUser()
  const name = 'UPDATE TEST'
  const email = 'update@gmail.com'
  const newUser = await updateUser(savedUser.id, name, email)
  const { headers, data } = newUser
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    name,
    email
  })
})

test(updateUserFail, async () => {
  //creating a new user to test duplicate email
  const savedUser = await createHardcodedUser()
  const newUser = await createUser('ABC', 'abc@gmail.com', '1234')
  const updatedUser = await updateUser(savedUser.id, 'newName', 'abc@gmail.com')
  const { headers, data } = updatedUser
  expect(headers.statuscode).toEqual(emailExists)
})

test(freezeUser, async () => {
  const savedUser = await createHardcodedUser()
  const frozenUser = await freeze(savedUser.id, true)
  const { headers, data } = frozenUser
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    frozen: true
  })
})
test(unfreezeUser, async () => {
  const savedUser = await createHardcodedUser()
  const frozenUser = await freeze(savedUser.id, false)
  const { headers, data } = frozenUser
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    frozen: false
  })
})
