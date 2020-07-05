import $$ from '../../utils/config.js'
const amapFile = require('../../lib/amap-wx.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfoList: [],
    shopList: [],
    status: false,
    location:'正在为您进行定位...',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 为你推荐
    wx.showLoading({
      title: '加载中',
    })
    $$.httpGet('/w/website/findGoodsList', {
      'platid': 'd0a500ecf8ab41aa9ffe8e18ac6419e1',
      'info': '为你推荐',
      'pageNo': 1
    }, res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          goodInfoList: res.data.data.tbk_dg_material_optional_response.result_list.map_data
        })
      } else {
        wx.showLoading({
          title: '加载中',
        })
      }
    })
    // 定位
    wx.getLocation({
      type: 'gcj02 ',
      success: res => {
        // console.log(res)
      }
    })
    // 高德地图精准定位API
    let myAmapFun = new amapFile.AMapWX({key:'379f50480e748730c556a890ef1653c0'});
    myAmapFun.getRegeo({
      success: res => {
        setTimeout(() => {
          this.setData({
            location:res[0].desc
          })
        }, 2000)
      }
    })
  },
  // 商品详情
  goodInfo(e) {
    wx.setStorage({
      key: "detailsId",
      data: e.currentTarget.dataset.id
    })
    wx.setStorage({
      key: "title",
      data: e.currentTarget.dataset.title
    })
    wx.navigateTo({
      url: '/pages/details/details',
    })
    // 核心， 实时显示购物车数据
    this.onShow()
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 购物车列表
    wx.getStorage({
      key: 'shopps',
      success: res => {
        this.setData({
          shopList: res.data,
          status:true
        })
      }
    })
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