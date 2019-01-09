// 创建和更新记录
// 1、以openid为用户id来添加更新删除数据（更改同一条数据）
// 2、包含所有的邮卡，更新时间、随机奖品。

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 创建数据库
// 1、找到数据库
const db = cloud.database()
// 2、找到要操作的集合
const col = db.collection('col')
// 调用数据库方法，增删改查
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 查询该用户在数据库中的记录
  let user = await col.where({
    '_openid': wxContext.OPENID,
  }).get()
  let type;
    // 随机邮字
    let rand = Math.random();
    switch (true) {
      case (rand < 0.2):
        type= 0;
        break;
      case ( 0.2 <= rand && rand < 0.4):
        type= 1;
        break;
      case (0.4 <= rand && rand < 0.6):
        type= 2;
        break;
      case (0.6 <= rand && rand < 0.8):
        type= 3;
        break;
      case (rand >= 0.8):
        type= 4;
        break;
    }
  // 用户记录为0，代表第一次使用，使用add操作。
  if (user.data.length == 0) {
    let words = [
      {
        name: '三齐邮',type: 0,number: 0
      },
      {
        name: '欢乐邮',type: 1,number: 0
      },
      {
        name: '畅快邮',type: 2,number: 0
      },
      {
        name: '悦享邮',type: 3,number: 0
      },
      {
        name: '邮惠生活',type: 4,number: 0
      } 
    ]
    // 控制随机数+1
    words[type].number += 1;
    let data = {
      '_openid': wxContext.OPENID,
      'words': words,
      prize: null,  // 奖品
      updateTime: '', // 每天更新时间
      times: 1  // 次数
    }
    // 增,添加数据库操作
    let result = await col.add({
      data: data
    })
    return {
      msg: '添加成功',
      result: result
    }
  } else {
    // 除了第一次外，都是更新操作。
    user = user.data[0]
    // 判断使用次数
    if (user.times <= 0 && user.updateTime == getDay()) {
      return {
        msg: '今天的次数已经用完，明天继续',
        success: false
      }
    }
    // times代表剩余次数，在第二天时重置
    let times;
    if (user.updateTime !== getDay()) {
      times = 1
    }
    // 增加一个
    user.words[type].number += 1;
    let result = col.where({
      '_openid':wxContext.OPENID,
      // 更新值
    }).update({
      data: {
        'words': user.words,
        'times':times ||  _.inc(-1), // 可用次数减一
        'updateTime': getDay()
      }
    })
    return {
      msg: '修改成功',
      result: result
    }
  }
}
function getDay() {
  let date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}