const readFile = require('./readFile').readFile
const unlink = require('./deleteFile').unlink
const deleteFolder = require('./deleteFile').deleteFolder
const writeFile = require('./writeFile').writeFile
const createFolder = require('./writeFile').createFolder

module.exports = {
  readFile,
  writeFile,
  unlink,
  deleteFolder,
  createFolder
}