const fs = require('fs');

/**
 * @param {*} filePath // 文件地址 
 * @returns // 文件内容
 */
function readFile(filePath) {
 return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  })
}

exports.readFile = readFile