const readFileList = require('./readFileList/index.js')
const editFile = require('./editFile/index.js')

module.exports = {
  ...readFileList,
  ...editFile
}