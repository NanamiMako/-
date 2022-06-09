// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      //获取页面右上角胶囊位置信息
      capsule: getApp().globalData.capsuleInfo,
      userInfo
    })
    
  },

  //获取用户信息
  getUserInfo(e){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
  }
})