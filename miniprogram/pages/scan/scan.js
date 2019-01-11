// miniprogram/pages/scan/scan.js

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

  },
  takePhoto() {
		//获取数据，今天次数的判断，看次数是否用完
		wx.cloud.callFunction({
			name:"getYou",
			success:(res)=>{
				if(res.result.user.times<=0 && res.result.user.updateTime==this.getDay()){	//当天次数完
					wx.showToast({
						title:"今天次数已用完，请明天再继续",
						icon:"none",
						duration:1500
					})
					return;
				}else{
					wx.showToast({
						title: "识别中...",
						icon: "loading"
					})
					//1.拍照
					this.getphoto().then((path) => {
						//2.将照片转为base64的方式提交
						return this.readFile(path).then((base64) => {
							//3.提交到腾讯云
							return this.txApi(base64)
						}).then((res) => {
							//4.处理结果
              console.log(res.data.data)
							return this.getScanResult(res)
						}).then((res) => {
							if (res) {
								wx.showToast({
									title:"已扫到邮",
									icon:"success",
									duration:1000
								})
								setTimeout(()=>{
						             // 跳转
									wx.navigateTo({
										url:"../result/result"
									})
						        },1000);   
							} else {
								// 提示没扫到
								wx.showToast({
									title: "没扫到,请再试一遍~",
									icon: "none",
									duration: 1500
								})
							}
						})
					})
				}
			}
		})
	},

	//获取图片
	getphoto() {
		return new Promise((reslove, reject) => {
			const ctx = wx.createCameraContext()
			ctx.takePhoto({
				quality: 'high',
				success: (res) => {
					//返回图片的临时路径
					reslove(res.tempImagePath)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	},

	//读取文件（将图片转为base64）
	readFile(path) {
		return new Promise((reslove, reject) => {
			const fs = wx.getFileSystemManager();
			fs.readFile({
				filePath: path,
				encoding: "base64",
				success: (res) => {
					reslove(res.data)
				},
				fail: (err) => {
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
          'authorization': app.globalData.sign // 云函数sign返回值
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
  	//返回扫描到的结果
	getScanResult(res) {
		return new Promise((reslove) => {
			res.data.data.items.forEach((item) => {
				if (item.itemstring.indexOf("邮") != -1) {
					return reslove(true)
				}
			})
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!记得改回来
			return reslove(false)
		})
	},
  getDay() {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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