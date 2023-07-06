import { ElMessage  } from 'element-plus';
let baseUrl = "http://127.0.0.1:4200/api";

const request = (url,config,query) => {
  let queryUrl = url
  queryUrl = baseUrl + url
  if (config.method == 'GET') {
      // 将数据拼接到url
      queryUrl = baseUrl + url+ queryParse(query);
  }
  return fetch(queryUrl, config).then((res) => {
    if (!res.ok) {
      // 服务器异常返回
      throw Error('');
    }

    return res.json();
  }).then((resJson) => {
    if (resJson.status !==0) {
      // 项目内部认为的错误
      throw Error('');
    } else {
      return resJson;
    }
  }).catch((error) => {
    // 公共错误处理
    ElMessage.error('内部错误，请重新登录');
  });
};

// GET请求
 const get = (url,query) => {
  return request(url, {method: 'GET'},query);
};

// POST请求
const post = (url, data) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  });
};

// 解析query数据
function queryParse(query){
  if (!query) {
    return ''
  }
  let queryText = "";
  for(let key in query){
      queryText += `${key}=${query[key]}&`;
  }
  return "?" + queryText.slice(0,-1);
}
export default {
  get,
  post
}