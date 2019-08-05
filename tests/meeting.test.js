const {
  createMeeting,
  inviteUsers,
  createHardcodedMeeting,
  setMeetingTasks,
  edit,
  getAllMeetings,
  getMeeting,
  getUserMeeting,
  confirmAttendanceMeeting
} = require('../functions/meeting.functions')
const { createHardcodedUser } = require('../functions/user.functions')
const { createHardCodedTask } = require('../functions/task.functions')
const {
  entityNotFound,
  unrelatedUserMeeting,
  meetingConfirmed,
  alreadyInvited,
  unInvitedUser,
  alreadyAdded,
  success
} = require('../constants/statusCodes')

const organizeMeeting = 'Organizes a new meeting'
const invite = 'Invites users to a meeting'
const inviteAgain = 'Invites already invited users to a meeting'
const inviteNonExistentUsers = 'Invites non existent users to a meeting'
const inviteNonRelatedUsers = 'Invites non related users to a meeting'
const inviteAfterRevoke = 'Invites users after revoking the invitation'
const addingTasks = 'Sets meeting tasks'
const addingOldTasks = 'Adds tasks already added for the meeting'
const editMeeting = 'Edits meeting'
const editMeetingAfterConfirm = 'Edits meeting after confirmation'
const viewAllMeetings = 'Views all meetings'
const viewSpecificMeeting = 'Views a specific meeting'
const viewUserMeetings = 'Views all user meetings'
const confirmAttendance = 'Confirms attendance of an invited user'
const confirmAttendanceUninvited = 'Confirms attendance of an uninvited User'

test(organizeMeeting, async () => {
  const user = await createHardcodedUser()
  const meeting = await createMeeting(user.id, 'HII')
  const { data, headers } = meeting
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    organiser_id: user.id,
    description: 'HII'
  })
})

test(invite, async () => {
  const meeting = await createHardcodedMeeting()
  const invited = await inviteUsers([meeting.organiser_id], meeting.id, false)
  const { headers } = invited
  expect(headers.statuscode).toEqual(success)
})
test(inviteAgain, async () => {
  const meeting = await createHardcodedMeeting()
  const invited = await inviteUsers([meeting.organiser_id], meeting.id, false)
  const invitedAgain = await inviteUsers(
    [meeting.organiser_id],
    meeting.id,
    false
  )
  const { headers } = invitedAgain
  expect(headers.statuscode).toEqual(alreadyInvited)
})

test(inviteNonExistentUsers, async () => {
  const meeting = await createHardcodedMeeting()
  const invited = await inviteUsers([124124124, 412215125], meeting.id, false)
  const { headers } = invited
  expect(headers.statuscode).toEqual(entityNotFound)
})

test(invite, async () => {
  const meeting = await createHardcodedMeeting()
  const user = await createHardcodedUser()
  const invited = await inviteUsers([user.id], meeting.id, false)
  const { headers } = invited
  expect(headers.statuscode).toEqual(unrelatedUserMeeting)
})

test(inviteAfterRevoke, async () => {
  const meeting = await createHardcodedMeeting()
  const invited = await inviteUsers([meeting.organiser_id], meeting.id, false)
  const revoked = await inviteUsers([meeting.organiser_id], meeting.id, true)
  const invitedAgain = await inviteUsers(
    [meeting.organiser_id],
    meeting.id,
    false
  )
  const { headers } = invitedAgain
  expect(headers.statuscode).toEqual(success)
})

test(addingTasks, async () => {
  const task = await createHardCodedTask()
  const meeting = await createHardcodedMeeting()
  const addedTasks = await setMeetingTasks(meeting.id, [task.id])
  const { headers } = addedTasks
  expect(headers.statuscode).toEqual(success)
})

test(addingOldTasks, async () => {
  const task = await createHardCodedTask()
  const meeting = await createHardcodedMeeting()
  const addedTasks = await setMeetingTasks(meeting.id, [task.id])
  const addedAgain = await setMeetingTasks(meeting.id, [task.id])
  const { headers } = addedAgain
  expect(headers.statuscode).toEqual(alreadyAdded)
})

test(editMeeting, async () => {
  const meeting = await createHardcodedMeeting()
  const newMeeting = await edit(meeting.id, 'TL')
  const { headers, data } = newMeeting
  expect(headers.statuscode).toEqual(success)
  expect(data).toMatchObject({
    description: 'TL',
    organiser_id: meeting.organiser_id
  })
})
test(viewAllMeetings, async () => {
  const meeting = await createHardcodedMeeting()
  const meetings = await getAllMeetings(0, 1000)
  const { headers, data } = meetings
  expect(headers.statuscode).toEqual(success)
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        organiser_id: expect.any(Number),
        description: expect.any(String)
      })
    ])
  )
})

test(viewSpecificMeeting, async () => {
  const meeting = await createHardcodedMeeting()
  const result = await getMeeting(meeting.id)
  const { headers, data } = result
  expect(headers.statuscode).toEqual(success)
  expect(data).toEqual(meeting)
})

test(viewUserMeetings, async () => {
  const user = await createHardcodedUser()
  const meeting = await createMeeting(user.id, 'NA')
  const userMeetings = await getUserMeeting(user.id)
  const { headers, data } = userMeetings
  expect(headers.statuscode).toEqual(success)
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        organiser_id: user.id
      })
    ])
  )
})
test(confirmAttendance, async () => {
  const user = await createHardcodedUser()
  const meeting = await createHardcodedMeeting()
  await inviteUsers([meeting.organiser_id], meeting.id, false)
  const confirmed = await confirmAttendanceMeeting(
    meeting.organiser_id,
    meeting.id
  )
  const { headers, data } = confirmed
  expect(headers.statuscode).toEqual(success)
  expect(data[0]).toMatchObject({
    confirmed: true,
    user_id: meeting.organiser_id,
    meeting_id: meeting.id
  })
})

test(confirmAttendanceUninvited, async () => {
  const user = await createHardcodedUser()
  const meeting = await createHardcodedMeeting()
  const confirmed = await confirmAttendanceMeeting(user.id, meeting.id)
  const { headers } = confirmed
  expect(headers.statuscode).toEqual(unInvitedUser)
})
