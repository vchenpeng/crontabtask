/*
自己测试一下

cron "0/35 * * * * *" script-path= ethi.js,tag= 临时测试
============Quantumultx===============
[task_local]
#
*/

const axios = require('axios');
const CryptoJS = require('crypto-js');
const qs = require("qs");
const dayjs = require("dayjs");

function queryLastPrise () {
  return axios.get(`https://service.ierc20.com/api/v1/price/eth`).then(res => {
    return res.data;
  }).then((res) => {
    let { code, data } = res
    if (code == 1) {
      return data
    } else {
      return null
    }
  }).catch(() => {
    return null;
  });
}
function queryList (price) {
  console.log('单价', price)
  let json = {
    "endTime": 0, "limit": 10, "minValue": "0.005", "offset": 0, "status": "list", "tick": "ethi"
  }
  axios.post(`https://service.ierc20.com/api/v1/order/list`, json).then(res => {
    return res.data;
  }).then((res) => {
    let { code, data } = res
    if (code == 1) {
      let orders = data.orders || [];
      let list = orders.map(x => {
        let unitPrice = (Number(x.value) / Number(x.amt)) * price;
        return {
          ...x,
          unitPrice
        }
      }).filter(x => {
        return x.unitPrice < 0.45
      });
      if (list.length > 0) {
        let now = dayjs().format('HH:mm:ss');
        let text = list.map(x => {
          let time = dayjs(x.created_at).format('HH:mm:ss')
          return `[${time}] ${x.unitPrice}，${x.amt}`
        }).join('\n');
        console.log('满足条件', text);
        notify(`43115298698@chatroom`, ``, `温馨提醒 $${price} [${now}] \n${text}`);
      }
      console.log(orders);
    }
  });
}

async function notify (fromUser, fromGroup, text, wxids = '') {
  let url, body
  if (fromGroup) {
    if (fromGroup === fromUser) {
      url = `http://101.35.25.221:19088/api/?type=2`
      body = { "wxid": fromUser, "msg": text }
    } else {
      url = `http://101.35.25.221:19088/api/?type=3`
      // notify@all
      body = { "chatRoomId": fromGroup, "msg": `${text}`, "wxids": 'notify@all' }
    }
  } else {
    url = `http://101.35.25.221:19088/api/?type=2`
    body = { "wxid": fromUser, "msg": text }
  }
  return axios({
    url: url,
    method: 'POST',
    data: body,
    headers: {
      'content-type': 'application/json, text/plain, */*',
    }
  }).then((res) => { }).catch((err) => { })
}

function main () {
  queryLastPrise().then((price) => {
    if (price > 0) {
      return queryList(price)
    }
  })
}

main()