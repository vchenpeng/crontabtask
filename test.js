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

async function main () {
  console.log('测试开始')
  // await queryIp()
  const wxCookie = `bid=95697369-2de7-453d-828b-e562b9950831; bidjs=c0d4b0c6-838a-4924-8211-17803e88aa70; wxuin=89232480206062; pgv_pvid=7611979038; pac_uid=0_63f80d47c9542; iip=0; _clck=3868746640|1|fee|0; pgv_info=ssid=s9005177808; verifysession=h015b9374edea312ca4bc75cb8188c947f7a9478b43e80c274037482db6aa2b396df3bcc7f835c3a83e; RK=0YWB+yQNYj; ptcz=b8e2cfe58d6b600452398c03f4a1b738f7584a4d62f1ebbc3a37e607612f4928; data_ticket=gScI5DbUXDRy984sH3HayIm2AAAAAAAAAAAAAAAAAAA=; sid=eFl4WGYzSURSZHBxODlqOTJ1YzBJNHdBaWdha09jX1lKcEhHYU5FMVpsMjM1RU5SVU1NZmZ1N3pfTnV4aUVkbzhEaElUYm1Bb05yTzZIV1ZscVJVMTBRV3ltd0xWRjVOR2VNWlhUV1FkamFEb2ExR3J3VWVCajBPc3JQNVlwbDh3dklqQ25mN05OUVN2SUQ0; user=wxid_n2u8tw0faupj12; openid=oCJUsw0yZGqGfygntxuAaxp8Mw4U; server_token=750950383; enterprise_openid=; forum_login_type=; forum_original_openid=; qq_domain_video_guid_verify=4c59295ae0d65139; tvfe_boss_uuid=7817b777df0dd0b0`;
  queryWxDeveloper(wxCookie);
  queryWxDeveloperIssuses(wxCookie);
  axios.get(`https://www.17917.cn`);
  axios.get(`https://www.buyid8.com`);
  console.log('测试结束')
}

main()