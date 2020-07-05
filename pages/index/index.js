import $$ from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    dataImg: [],
    details:{},
    id:'41d0d33761de45e1aafe35e6c316e435'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 顶部导航列表
    $$.httpGet('/w/website/findGoodsTypeList', {}, res => {
      this.setData({
        goodList: res.data.data
      })
    }),
    // 轮播图
    $$.httpGet('/w/website/bannerList',{},res => {
      this.setData({
        dataImg: res.data.data
      })
    }),
    wx.showLoading({
      title: '加载中',
    }),
    // 首页第一次加载
    $$.httpGet('/w/website/findGoodsList',{
      'platid': 'd0a500ecf8ab41aa9ffe8e18ac6419e1',
      'info': '配饰',
      'pageNo': 1
    },res => {
      if(res.data.data.tbk_dg_material_optional_response.result_list.map_data){
        wx.hideLoading()
        this.setData({
          goodInfoList:res.data.data.tbk_dg_material_optional_response.result_list.map_data
        })
      }else{
        wx.showLoading({
          title: '加载中'
        })
    }
    })
  },
  // 导航样式
  activeon(e){
    wx.showLoading({
      title: '加载中',
    }),
     this.setData({
       id: e.currentTarget.dataset.id
     }),
    $$.httpGet('/w/website/findGoodsList',{
      'platid': 'd0a500ecf8ab41aa9ffe8e18ac6419e1',
      'info': e.currentTarget.dataset.name,
      'pageNo': 1
    },res => {
      if(res){
      wx.hideLoading()
        this.setData({
          goodInfoList:res.data.data.tbk_dg_material_optional_response.result_list.map_data
        })
      }else{
        wx.showLoading({
          title: '加载中',
        })
      }
    })
  },
  // 商品详情
  goodInfo(e){
    wx.setStorage({
      key:"detailsId",
      data:e.currentTarget.dataset.id
    })
    wx.setStorage({
      key:"title",
      data:e.currentTarget.dataset.title
    })
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  // 导航切换


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