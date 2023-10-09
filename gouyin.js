/*
自己测试一下

cron "0/35 * * * * *" script-path= test.js,tag= 临时测试
============Quantumultx===============
[task_local]
#购印权益
*/

const axios = require('axios');
const CryptoJS = require('crypto-js');
const querystring = require("querystring");


const HOST = 'http://1.uy7.cn'
const USER_ID = process.GOUYIN_USER_ID;
const USER_KEY = process.GOUYIN_USER_KEY;

function genSign (params) {
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (!['', 'sign'].includes(params)) {
        jsArr.push(`${key}=${value}`)
      }
    }
  }
  const jsStr = jsArr.sort().join('&') + USER_KEY;
  const signature = CryptoJS.MD5(jsStr);
  return signature;
}

async function queryGoodsList () {
  // userid=30774&page=1&limit=10&goodsname=2&sign=1b8e93828ecb570523e9c3adcc64a200
  let json = {
    userid: USER_ID,
    page: 1,
    limit: 10,
    goodsname: ''
  }
  let sign = genSign(json);
  console.log('gouyin', json, sign);
  axios.post(`${HOST}/dockapi/v2/getallgoods`, querystring({
    ...json,
    sign
  })).then(res => {
    console.log('商品列表', res.data);
    return res.data;
  });
}

async function main () {
  console.log('测试开始')
  queryGoodsList()
  console.log('测试结束')
}

main()