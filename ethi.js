/*
ETHI

cron "0/35 * * * * *" script-path= ethi.js,tag= ETHI
============Quantumultx===============
[task_local]
#
*/

const axios = require('axios');
const dayjs = require("dayjs");
const notify = require('./notify')

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
      });
      let filterList = list.filter(x => {
        return x.unitPrice < 0.45
      });
      if (filterList.length > 0) {
        let now = dayjs().format('HH:mm:ss');
        let text = filterList.map(x => {
          let time = dayjs(x.created_at).format('HH:mm:ss')
          return `[${time}] ${x.unitPrice}，${x.amt}`
        }).join('\n');
        console.log('满足条件', text);
        // prod
        notify(`43115298698@chatroom`, ``, `温馨提醒(E) $${price} [${now}] \n${text}`);
        // dev
        // notify(`44206697810@chatroom`, ``, `温馨提醒 $${price} [${now}] \n${text}`);
      }
      console.log(list);
    }
  });
}

function main () {
  queryLastPrise().then((price) => {
    if (price > 0) {
      return queryList(price)
    }
  })
}

main()