const Axios = require('axios')
const uuidv4 = require('uuid/v4')
const moment = require('moment')

const path = 'http://localhost:5000/api/v1/'
// should be from localStorage [Testing purposes]
const { getSavedData } = require('../../savedData')

const postData = (url = '', data = {}, servicename = 'N/A') => {
  const request_id = uuidv4()
  const timestamp = moment().format()
  return Axios({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      token: getSavedData('token'),
      request_id,
      timestamp,
      servicename
    }
  })
}

const post = async (urlInput, req, serviceName) => {
  const url = `${path}${urlInput}`
  const res = await postData(url, req, serviceName)
  const { headers, data } = res
  const fixedData = data.data
  return { headers, data: fixedData }
}

module.exports = { post }
