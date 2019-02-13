// pages/usercenter/center.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  watchedInfo:[],//多少人看了我的列表信息
  data: {
    nickName: '康',
    avatarUrl: '',
    watchedNum:0,
  },
  /**
   * 跳转到结果页面
   */
  gotoResult: function() {
    const openid = wx.getStorageSync('openid')
    wx.navigateTo({
      url: '../result/result?openid=' + openid + '&type=' + 0,
    })
  },

  /**
   * 跳转到谁看了我的页面
   */
  gotoWatch: function () {
    var mWatchedInfo = JSON.stringify(this.watchedInfo);
    wx.navigateTo({
      url: '../watchmelist/list?watchedInfo=' + mWatchedInfo,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    }
    this.getWatchInfoByOpenid();
  },

  /**
   * 根据用户id或者测试结果
   */
  getWatchInfoByOpenid: function () {

    var that = this;
    const mOpenid = wx.getStorageSync('openid')
    if (mOpenid) {
      //测试结果页跳转过来的
      wx.request({
        url: 'https://www.xkhome.online/getResultActionByOpenId',
        data: {
          openid: mOpenid,
        },
        success: function (res) {
          console.log(res.data)
          that.watchedInfo = res.data
          that.setData({
            watchedNum: res.data.length
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
        complete: function (res) {
          wx.hideLoading()
        }
      })
    }
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