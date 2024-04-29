/*
自己测试一下

cron "0/35 * * * * *" script-path= test.js,tag= 临时测试
 */

const axios = require('axios');
// const querystring = require("querystring");
// const $ = new Env('TEST');

async function queryIp () {
  await axios.get(`http://www.cip.cc`).then(res => {
    console.log(res.data);
    return res.data;
  });
}

function getUserInfo () {
  // const cookie = 'pt_key=AAJjKeAhADCE0s-rl0lvGiBxei3JJGm6dRI5-7dBmerMR4YpAsP7kXrFAtVqiMrlP8VoMU5Q-fg;pt_pin=sha1249075595;'
  const cookie = 'pt_key=AAJjNq3IADASSu6Q3bYedB9ITjedpBkfYLSikvCrH9SfMwGGRZMf3np_yvw9DrIeUiVEvmWmyP0;pt_pin=vchenpeng;';
  const options = {
    "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
    "headers": {
      "Accept": "application/json,text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
      "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
    }
  }
  return $.post(options, async (err, resp, data) => {
    try {
      console.log(data)
      if (err) {
        console.log(`${JSON.stringify(err)}`)
        console.log(`${$.name} API请求失败，请检查网路重试`)
      } else {
        if (data) {
          data = JSON.parse(data);
          if (data['retcode'] === 0 && data.base?.nickname) {
            $.nickName = data.base.nickname;
            console.log('等待3s')
            await $.wait(3000)
          }
          $.msg($.nickName)
          return Promise.resolve(true)
        } else {
          console.log(`京东服务器返回空数据`)
        }
      }
    } catch (e) {
      $.logErr(e)
    } finally {

    }
  })
}

function queryWxDeveloper (cookie) {
  axios.get(`https://developers.weixin.qq.com/community/ngi/getuserinfo?random=0.3737509808948889`, {
    headers: {
      cookie: cookie
    }
  }).then(res => {
    console.log(res.data);
    return res.data;
  });
}

function queryWxDeveloperIssuses (cookie) {
  axios.get(`https://developers.weixin.qq.com/community/ngi/mixflow/list?page=1&tag=&openid=oCJUsw0yZGqGfygntxuAaxp8Mw4U&blocktype=1&minihome=&random=0.4904167769408516`, {
    headers: {
      cookie: cookie
    }
  }).then(res => {
    console.log(res.data);
    return res.data;
  });
}

function reportWxDeveloper (cookie) {
  const body = `url=https%253A%252F%252Fdevelopers.weixin.qq.com%252Fcommunity%252Fdevelop%252Farticle%253Fid%253D&useragent=Mozilla%252F5.0%2520%28Macintosh%253B%2520Intel%2520Mac%2520OS%2520X%252010_15_7%29%2520AppleWebKit%252F537.36%2520%28KHTML%252C%2520like%2520Gecko%29%2520Chrome%252F115.0.0.0%2520Safari%252F537.36&referrer=https%253A%252F%252Fdevelopers.weixin.qq.com%252Fcommunity%252Fdevelop%252Fquestion%253Fid%253D&mmdata=%5B%5B17313%2C0%5D%5D&monitor=%5B%5B%22112678%22%2C59%5D%2C%5B%22119204%22%2C0%5D%5D`;
  axios.post(`https://developers.weixin.qq.com/community/ngi/batchreport?nosw=1`,
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: cookie,
        referer: 'https://developers.weixin.qq.com/community/develop/mixflow?id=',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    }).then(res => {
      console.log('上报微信开发者社区日志', res.data);
      return res.data;
    });
}

async function main () {
  console.log('测试开始')
  // await queryIp()
  const wxCookie = process.env['WeChat_Open_Community_Cookie'];
  reportWxDeveloper();
  queryWxDeveloper(wxCookie);
  queryWxDeveloperIssuses(wxCookie);
  axios.get(`https://www.17917.cn`);
  axios.get(`https://www.buyid8.com`);
  console.log('测试结束')
}

main()