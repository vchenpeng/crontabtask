const axios = require('axios');

module.exports = function (fromUser, fromGroup, text, wxids = '') {
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