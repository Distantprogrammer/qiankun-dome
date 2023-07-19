const fs = require('fs');
const path = require('path');

/**
 * 删除文件
 * @param {*} filePath // 文件地址
 * @returns 
 */
function unlink(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 删除文件夹
 * @param {*} filePath 
 * @returns 
 */

function deleteFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (error, files) => {
      if (error) {
        reject(error);
        return;
      }
      // 删除文件夹中的文件和文件夹
      const deletePromises = files.map((file) => {
        const filePath = path.join(folderPath, file);
        return fs.promises.lstat(filePath).then((stats) => {
          if (stats.isDirectory()) {
            return deleteFolder(filePath);
          } else {
            return fs.promises.unlink(filePath);
          }
        });
      });

      Promise.all(deletePromises)
        .then(() => {
          // 删除空文件夹
          fs.rmdir(folderPath, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        })
        .catch(reject);
    });
  });
}

exports.unlink = unlink
exports.deleteFolder = deleteFolder