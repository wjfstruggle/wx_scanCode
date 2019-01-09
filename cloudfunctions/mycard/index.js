// 查找我的邮卡
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

// 1、找到数据库
const db = cloud.database()
// 2、找到要操作的集合
const col = db.collection('col')
// 调用数据库方法，增删改查
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 查找我的邮卡

  let user = await col.where({
    '_openid': wxContext.OPENID,
  }).get()
  user = user.data[0]

  if (user.prize !== null) {
    return {
      msg: '你已经抽过奖了',
      success: false
    }
  }
  let rand = Math.random();
  let prize;

  switch (true) {
    case (rand < 0.2):
      prize= 0; //无奖
      break;
    case ( 0.2 <= rand && rand < 0.3):
      prize= 1; // 一等奖
      break;
    case (0.3 <= rand && rand < 0.6):
      prize= 2; // 二等奖
      break;
    case (rand >= 0.6):
      prize= 3;  // 三等奖
      break;
  }
  let zero = event.selectedArr[0]
  let one = event.selectedArr[1]
  user.words[zero].number -= 1;
  user.words[one].number -= 1;
  // 合成完毕，邮卡数量减1，重新更新数据
  await col.where({
    '_openid': wxContext.OPENID,
  }).update({
      data: {
        prize: prize,
        words: user.words
      }
  })
  return {
    prize: prize,
    success: true,
    words: user.words
  }
}