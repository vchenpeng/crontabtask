const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');
const dayjs = require('dayjs');

let etherscanCfClearance = ``;
function queryEtherscan (prevTimestamp = 0) {
  let nextTimestamp = prevTimestamp;
  let url = `https://etherscan.io/txs?a=0x57b8792c775d34aa96092400983c3e112fcbc296&p=1`;
  return axios.get(url, {
    proxy: {
      host: '127.0.0.1',
      port: 7890
    },
    headers: {
      'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`,
      'Cookie': `ASP.NET_SessionId=zdvhjuxu0rdpq3uglj5cfdhw; __cflb=02DiuFnsSsHWYH8WqVXaqGvd6BSBaXQLUWdvNVkAZDxEQ; _ga=GA1.1.167143889.1703481205; etherscan_offset_datetime=+8; cf_clearance=AAVpvtfUufDcOjq73oIg.RgXGsG1JTWUOAubRNX97ok-1703481206-0-2-81635c56.8c333ef6.d66203b6-150.2.1703481206; _ga_T1JC9RNQXV=GS1.1.1703481205.1.1.1703481242.23.0.0`
    },
    timeout: 3000
  }).then(res => res.data).then(res => {
    const $ = cheerio.load(res);
    // 分类
    const list = $('#ContentPlaceHolder1_divTransactions .table tbody tr').map((i, elem) => {
      let hash = $(elem).find('td:nth-child(2) span a').text();
      let method = $(elem).find('td:nth-child(3) span').attr('title');
      let datetimeText = $(elem).find('td.showAge span').attr('data-bs-title');
      let datetimeDj = dayjs(datetimeText).add(8, 'hour');
      let datetime = datetimeDj.format('YYYY-MM-DD HH:mm:ss');
      let timestamp = datetimeDj.valueOf();
      let from = $(elem).find('td:nth-child(8) .js-clipboard').attr('data-clipboard-text').toLowerCase();
      let to = $(elem).find('td:nth-child(10) .js-clipboard').attr('data-clipboard-text').toLowerCase();
      let value = $(elem).find('td:nth-child(11) span').attr('data-bs-title');
      return {
        hash,
        from, to, method, datetime, timestamp,
        value: parseFloat(value)
      }
    }).toArray();
    let saleList = _.chain(list).filter(x => {
      return x.value === 0 && parseInt(x.method) > 0 && x.timestamp > prevTimestamp
    }).uniqBy(x => x.from).value();
    return saleList;
  }).then(list => {
    if (list.length > 0) {
      let first = _.first(list);
      nextTimestamp = first.timestamp;
      // let abc = saleList.filter(x => x.from === '0x74ec7f96ffc225f06f4e7c4cd7c219cf9616e84b');
      // if (abc.length > 0) {
      //   console.log('找到了', p, abc)
      // }
      console.log('发现新的挂单', dayjs().format('HH:mm:ss'), first);
      return list;
    } else {
      // console.log('暂无最新挂单');
      return [];
    }
  }).catch(err => {
    console.log(err.message);
    return [];
  }).finally(() => {
    queryHtml(nextTimestamp);
  })
}


function queryAddress (address) {
  let nextTimestamp = prevTimestamp;
  let url = `https://www.etch.market/api/markets/ethscriptions/address/${address}?show=AllEthscription&category=token&trait=&page.size=50&page.index=1`;
  return axios.get(url, {
    proxy: {
      host: '127.0.0.1',
      port: 7890
    },
    headers: {
      'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`,
      'Cookie': `ASP.NET_SessionId=zdvhjuxu0rdpq3uglj5cfdhw; __cflb=02DiuFnsSsHWYH8WqVXaqGvd6BSBaXQLUWdvNVkAZDxEQ; _ga=GA1.1.167143889.1703481205; etherscan_offset_datetime=+8; cf_clearance=AAVpvtfUufDcOjq73oIg.RgXGsG1JTWUOAubRNX97ok-1703481206-0-2-81635c56.8c333ef6.d66203b6-150.2.1703481206; _ga_T1JC9RNQXV=GS1.1.1703481205.1.1.1703481242.23.0.0`
    },
    timeout: 3000
  })
}


queryEtherscan();