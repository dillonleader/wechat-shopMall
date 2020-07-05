import $$ from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail: {},
    numVal: 1,
    status: false,
    define:false,
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    // 商品详情
    wx.getStorage({
        key: 'detailsId',
        success: res => {
          if (res.data) {
            $$.httpGet('/w/website/findGoodsDetail', {
              'info': res.data
            }, res => {
              this.setData({
                goodDetail: res.data.data.detail.tbk_item_info_get_response.results.n_tbk_item[0]
              })
            })
          }
        }
      }),
      // 动态的页面标题
      wx.getStorage({
        key: 'title',
        success: res => {
          wx.setNavigationBarTitle({
            title: res.data
          })
        }
      })
  },
  shoppCat() {
    wx.switchTab({
      url: '/pages/shoppcat/shoppcat'
    })
  },
  addShoppCat() {
    this.setData({
      status: true
    })
  },
  blankHide() {
    this.setData({
      status: false
    })
  },
  moda() {
    return false
  },
  // 加
  addNum(e) {
    this.data.numVal++
    this.setData({
      numVal: this.data.numVal++
    })
  },
  // 减
  subNum() {
    if (this.data.numVal > 1) {
      this.data.numVal--
      this.setData({
        numVal: this.data.numVal--
      })
    }
  },
  // 确定加入购物车
  sure(e){
    this.setData({
      status: false
    })
    let arr = wx.getStorageSync('shopps')||[]
    arr.push({
      shop:this.data.goodDetail.nick,
      img:this.data.goodDetail.pict_url,
      title:this.data.goodDetail.title,
      catName:this.data.goodDetail.cat_name,
      provcity:this.data.goodDetail.provcity,
      price:this.data.goodDetail.reserve_price,
      numVal:this.data.numVal
    })
    wx.setStorage({key:'shopps',data:arr})
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
    
  },
  // 立即购买
  buyNoe(){
    this.setData({
      status: true,
      define:true
    })
    
  },
  // 立即购买--> 确定
  sureTo(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
    this.setData({
      status:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})