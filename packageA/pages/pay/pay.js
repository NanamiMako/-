// pages/pay/pay.js
import {chooseAddress} from "../../../utils/userAddress.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户本地收货地址
    let userAddress = wx.getStorageSync("userAddress");
    this.setData({
      userAddress
    })
    this.goodsTotal();
  },
  //商品合计
  goodsTotal(){
    let userCarts = wx.getStorageSync("goodsCarts") || [];
    //挑选出选中的商品
    let payCarts = userCarts.filter(v=>v.checked);
    // 商品总价
    let allPrice = 0;
    // 商品总数量
    let payCartsNum = 0;
    payCarts.forEach(v=>{
      allPrice += v.goodsCartNum * v.price;
      payCartsNum += v.goodsCartNum
    })
    this.setData({
      payCarts,
      allPrice,
      payCartsNum
    })
  },
  //获取收货地址
  async getUserInfo(e){
    let userAddress = await chooseAddress();
    let userInfo = {
      allAddress: userAddress.cityName+userAddress.countyName+userAddress.detailInfo,
      phone: userAddress.telNumber,
      name: userAddress.userName
    }
    this.setData({
      userAddress: userInfo
    })
    wx.setStorageSync('userAddress', userInfo)
  },
  //支付
  payGoods(){
    let userAddress = this.data.userAddress;
    if(!userAddress){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return 
    }
    //将支付蒙版显示
    this.setData({
      isPay: true
    })
  },
  //支付结果
  payMenuCallBack(e){
    let flag = e.currentTarget.dataset.select;
    if(flag){
      wx.showToast({
        title: '支付成功',
        icon:'success',
        success(res){
          let localCarts = wx.getStorageSync("goodsCarts");
          // 将未支付（未选中）的商品覆盖本地
          let surplusCarts = localCarts.filter(v=>!v.checked);
          wx.setStorageSync('goodsCarts', surplusCarts);
          //支付完成返回购物车
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }else{
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      })
    }
    this.setData({
      isPay: false
    })
  }
})