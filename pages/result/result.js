var app = getApp();


Page({
  mOpenid: '', //传递的参数 用户id
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: 'AI智能测字，运势、感情啥都能测！',
    nickName: '康仔',
    avatarUrl: '',
    defaultResion: ['浪', '沉迷学习', '我只想发财', '人怂嘴不甜'],
    isFromTest: true //true=测试页面跳转（底部显示转发和保存图片），false=还是转发/小程序码(底部显示祝福和我也要测)
  },

  /**
   * 获得小程序码地址，跳转到画报页面
   */
  savePic: function() {
    wx.request({
      url: 'https://www.xkhome.online/getCode',
      data: {
        page: 'pages/result/result',
        scene: this.mOpenid + '&2',
        width: 460
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        //跳转到海报页面
        wx.navigateTo({
          url: '../poster/index?avater=' + 'https://www.xkhome.online/' + res.data[0] + '&qrCode=' + 'https://www.xkhome.online/' + res.data[1],
        })
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
  },

  /**
   * 祝福页面
   */
  gotoWish: function() {},
  /**
   * 跳转到写字测试页面
   */
  gotoTest: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**获取用户头像 */
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //用户授权成功，根据用户id获得测试结果
    this.getTestResultByOpenid();

    //获得用户信息后给后台备份一份
    if (app.globalData.userInfo != null) {

      console.log(app.globalData.userInfo)

      const openid = wx.getStorageSync('openid')

      wx.request({
        url: 'https://www.xkhome.online/uploadUserMsg',
        data: {
          openid: openid,
          shareOpenid: this.mOpenid,
          currentOpenid: openid,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //type: 0（测试页面跳转）1（转发）2（小程序码）
    if (options.type == 0) {
      this.setData({
        isFromTest: true
      });
    } else {
      this.setData({
        isFromTest: false
      });
    }
    //测试页面跳转或者转发
    if (options.openid) {
      this.mOpenid = options.openid;
    }
    //用户扫描小程序码
    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      this.mOpenid = options.scene.split("&")[0];
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      //如果从非测试页面进来，并且传进来的openid 和本地的openid一致，进入个人中心
      const openid = wx.getStorageSync('openid')
      if (options.type != 0 && this.mOpenid == openid) {
        wx.redirectTo({
          url: '../usercenter/center',
        })
        return;
      }
      //如果用户已经授权直接获得结果
      this.getTestResultByOpenid();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('this.data.canIUse:' + this.data.canIUse);
      app.userInfoReadyCallback = res => {
        console.log('app.userInfoReadyCallback:res:' + res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //如果从非测试页面进来，并且传进来的openid 和本地的openid一致，进入个人中心
        const openid = wx.getStorageSync('openid')
        if (options.type != 0 && mOpenid == openid) {
          wx.redirectTo({
            url: '../usercenter/center',
          })
          return;
        }
        //如果用户已经授权直接获得结果
        console.log('22222222222');
        this.getTestResultByOpenid();
      }
    } else {
      //在没有 open-type=getUserInfo 版本的兼容处理
      console.log('reslut：else');
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          //如果从非测试页面进来，并且传进来的openid 和本地的openid一致，进入个人中心
          const openid = wx.getStorageSync('openid')
          if (options.type != 0 && mOpenid == openid) {
            wx.redirectTo({
              url: '../usercenter/center',
            })
            return;
          }
          //如果用户已经授权直接获得结果
          this.getTestResultByOpenid();
        }
      })
    }
  },

  /**
   * 根据用户id或者测试结果
   */
  getTestResultByOpenid: function() {

    var that = this;
    if (this.mOpenid) {
      //测试结果页跳转过来的
      wx.request({
        url: 'https://www.xkhome.online/getTestResultByOpenid',
        data: {
          openid: this.mOpenid,
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            nickName: res.data.nickName,
            avatarUrl: res.data.headUrl,
            defaultResion: res.data.tagList,
          });
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
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '智能测字',
      path: 'pages/result/result?openid=' + this.mOpenid + '&type=' + 1,
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})