/*
自己测试一下

cron "0/10 * * * * *" script-path= yiyuan.js,tag= 医院挂号检测
 */

const axios = require('axios');
const dayjs = require('dayjs');
const notify = require('./notify');
const _ = require('lodash');

const YIYUAN_TOKEN = process.env.YIYUAN_TOKEN;
const beginDate = dayjs('2024-04-01');
const sendMsg = _.throttle(notify, 30 * 60 * 1000, {
  'leading': true,
  'trailing': false
});
function queryList () {
  // const body = `apiParam=%7B%22Req%22%3A%7B%22Data%22%3A%7B%22HosId%22%3A%224200190004%22%2C%22DeptCode%22%3A%220060104%22%2C%22ParentDeptCode%22%3A%220060102%22%2C%22DoctorCode%22%3A%224628131551458%22%2C%22WorkDateStart%22%3A%222024-04-29%22%2C%22WorkDateEnd%22%3A%222024-05-05%22%2C%22HasIntro%22%3A%221%22%7D%2C%22TransactionCode%22%3A2007%7D%7D`;
  const body = `apiParam=%7B%22Req%22%3A%7B%22Data%22%3A%7B%22HosId%22%3A%224200190004%22%2C%22DeptCode%22%3A%220060104%22%2C%22ParentDeptCode%22%3A%220060102%22%2C%22DoctorCode%22%3A%223458251550547%22%2C%22WorkDateStart%22%3A%222024-04-29%22%2C%22WorkDateEnd%22%3A%222024-05-05%22%2C%22HasIntro%22%3A%221%22%7D%2C%22TransactionCode%22%3A2007%7D%7D`;
  return axios.post(`https://yyzz.zgwhfe.com/KasiteWeb/wsgw/yy/QueryClinicScheduleList/callApi.do?t=${+new Date()}`,
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'token': YIYUAN_TOKEN
      }
    }).then(res => {
      let { RespCode, Data } = res.data;
      if (RespCode === '10000') {
        let list = Data.map(x => {
          let DiyJson = JSON.parse(x.DiyJson);
          let partTime = DiyJson.partTime.split(',').map(x => {
            let texts = x.split('|||||');
            return {
              time: texts[0],
              count: texts[3]
            }
          }).filter(x => x.time && x.count > 0)
          return {
            Title: x.Title,
            DoctorName: x.DoctorName,
            TimeSliceStr: x.TimeSliceStr,
            WeekName: x.WeekName,
            LeaveCount: x.LeaveCount,
            RegDate: x.RegDate,
            TotalFee: x.TotalFee / 100,
            partTime: partTime
          }
        }).filter(x => x.LeaveCount > 0 && dayjs(x.RegDate).diff(beginDate) >= 0);
        console.log('结果', JSON.stringify(list));
        if (list.length > 0) {
          let first = list[0];
          let times = first.partTime.map(x => `${x.time}(余号:${x.count})`).join('\n')
          let msg = `${first.DoctorName}医生在${first.RegDate}${first.TimeSliceStr}有${first.LeaveCount}个可预约号源\n\n${times}\n\n挂号费:${first.TotalFee}`;
          console.log(msg);
          sendMsg('45917290774@chatroom', '', msg);
        } else {
          console.log('暂无预约号源', Data);
        }
      } else {
        console.log(res.data);
      }
      return res.data;
    }).catch(err => {
      console.log('error', err.message);
    });
}

async function main () {
  console.log('查询开始');
  await queryList();
  console.log('查询结束');
}

main()