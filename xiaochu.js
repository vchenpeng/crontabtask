/*
自己测试一下

cron "0/35 * * * * *" script-path= test.js,tag= 临时测试
============Quantumultx===============
[task_local]
#购印权益
*/

const axios = require('axios');
const CryptoJS = require('crypto-js');
const qs = require("qs");


const HOST = 'http://1.uy7.cn'
const USER_ID = process.env.GOUYIN_USER_ID;
const USER_KEY = process.env.GOUYIN_USER_KEY;
const GOODS_TYPE_MAP = {
  1: '【自动充值】腾讯视频',
  2: '爱奇艺',
  3: '知乎'
}

function genSign (params) {
  let jsArr = [];
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (!['', 'sign'].includes(params)) {
        jsArr.push(`${key}=${value}`)
      }
    }
  }
  const jsStr = jsArr.sort().join('&') + USER_KEY;
  const signature = CryptoJS.MD5(jsStr).toString();
  return signature;
}

async function queryBalance () {
  let json = {
    userid: USER_ID
  }
  let sign = genSign(json);
  axios.post(`${HOST}/dockapi/index/userinfo`, qs.stringify({
    ...json,
    sign
  })).then(res => {
    console.log('账户余额', res.data);
    return res.data;
  });
}
async function main () {
  queryBalance()
  queryGoodsList(1)
}

