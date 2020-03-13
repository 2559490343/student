// pages/login/login.js
const {
  $Toast
} = require('../../dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentName: '',
    studentNum: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getId(e) {
    this.setData({
      studentNum: parseInt(e.detail.value)
    });
  },

  getName(e) {
    this.setData({
      studentName: e.detail.value
    });

  },
  login() {
    if (!this.data.studentName.trim()) {
      $Toast({
        content: '姓名不能为空！',
        type: 'warning'
      });
      return
    } else if (!this.data.studentNum) {
      $Toast({
        content: '学号不能为空！',
        type: 'warning'
      });
      return
    }
    let that = this;
    app.globalData.api.default.login({
      studentNum: that.data.studentNum,
      studentName: that.data.studentName,
      openId: wx.getStorageSync('openId')
    }).then(res => {
      console.log(res);
      if (res.data.code !== 0) return
      wx.setStorageSync('first_flag', false);
      let info = res.data.data || {}
      app.globalData.studentNum = info.studentNum;
      app.globalData.studentId = info.studentId;
      wx.setStorageSync('studentNum', info.studentNum)
      wx.setStorageSync('studentId', info.studentId)
      // wx.setStorageSync('studentId', 1)
      app.globalData.studentName = info.studentName;
      $Toast({
        content: '登录成功！',
        type: 'success'
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000);


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