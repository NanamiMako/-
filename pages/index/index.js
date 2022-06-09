// pages/index/index.js

import {
  GetBookModel
} from "../../models/getBook"
let getBookModel = new GetBookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabs价格小图标  ⇅ ↿  ⇂
    tabsPriceIcon: "⇅",
    //tabs价格选项卡排序方式，1从底到高 或 2从高到低,0表示选项卡未选中
    tabsPriceType: 0,
    // tabs当前选中
    active: 0,
    //页面当前数据是tabs前三个中的哪一个
    curBodysBooks: 0,
    // bodys数据
    bodysData: [],
    // 页数
    pageNum: 1,
    //加载指示器是否显示
    loadingCenter: true,
    loadingBottom: false,
    //如果数据使用完，则不再进行下拉刷新
    dataEnd: false
  },
  dataBooks:{
    // 默认商品数据
    0:[],
    // 新品数据
    1:[],
    // 销量
    2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      //获取页面右上角胶囊位置信息
      capsule: getApp().globalData.capsuleInfo
    })

    this.getData()
  },

  //tabs组件改变
  onChangeTabs(e) {
    let tabsIdx = e.detail.index;
    this.setData({
      active: tabsIdx
    })

  },

  //tabs点击
  tabsClick(e) {
    let tabsIdx = e.detail.index;
    let tabsPriceType = this.data.tabsPriceType;
    let curBodysBooks = this.data.curBodysBooks;
    this.setData({
      loadingCenter: true
    })
    if (tabsIdx == 3) {
      //根据价格类型this.data.tabsPriceType判断排序方式
      getBookModel.storArr(this.dataBooks[curBodysBooks],tabsPriceType,(res)=>{
        this.setData({
          bodysData: res
        })
        this.dataBooks[curBodysBooks] = res;
      })

      // 改变图标
      this.setData({
        tabsPriceType: tabsPriceType == 1 ? 2 : 1,
        tabsPriceIcon: tabsPriceType == 1 ? "↿" : "⇂"
      })
    } else {
      // 重置第四个图标数据
      this.setData({
        tabsPriceType: 0,
        tabsPriceIcon: "⇅",
        curBodysBooks: tabsIdx
      })

      //tabs不是最后一个就请求数据
      //如果dataBooks中有保存该类型的数据，就放入data中，不请求数据,否则请求数据
      // [] == false // true,意味着数组中没有数据
      if(this.dataBooks[tabsIdx] == false){
        this.setData({
          pageNum: 1
        })
        this.getData()
        
      }else{
        this.setData({
          pageNum: this.dataBooks[tabsIdx] / 10,
          bodysData: this.dataBooks[tabsIdx]
        })
      }
      
    }

    this.setData({
      loadingCenter: false
    })
    
  },

  // 获取数据
  getData() {
    let tabsIdx = this.data.curBodysBooks;
    let pageNum = this.data.pageNum;
    let bodysData = [];

    getBookModel.judegTabIndex(tabsIdx,pageNum,(res) => {
      //如果数据使用完后
      if(res == false){
        this.setData({
          dataEnd: true
        })
        return
      }
      //根据页数来判断数据是否拼接
      if(pageNum == 1){
        bodysData = res
      }else{
        bodysData = [...this.data.bodysData,...res]
      }

      this.dataBooks[tabsIdx] = bodysData;

      this.setData({
        bodysData: bodysData,
        loadingCenter: false,
        loadingBottom: false
      })
    })

  },

  //触底刷新
  onReachBottom(){
    if(this.data.dataEnd){
      return
    }
    this.setData({
      loadingBottom: true
    })
    this.data.pageNum++
    this.getData()
  },

  //
  onShow:function(){
    let cartsArrLength = wx.getStorageSync('goodsCarts').length;
    if(cartsArrLength){
      wx.setTabBarBadge({
        index: 1,
        text: '' + cartsArrLength
      })
    }
  }
})