// miniprogram/pages/mycard/mycard.js
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
    words: [],
    selected: 0 // 选中次数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    col.where({
      "_openid": app.globalData.openid,
    })
    .get()
    .then( res => {
      // 先判断有无data数据
      if (res.data.length > 0) {
        let words = res.data[0].words
        this.setData({
          words: words
        })
      } 
    })
  },
  select(e) {
    let index = e.currentTarget.dataset.index; // 获取index下标
    let { words, selected } = this.data;
    // 限制用户必须用这个字 number ！= 0
    if (words[index].unmber == 0) {
      return ;
    }
    // 已选中2个，选第三个时阻止
    // 如果已选中两个，但点击的是已选中的话，不进入判断
    if (selected >= 2 && !words[index].check) {
      return ;
    }
    if (!words[index].check) {
      // 未选择
      words[index].check = true;
      selected ++
    } else {
      words[index].check = false;
      selected --
    }
    // 最终结果设置
    this.setData({
      words: words,
      selected: selected
    })
  },
  // 合成
  merge() {
    let { words, selected } = this.data;
    if (selected < 2) {
      wx.showToast({
        title: '必须选择两个邮卡进行合成',
        icon: 'none',
        duration: 1500
      });
      return ;
    }
    let selectedArr = [] // 存放用户选择的下标
    words.forEach((item,index) => {
      if (item.check == true) {
        selectedArr.push(index)
      }
    });
    wx.cloud.callFunction({
      name: 'mycard',
      data: {
        selectedArr: selectedArr
      },
      success: res => {
        console.log(res);
        if(res.result.success) {
          let prize = res.result.prize;
          wx.showToast({
            title: `恭喜你获得${prize}等奖`,
            icon: 'success',
            duration: 1500,
          });
          // 中奖界面
          setTimeout(() => {
            wx.navigateTo({
              url: `../prize/prize?prize=${prize}`
            });
          }, 1500)
          this.setData({
            words : res.result.words
          })
        } else {
          wx.showToast({
            title: res.result.msg,
            icon: 'none',
            duration: 1500
          });
        }
      }
    })
  }
})