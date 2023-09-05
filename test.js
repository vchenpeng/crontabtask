/*
自己测试一下

cron "0/35 * * * * *" script-path= test.js,tag= 临时测试
 */

const axios = require('axios');
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

function tokenWxDeveloper (token) {
  axios.get(`https://developers.weixin.qq.com/community/ngi/mixflow/list?page=1&tag=&openid=oCJUsw0yZGqGfygntxuAaxp8Mw4U&blocktype=1&minihome=&random=0.4904167769408516&token=${token}`).then(res => {
    console.log(res.data);
    return res.data;
  });
}

async function main () {
  console.log('测试开始')
  // await queryIp()
  tokenWxDeveloper('750950383');
  axios.get(`https://www.17917.cn`);
  axios.get(`https://www.buyid8.com`);
  console.log('测试结束')
}

main()