//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 调用云函数
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'sign',
      data: {

      },
      success: res => {
        // 将sign值存到globalData
        console.log(res);
        this.globalData.sign = res.result.sign
      }
    })
    this.globalData = {
      sign: null
    }
  }
})
