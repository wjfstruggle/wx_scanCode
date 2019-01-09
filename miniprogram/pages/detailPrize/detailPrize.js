// miniprogram/pages/detailPrize/detailPrize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeIndex: 0,
    detailPrizeInfo: [
      {
        // 邮学贷
        img: '../../images/caoCode/youxue_icon_dai.png',
        product_detail: {
          text1: '无抵押，纯信用，线上申请，操作简单',
          text2: '最高可贷8000元，',
          text3: '贷款期限最长12个月',
        },
        prize_detail_use: '社团活动、旅游、培训等合法个人消费用途',
        prize_detail_person: '18-40岁的普通高等学校的在校学生',
        prize_detail_tips: '邮学贷贷款到期日不得晚于就读高等学校的毕业时间',
        prize_detail_way: '扫码下载“邮e贷”APP',
        prize_detail_way_tip: '填写个人资料后即可申请。',
        img1: '../../images/caoCode/qrcode_ios.jpg',
        img2: '../../images/caoCode/qrcode_android.jpg',
        code_text1: 'IOS版本',
        code_text2: '安卓版本',
      },
      {
        // 邮薪贷
        img: '../../images/caoCode/youxin_icon_dai.png',
        product_detail: {
          text1: '无抵押，纯信用，全程线上办理，10分钟到账',
          text2: '每月逢“8”申请，即8、18、28号，',
          text3: '年利率低至5.65%',
          text4: '最高可贷30万元，贷款期限最长3年',
        },
        prize_detail_use: '社团活动、旅游、培训等合法个人消费用途',
        prize_detail_person: '22-55岁的具有稳定的工作单位，且入职至少3个月的中国公民（不含港澳台人士）。',
        prize_detail_way: '扫码下载“邮e贷”APP，',
        prize_detail_way_tip: '填写个人资料后即可申请。',
        img1: '../../images/caoCode/qrcode_ios.jpg',
        img2: '../../images/caoCode/qrcode_android.jpg',
        code_text1: 'IOS版本',
        code_text2: '安卓版本',
      },
      {
        // 邮家贷
        img: '../../images/caoCode/youjia_icon_dai.png',
        product_detail: {
          text1: '为我行存量房贷客户定制，无抵押，纯信用',
          text2: '主动授信，全程线上办理，最快10分钟到账',
          text3: '随借随还，按日计息，提前还款无罚息',
          text4: '最高可贷30万元,贷款期限最长5年',
        },
        prize_detail_use: '社团活动、旅游、培训等合法个人消费用途',
        prize_detail_person: '25-60岁，在我行个人住房贷款正常还款3年以上',
        prize_detail_way: '收到我行邀约短信的白名单客户，关注微信公众号 “邮储银行深圳分行”，输入关键字“邮家贷”, 即可进入链接输入手机号码登录并发起邮家贷申请。',
        img1: '../../images/caoCode/qrcode_official_accounts.jpg',
        code_text1: '关注微信公众号'
      },
      {
        // 邮掌柜
        img: '../../images/caoCode/youzhang_icon_dai.png',
        product_detail: {
          text1: '无抵押，无担保，只需营业执照',
          text2: '全程线上办理，最快30分钟完成审批',
          text3: '按日计息，1万1天只需2.3元，',
          text4: '提前还款无罚息最高可贷15万元',
        },
        prize_detail_use: '用于店铺日常经营',
        prize_detail_person: '申请人或配偶有营业执照，且为邮惠付商户；营业执照经营年限＞2年；申请人年龄在18—65周岁之间；申请人持有邮储借记卡。',
        prize_detail_way: '下载邮掌柜APP，',
        prize_detail_way_tip: '登录邮掌柜，进入掌柜贷页面进行申请。',
        img1: '../../images/caoCode/qrcode_app.jpg',
        code_text1: '“邮掌柜”APP'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let prizeIndex = options.prizeIndex
    this.setData({
      prizeIndex: prizeIndex
    }) 
  },
})