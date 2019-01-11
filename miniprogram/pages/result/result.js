// miniprogram/pages/result/result.js
Page({
  data: {
    index:null	,//邮卡下标
    detailResultInfo: [
      {
        // 邮学贷
        img1: '../../images/caoCode/youxuedai_icon_youxuedai.png',
        img2: '../../images/caoCode/youxuedai_icon_content.png',
        img3: 'http://edu.bluej.cn/public/uploads/20190111/20190111120054youxuedai_icon_earth.png',
        product_detail: {
          text1: '无抵押，纯信用，线上申请，操作简单',
          text2: '最高可贷8000元，',
          text3: '贷款期限最长12个月',
        }
      },
      {
        // 邮薪贷
        img1: '../../images/caoCode/youxin_icon_youxin.png',
        img2: '../../images/caoCode/youxin_icon_content.png',
        img3: 'http://edu.bluej.cn/public/uploads/20190111/20190111120054youxin_icon_building.png',
        product_detail: {
          text1: '无抵押，纯信用，全程线上办理，10分钟到账',
          text2: '每月逢“8”申请，即8、18、28号，',
          text3: '年利率低至5.65%',
        }
      },
      {
        // 邮家贷
        img1: '../../images/caoCode/youjia_icon_youjia.png',
        img2: '../../images/caoCode/youjia_icon_content.png',
        img3: 'http://edu.bluej.cn/public/uploads/20190111/20190111120056youjia_icon_building.png',
        product_detail: {
          text1: '为我行存量房贷客户定制，无抵押，纯信用',
          text2: '主动授信，全程线上办理，最快10分钟到账',
          text3: '随借随还，按日计息，提前还款无罚息',
        }
      },
      {
        // 邮掌柜
        img1: '../../images/caoCode/youzhang_icon_youzhang.png',
        img2: '../../images/caoCode/youzhang_icon_content.png',
        img3: 'http://edu.bluej.cn/public/uploads/20190111/20190111120054youzhang_icon_building.png',
        product_detail: {
          text1: '无抵押，无担保，只需营业执照',
          text2: '全程线上办理，最快30分钟完成审批',
          text3: '按日计息，1万1天只需2.3元，',
        }
      },
      {
        // 邮掌柜
        img1: '../../images/caoCode/youzhang_icon_youzhang.png',
        img2: '../../images/caoCode/youzhang_icon_content.png',
        img3: 'http://edu.bluej.cn/public/uploads/20190111/20190111120054youzhang_icon_building.png',
        product_detail: {
          text1: '无抵押，无担保，只需营业执照',
          text2: '全程线上办理，最快30分钟完成审批',
          text3: '按日计息，1万1天只需2.3元，',
        }
      }
    ]
  },
  onLoad: function() {
    wx.cloud.callFunction({
      name: 'getYou',
      success: res => {
        console.log(res);
        this.setData({
          index:res.result.type
        })
      }
    })
  },
  // 收下邮卡
  recepeMycard() {
    wx.cloud.callFunction({
      name: 'getYou',
      data: {
        type: this.data.index
      },
      success: res => {
        wx.showToast({
          title: '你已收下邮卡',
          icon: 'success',
          duration: 1500
        })
        // 返回扫一扫界面
        setTimeout(() => {
          wx.navigateTo({
            url: '../scan/scan',
          })
        }, 800)
      }
    })
  },
  // 跳到详情页
  detailPrize() {
    const { index } = this.data
    wx.navigateTo({
      url: `../detailPrize/detailPrize?index=${index}`,
    })
  }
})