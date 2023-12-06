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

async function queryList () {
  let json = {
    "endTime": 0, "limit": 10, "minValue": "0.005", "offset": 0, "status": "list", "tick": "ethi"
  }
  axios.post(`https://service.ierc20.com/api/v1/order/list`, json).then(res => {
    return res.data;
  }).then((res) => {
    console.log(res)
  });
}

async function main () {
  queryList();
}

main()