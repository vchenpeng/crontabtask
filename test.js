/*
自己测试一下

cron "0/35 * * * * *" script-path= test.js,tag= 临时测试
 */

const axios = require('axios');

axios.get(`https://www.17917.cn`);
axios.get(`https://www.wyids.com/pay/p/test`);

console.log('end')