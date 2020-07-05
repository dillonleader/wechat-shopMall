import $$ from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    goodInfoList:[],
    status:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 取消
  cancel() {
    wx.switchTab({
      url: '/pages/sort/sort',
    })
  },
  // 回车搜索
  EnterSearch(e){
    wx.showLoading({
      title: '加载中',
    })
    let wd = e.detail.value
    $$.httpGet('/w/website/findGoodsList',{
      'platid': 'd0a500ecf8ab41aa9ffe8e18ac6419e1',
      'info': wd,
      'pageNo': 1
    },res => {
      console.log(res)
      if(res){
      wx.hideLoading()
        if(res.data.data.error_response){
          wx.showToast({
            title: '暂未找到相关商品，请重新输入',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }else if(res.data.data.tbk_dg_material_optional_response){
          this.setData({
            goodInfoList:res.data.data.tbk_dg_material_optional_response.result_list.map_data,
            status: true
          })
        }
      }else{
        wx.showLoading({
          title: '加载中',
        })
      }
    })
  },
  // 详情页面
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