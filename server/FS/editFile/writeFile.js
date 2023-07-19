const fs = require('fs');

/**
 * 
 * @param {*} filePath // 文件地址
 * @param {*} data // 文本信息
 * @returns 
 */
function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 
 * @param {*} folderPath 文件地址
 * @returns 
 * { recursive: true }选项意味着如果上级目录不存在，也会一并创建。如果你只想创建单个文件夹，可以省略该选项
 */

function createFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folderPath, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

exports.writeFile = writeFile
exports.createFolder = createFolder