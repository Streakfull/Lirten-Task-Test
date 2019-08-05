const { post } = require('./services/axios')
const { createHardcodedUser } = require('../functions/user.functions')

const createMeeting = async (userId, description) => {
  const url = 'meetings/create'
  const request = { userId, description }
  const serviceName = 'OrganizeMeeting'
  const meeting = await post(url, request, serviceName)
  return meeting
}
const inviteUsers = async (userIds, meetingId, revoked) => {
  const url = 'meetings/invite'
  const request = { userIds, meetingId, revoked }
  const serviceName = 'InviteUsers'
  const meeting = await post(url, request, serviceName)
  return meeting
}
const createHardcodedMeeting = async () => {
  const user = await createHardcodedUser()
  const meeting = await createMeeting(user.id, 'HII')
  return meeting.data[0]
}
const setMeetingTasks = async (meetingId, taskIds) => {
  const url = 'meetings/setTask'
  const request = { meetingId, taskIds }
  const serviceName = 'SetTask'
  const meetingTasks = await post(url, request, serviceName)
  return meetingTasks
}
const edit = async (meetingId, description) => {
  const url = 'meetings/edit'
  const request = { meetingId, description }
  const serviceName = 'EditMeeting'
  const meeting = await post(url, request, serviceName)
  return meeting
}
const getAllMeetings = async (page, limit) => {
  const url = 'meetings/viewAll'
  const request = { page, limit }
  const serviceName = 'AllMeetings'
  const meetings = await post(url, request, serviceName)
  return meetings
}
const getMeeting = async meetingId => {
  const url = 'meetings/specific'
  const request = { meetingId }
  const serviceName = 'SpecificMeeting'
  const meeting = await post(url, request, serviceName)
  return meeting
}
const getUserMeeting = async userId => {
  const url = 'meetings/userMeetings'
  const request = { userId }
  const serviceName = 'UserMeetings'
  const meetings = await post(url, request, serviceName)
  return meetings
}

const confirmAttendanceMeeting = async (userId, meetingId) => {
  const url = 'meetings/confirm'
  const request = { userId, meetingId }
  const serviceName = 'ConfirmAttendance'
  const confirmed = await post(url, request, serviceName)
  return confirmed
}

module.exports = {
  createMeeting,
  inviteUsers,
  createHardcodedMeeting,
  setMeetingTasks,
  edit,
  getAllMeetings,
  getMeeting,
  getUserMeeting,
  confirmAttendanceMeeting
}
