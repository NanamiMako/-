// app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //获取右上角胶囊位置信息
    this.globalData.capsuleInfo = wx.getMenuButtonBoundingClientRect();
    //获取缓存中的购物车数量，显示在tanBar中
    let cartsArrLength = wx.getStorageSync('goodsCarts').length;
    if(cartsArrLength){
      wx.setTabBarBadge({
        index: 1,
        text: '' + cartsArrLength
      })
    }
    
  },
  globalData:{
    capsuleInfo: null
  }
})

