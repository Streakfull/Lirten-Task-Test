// Email already exists
const emailExists = '0001'
// Wrong email or password
const wrongInfo = '0002'
// Entity not found
const entityNotFound = '0003'
// validation
const validation = '0004'
// user already suspended
const suspended = '0005'
// user already unsuspended
const unsuspended = '0006'
// task edit frozen
const editFrozen = '0007'
// task already has this status
const wrongStatus = '0008'
// task not edit frozen
const notEditFrozen = '0009'
// task has an accepted app
const alreadyAccepted = '0010'
// user doesn't belong to task
const unrelatedUserTask = '0011'
// user is not related to meeting
const unrelatedUserMeeting = '0012'
// meeting is already confirmed
const meetingConfirmed = '0013'
// Unrelated task
const unrelatedTask = '0014'
// user is not invited to the meeting
const unInvitedUser = '0015'
// Unknown error
const unknown = '000X'
// user already applied
const alreadyApplied = '0016'
// user is already invited
const alreadyInvited = '0017'
// task is already added to the meeting
const alreadyAdded = '0018'
// unauthorized
const unauthorized = '0019'

//success
const success = '0000'

module.exports = {
  emailExists,
  wrongInfo,
  entityNotFound,
  validation,
  suspended,
  unsuspended,
  editFrozen,
  wrongStatus,
  notEditFrozen,
  alreadyAccepted,
  unrelatedUserTask,
  unrelatedUserMeeting,
  meetingConfirmed,
  unrelatedTask,
  unInvitedUser,
  unknown,
  alreadyApplied,
  alreadyInvited,
  alreadyAdded,
  unauthorized,
  success
}
