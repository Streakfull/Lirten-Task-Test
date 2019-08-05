//saved data to be used between tests
let savedData = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InlvdXNzZWYiLCJlbWFpbCI6InQyNEBob3RtYWlsLmNvbSIsImlhdCI6MTU2NTAwOTUyNX0.MxgLVaAHMjqVcDiyPleIGrxHt6TfNGTWoYAz8QYZ_GI'
}

// gets the required property from the data
const getSavedData = prop => savedData[prop]
// appends an object to the data
const setData = data => {
  savedData = { ...savedData, ...data }
}

module.exports = { getSavedData, setData }
