const fs = require('fs');
const path = require('path');
const util = require('util');

/** 扩展名白名单 */
const whiteExt = ['.shtml', '.json', '.html', '.js'];
/** 忽略文件夹 */
const ignoreFolder = ['.svn', '.project'];

/** 根目录 */
const folderPath = './'; // 必须是/结尾的路径
/** 关键词列表 */
const keywordList = ['关键词1', '关键词2'];


// 记录运行耗时
let startTime = undefined,
    endTime = undefined;

// 输出个检测日志方便查看
var logPath = folderPath + 'search.log';
var logFile = fs.createWriteStream(logPath, { flags: 'w' }); // flags: w 代表从头开始写即覆盖原有的， a 代表从末尾开始，接着原有的写

console.log = function() {
    logFile.write(util.format.apply(null, arguments) +'\n');
    process.stdout.write(util.format.apply(null, arguments) + '\n');
}

/**
 * 递归生成文件列表 筛选白名单类型文件
 * @param {*} src
 * @param {*} filesList
 */
function readFileList(src, filesList) {
    let files = fs.readdirSync(src);
    files.forEach(function (item, index) {
        if (ignoreFolder.includes(item)) return;
        let stat = fs.statSync(src + item);
        if (stat.isDirectory()) {
            console.log('检测到文件夹：' + src + item);
            //递归读取文件
            readFileList(src + item + "/", filesList)
        } else {
            if (whiteExt.includes(path.extname(src + item))) {
                console.log('检测到白名单文件，路径为：' + src + item);
                filesList.push(src + item);
            }
        }

    })
}

const search = {
    getFilesList(src) {
        console.log('开始整理文件路径~');
        startTime = new Date()
        let FilesList = [];
        readFileList(src, FilesList);
        console.log('文件路径列表生成结束！');
        return FilesList;
    },
    /**
     * 搜索关键字
     * @param {String} src 路径
     * @param {Array} keyword 关键字列表数组
     * @returns {Array} 筛选出来的数组
     */
    searchKeyword(src, keyword) {
        let FilesList = this.getFilesList(src);
        console.log('开始搜索关键字~');
        let newList = [];
        newList = FilesList.filter(x => {
            const content = fs.readFileSync(x, 'utf-8');

            for (let i = 0; i < keyword.length; i++) {
                console.log(x + '搜索结果：' + (content.indexOf(keyword[i]) !== -1 ? ('存在：' + keyword[i]) : '无'));
                return content.indexOf(keyword[i]) !== -1;
            }
        })
        return newList.length ? newList.join('\n') : '未搜索到包含关键词的文件';
    },
    /**
     * 写入结果
     * @param {*} src 路径
     * @param {*} text 内容
     */
    outputLog(src, text) {
        fs.writeFile(src, text, err => {
            endTime = new Date()
            if (err) {
                console.error(err)
                return
            }
            //文件写入成功。
            console.log('搜索结束，结果已写入' + src + '\n检测耗时：' + ((endTime - startTime) / 1000) + '秒');
        })
    }
}
const searchResult = search.searchKeyword(folderPath, keywordList);
search.outputLog(folderPath + 'searchResult.txt', searchResult)

