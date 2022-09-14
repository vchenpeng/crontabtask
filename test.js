const axios = require('axios');

axios.post('https://api.day.app/zuajomKPMyvheFWyMYv6yZ', {
  title: '你好',
  body: [
    `区域：sh`,
    `手机：haha`
  ].filter(x => !!x).join('\n'),
  sound: `paymentsuccess`
}).then(res => {
  console.log('res', res)
});
console.log('end')