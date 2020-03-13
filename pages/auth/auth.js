// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.to_flag == 'true') {
      console.log('toLogin')
      this.setData({
        to: '/pages/login/login'
      })
    } else {
      console.log('selsect')

      this.setData({
        to: '/pages/index/selection/selection?first_flag=true'
      })
    }
  },
  login(e) {

    var that = this;
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log(that.data.to)
      wx.showModal({
        content: "授权成功!",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          // wx.navigateTo({
          //   url: that.data.to,
          // })
          wx.redirectTo({
            url: that.data.to
          })
        }
      })
    } else {
      wx.showModal({
        content: "您已拒绝授权",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          that.setData({
            showModal2: false
          });
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