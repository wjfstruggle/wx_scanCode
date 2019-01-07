// miniprogram/pages/scan/scan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  takePhoto() {
    wx.showLoading({
      title: '加载中',
    })
    // 1、拍下一张照片
    // this.getPhoto()
    // 将照片转为base64 
    this.getPhoto().then(path => {
      return this.readFile(path)
    }).then( (base64) => {
     // 提交到腾讯云
     return this.txApi(base64);
    }).then(res => {
      // 4、判断结果
      console.log(res);
      let items = res.data.data.items;
      // 遍历数组，查找邮字
      let hasYou = items.some( item => {
        return item.itemstring.indexOf('邮') > -1
      })    
      console.log('hasYou', hasYou); 
      hasYou = true
      // 判断是否有邮字 
      if (hasYou) {
        wx.showToast({
          title: '恭喜，有邮字',
          icon: 'success',
          duration: 2000
        })
        // 创建记录
        wx.cloud.callFunction({
          name: 'getYou',
          success: res => {
            console.log('getYou', res);           
          }
        })
      } else {
        wx.showToast({
          title: '没扫到邮字，请再试一遍',
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },
  // 扫邮函数
  getPhoto() {
    return new Promise( (resolve, reject) => {
      const ctx = wx.createCameraContext()  
      ctx.takePhoto({
        quality: 'high',  // 照片质量
          success: res => {
            // 返回图片的临时路径
            resolve( res.tempImagePath);
          },
          fail: err => {
            reject(err)
          }
      })
    })
  },
  // 图片转为base64
  readFile(path) {
    return new Promise((resolve, reject) => {
      // 获取文件系统管理对象
      const fs = wx.getFileSystemManager()
      fs.readFile({
        filePath: path,
        encoding: 'base64',
        success: res => {
          resolve(res.data);          
        },
        fail: err => {
          reject(err)
        }
      })
    })  
  },
  // 提交到腾讯云
  txApi(base64) {
    return new Promise((resolve, reject) => {
      wx.request({
        // 通用印刷体识别接口
        url: 'https://recognition.image.myqcloud.com/ocr/general',
        header: {
          'host': 'recognition.image.myqcloud.com',
          'content-type': 'application/json', // 默认值
          'authorization': app.globalData.sign  // 云函数sign返回值
        },
        method: "POST",
        data: {
          appid: '1258450045',
          image: base64
        },
        success: res => {
          resolve(res);          
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})