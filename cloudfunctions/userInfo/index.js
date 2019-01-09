// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 1、找到数据库
const db = cloud.database()
// 2、找到要操作的集合
const col = db.collection('col')
// 调用数据库方法，增删改查
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  
  await col.where({
    '_openid': wxContext.OPENID,
  }).get()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}