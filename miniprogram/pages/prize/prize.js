// miniprogram/pages/prize/prize.js

const app = getApp();
// 1、找到数据库
const db = wx.cloud.database()
// 2、找到要操作的集合
const col = db.collection('col')
// 调用数据库方法，增删改查
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeDetail: [
      {
        img: '../../images/caoCode/mycard_icon_avpreice.png', // 安慰奖
        integral: 200 // 积分
      },
      {
        img: '../../images/caoCode/mycard_icon_onepreice.png', // 一等奖
        integral: 1000 // 积分
      },
      {
        img: '../../images/caoCode/mycard_icon_towpreice.png', // 二等奖
        integral: 700 // 积分
      },
      {
        img: '../../images/caoCode/mycard_icon_threepreice.png', // 三等奖
        integral: 400 // 积分
      }
    ],
    prizeIndex: 0,  // 获奖等级
    bindinputNameValue: '', // 名字
    bindinputNumberValue: '', // 手机号
    bindinputAddrValue: '', // 地址
  },
  bindinputName(e) {
    this.setData({
      bindinputNameValue: e.detail.value
    })
  },
  bindinputNumber(e) {
    this.setData({
      bindinputNumberValue: e.detail.value
    })
  },
  bindinputAddr(e) {
    this.setData({
      bindinputAddrValue: e.detail.value
    })
  },
  // 提交填写信息信息
  bindSubmitInfo() {
    const { bindinputNameValue,
            bindinputNumberValue,
            bindinputAddrValue,
            prizeIndex} = this.data;
    // 判断输入的用户信息是否为空
    if (bindinputNameValue == "" && bindinputNumberValue =="" && bindinputAddrValue=="") {
      wx.showToast({
        title: '您的填写的信息不能为空',
        icon: 'none',
        duration: 1500
      });
      return ;
    }
    // 跳转到detailPrize页面
    wx.navigateTo({
      url: `../detailPrize/detailPrize?prizeIndex=${prizeIndex}`,
    })
    col.where({
      "_openid": app.globalData.openid,
    })
    .get()
    .then( res => {
      console.log(res);
    })
    // 添加到数据库
    col.add({
      data: {
        bindinputNameValue: bindinputNameValue,
        bindinputNumberValue: bindinputNumberValue,
        bindinputAddrValue: bindinputAddrValue
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取到多少等奖的次数
    let prizeIndex = options.prize;
    console.log(prizeIndex);
    this.setData({
      prizeIndex: prizeIndex
    })
  },
})