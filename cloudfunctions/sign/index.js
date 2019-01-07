// 云函数入口文件
const cloud = require('wx-server-sdk');
// 腾讯云OCR授权签名
var crypto = require('crypto');

cloud.init()

// Node JS 签名示例
var secretId = 'AKID2jDf3EN06zdmspQGaq98xYp0wWXILyve',
  secretKey = 'lIbrrc7OQEpYJYYLZYImBPQcBYk6B3h6',
  appid = '1258450045',
  pexpired = 86400,
  userid = 0;

var now = parseInt(Date.now() / 1000),
  rdm = parseInt(Math.random() * Math.pow(2, 32)),
  plainText = 'a=' + appid + '&k=' + secretId + '&e=' + (now + pexpired) + '&t=' + now + '&r=' + rdm + userid + '&f=',
  data = new Buffer(plainText, 'utf8'),
  res = crypto.createHmac('sha1', secretKey).update(data).digest(),
  bin = Buffer.concat([res, data]);

var sign = bin.toString('base64');


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 返回要用的鉴权签名
  return {
    sign
  }
}