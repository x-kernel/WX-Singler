//guide.js 欢迎引导页面
//获取应用实例
var app = getApp();

Page({
  mHasUserInfo: false, // 是否已经授权
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    BtText: '点击立即测试',
    title: 'AI智能测字，运势、感情啥都能测！',
    defaultResion: ['浪', '沉迷学习', '我只想发财', '人怂嘴不甜']
  },

  /**
   * 跳转到写字测试页面
   */
  gotoTest: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.mHasUserInfo = true;
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.mHasUserInfo = true;
        //this.getInitInfo();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.mHasUserInfo = true;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  getInitInfo: function() {
    var that = this;
    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: 'https://www.xkhome.online/initPage',
      success: function(res) {
        console.log(res.data)
        that.setData({
          defaultResion: res.data
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '系统错误',
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },

  /**获取用户头像 */
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.mHasUserInfo = true;
    //用户授权成功,获得初始化数据
    //this.getInitInfo();
    //获得用户信息后给后台备份一份
    if (app.globalData.userInfo != null) {

      console.log(app.globalData.userInfo)

      const openid = wx.getStorageSync('openid')

      wx.request({
        url: 'https://www.xkhome.online/uploadUserMsg',
        data: {
          openid: openid,
          shareOpenid: '',
          currentOpenid: '',
          sex: '' + app.globalData.userInfo.gender,
          headUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName
        },
        success: function(res) {
          console.log(res.data)
        },
        fail: function(res) {
          wx.showToast({
            title: '网络错误',
          })
        },
        complete: function(res) {
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