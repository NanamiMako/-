// packageA/pages/search/search.js
import {
  GetSearchModel
} from "../../../models/getSearch"
let getSearchModel = new GetSearchModel()

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
    this.setData({
      //获取页面右上角胶囊位置信息
      capsule: getApp().globalData.capsuleInfo
    })
  },

  //搜索
  searchChange(e){
    let iptVal = e.detail.iptVal;

    getSearchModel.getSearch({
      page:{
        title: iptVal
      }
    },(res)=>{
      this.setData({
        bodysData: res.data
      })
    })
  }
})