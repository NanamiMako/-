// packageA/pages/goods-detail/goods-detail.js
import {
  GetBookDetailModel
} from "../../../models/getBookDetail"
let getBookDetailModel = new GetBookDetailModel()
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
    let goodsId = options.id;
    let cartsArrLength = wx.getStorageSync("goodsCarts").length;
    this.setData({
      goodsId,
      cartsArrLength
    })
    this.getData(goodsId)

    
  },

  //调用方法获取数据
  getData(goodsId){
    getBookDetailModel.getBookDetail({goodsId},(res)=>{
      this.setData({
        goodsData: res
      })
    })
  },

  // 加入购物车
  jionCart(){
    let cartsArr = wx.getStorageSync('goodsCarts') || [];
    let temp = this.data.goodsData;
    //判断购物车中是否有该商品
    let flag = cartsArr.find(item=>item.id==temp.id);
    if(!flag){
      temp.checked = false;
      temp.goodsCartNum = 1;
      cartsArr.push(temp);
      wx.setStorageSync('goodsCarts', cartsArr)
      wx.showToast({
        title: '添加成功',
        icon: "success"
      })
      this.setData({
        cartsArrLength: (this.data.cartsArrLength+1)
      })

    }else{
      wx.showToast({
        title: '已有该商品',
        icon: "success"
      })
    }
    
  }
})