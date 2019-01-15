var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentResion: ['单身原因1', '单身原因2', '单身原因3']
  },

  getTestResult:function(){
    var that = this;

    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: 'https://39.104.116.127:8443/testWord',
      data: { openId:'sffw',sex: '女', wordStep:3},
      success: function (res) {
        console.log(res.data)
        that.setData({
          contentResion: res.data.tagList
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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