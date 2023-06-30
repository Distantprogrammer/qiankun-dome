const fs = require('fs');
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

/** 扩展名白名单 */
const whiteExt = ['.html', '.json', '.html', '.js'];
/** 忽略文件夹 */
const ignoreFolder = ['.svn', '.project'];

/** 根目录 */
const folderPath = './'; // 必须是/结尾的路径

// 记录运行耗时
let startTime = undefined,
  endTime = undefined;

// 输出个检测日志方便查看
var logPath = folderPath + 'search.log';
var logFile = fs.createWriteStream(logPath, { flags: 'w' }); // flags: w 代表从头开始写即覆盖原有的， a 代表从末尾开始，接着原有的写

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  process.stdout.write(util.format.apply(null, arguments) + '\n');
}

// 1、__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// 2、__filename: 总是返回被执行的 js 的绝对路径
// 3、process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
// 4、path.resolve('./')：方法会把一个路径或路径片段的序列解析为一个绝对路径。
// 4、path.join('./')：如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
function logRes () {
  console.log(__dirname);
  console.log(__filename);
  console.log(process.cwd());
  console.log(path.resolve('./'));
  console.log(path.join('./'));
}
// logRes()

/**
 * 递归生成文件列表 筛选白名单类型文件
 * @param {*} src
 * @param {*} filesList
 */
function readFileList (src, filesList) {
  let files = fs.readdirSync(src);
  files.forEach(function (item, index) {
    if (ignoreFolder.includes(item)) return;
    let stat = fs.statSync(src + item);
    if (stat.isDirectory()) {
      console.log('文件夹：' + src + item);
      //递归读取文件
      readFileList(src + item + "\\", filesList)
    } else {
      if (whiteExt.includes(path.extname(src + item))) {
        console.log('白名单文件，路径为：' + src + item);
        filesList.push(src + item);
      }
    }

  })
}

/**
 * 获取文件目录
 * @param {*} src 目录地址
 */
function getFilesList (src) {
  console.log('开始整理文件路径~');
  startTime = new Date()
  let FilesList = [];
  readFileList(src, FilesList);
  console.log('文件路径列表生成结束！');
  return buildTree(FilesList)
  return FilesList;
}

/**
 * 处理数据
 * @param {String} paths 目录地址
 */
function buildTree(paths) {
  const tree = [];

  for (let path of paths) {
    const segments = path.split('\\');
    let currentNode = tree;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const existingNode = currentNode.find(node => node.label === segment);

      if (existingNode) {
        currentNode = existingNode.children;
      } else {
        const newNode = {
          label: segment,
          children: [],
          id: uuidv4()
        };
        currentNode.push(newNode);
        currentNode = newNode.children;
      }
    }
  }

  return tree; // [{label: 'B:',children: [ [Object] ],id: 'da278ffd-fce4-4ac0-a152-394bf6a411ee'}]
}

exports.getFilesList = getFilesList
//#region 
// function buildTree(paths) {
//   const tree = {};

//   for (let path of paths) {
//     const segments = path.split('\\');
//     let currentNode = tree;

//     for (let i = 0; i < segments.length; i++) {
//       const segment = segments[i];
//       if (!currentNode[segment]) {
//         currentNode[segment] = {};
//       }
//       if (i==segments.length-1) {
//         currentNode[segment] = null
//       }
//       currentNode = currentNode[segment];
//     }
//   }

//   return tree; // B:{tag:{aa:{bb:{}}}}
// }
//#endregion

// getFilesList(__dirname+'\\')

// console.log(getFilesList(__dirname+'\\'));

