// components/navigation/navigation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    capsule: Object,
    searchShow: Boolean,
    searchIpt: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    headerInput(e){
      let iptVal = e.detail.value;
      this.triggerEvent("iptChange",{iptVal},{})
    },
    returnPage(e){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})

// request({
//   url:"https://api.shop.eduwork.cn/api/goods?title="+title+"&page=0"
// }).then(res=>{
//   this.setData({
//     // 将左侧导航下标隐藏
//     currentIndex: 0,
//     menuList: res.data.goods.data
//   })
// })
