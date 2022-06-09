// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否编辑购物车列表
    check: false
  },

  onShow: function(){
    let cartsData = wx.getStorageSync("goodsCarts") || [];
    let isCarts = cartsData.length;
    this.setData({
      cartsData,
      isCarts: isCarts!=0,
      cartsLength: cartsData.length
    })
    this.footerStatistics();

    wx.setTabBarBadge({
      index: 1,
      text: cartsData.length
    })
  },
  //底部商品信息统计
  footerStatistics () {
    let cartsArr = this.data.cartsData;
    //选出被选中的商品
    let checkedCart = cartsArr.filter(v=>v.checked);
    //判断是否商品全部选中
    let goodsChecked = false;
    //商品总价
    let allPrice = 0;
    checkedCart.map(item=>{allPrice += item.price * item.goodsCartNum});
    if(checkedCart.length == cartsArr.length){
      goodsChecked = true;
    }
    this.setData({
      goodsChecked,
      //选中 的商品数量
      checkedNum: checkedCart.length,
      allPrice,
      isCarts: cartsArr.length!=0
    })
    wx.setStorageSync('goodsCarts', cartsArr);
  },
  // 商品是否选中
  goodsChange(e){
    let {cartid} = e.currentTarget.dataset;
    let cartsArr = this.data.cartsData;
    let curCart = cartsArr.findIndex(v=>v.id==cartid);
    cartsArr[curCart].checked = !cartsArr[curCart].checked;
    this.setData({
      cartsData: cartsArr
    })
    this.footerStatistics();
  },
  //单个商品数量
  goodsTool(e){
    let tooleVal = e.currentTarget.dataset.tool;
    let curid = e.currentTarget.dataset.cartid;
    let cartsArr = this.data.cartsData;
    let curCart = cartsArr.findIndex(v=>v.id==curid);
    if(tooleVal == 1){
      //商品加1
      cartsArr[curCart].goodsCartNum = cartsArr[curCart].goodsCartNum+1;
      this.setData({
        cartsData: cartsArr
      })
      wx.setStorageSync('goodsCarts', cartsArr);
    }else{
      // 商品减1
      // 当商品只剩1件时
      if(cartsArr[curCart].goodsCartNum == 1){
        wx.showModal({
          title: '是否删除当前商品',
          success:(res)=>{
            if(res.confirm){
              cartsArr.splice(curCart,1);
            }else{
              return
            }
            this.setData({
              cartsData: cartsArr
            })
            wx.setStorageSync('goodsCarts', cartsArr)
          }
        })
      }else{
        cartsArr[curCart].goodsCartNum = cartsArr[curCart].goodsCartNum-1;
        this.setData({
          cartsData: cartsArr
        })
        wx.setStorageSync('goodsCarts', cartsArr);
      }
    }
    
    this.footerStatistics();
  },
  // 商品全选
  allGoodsChange(){
    let goodsChecked = !this.data.goodsChecked;
    let cartsArr = this.data.cartsData;
    cartsArr.forEach(v=>{
      v.checked = goodsChecked
    })
    this.setData({
      goodsChecked,
      cartsData: cartsArr
    })
    this.footerStatistics();
  },
  // 编辑购物车商品
  editBtn(){
    let isEdit = !this.data.isEdit;
    this.setData({
      isEdit
    })
  },
  // 删除商品
  deteleGoods(){
    let cartsArr = this.data.cartsData;
    let curCart = cartsArr.filter(v=>!v.checked);
    this.setData({
      cartsData: curCart,
    })
    wx.setStorageSync('goodsCarts', curCart);
    this.footerStatistics();
  },
  // 结算
  payCarts(){
    if(this.data.checkedNum <= 0){
      wx.showToast({
        title: '请选择购买的商品',
        icon: 'none'
      })
      return 
    }
    wx.navigateTo({
      url: '/packageA/pages/pay/pay',
    })
  }
})