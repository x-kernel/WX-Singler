//guide.js 欢迎引导页面
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultResion:['浪','沉迷学习','我只想发财','人怂嘴不甜']
  },

  /**
   * 跳转到写字测试页面
   */
  gotoTest: function() {
    wx.navigateTo({
      url: '../test/test',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: 'https://39.104.116.127:8443/initPage',
      success: function(res) {
        console.log(res.data)
        that.setData({
          defaultResion : res.data
        })
      },
      fail:function(res){
        wx.showToast({
          title: '系统错误',
        })
      },
      complete:function(res){
          wx.hideLoading()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})