//saved data to be used between tests
let savedData = {
  token: {},
  user: {}
}

// gets the required property from the data
const getSavedData = prop => savedData[prop]
// appends an object to the data
const setData = data => {
  savedData = { ...savedData, ...data }
}

module.exports = { getSavedData, setData }
