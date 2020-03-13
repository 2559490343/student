// pages/mine/homework/homework.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeworkInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHomeWorkInfo()
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

  },
  goDetail() {
    wx.navigateTo({
      url: '/pages/index/homework/homework'
    });


  },
  getHomeWorkInfo() {
    let that = this;
    let obj = {
      studentId: app.globalData.studentId,
      homeworkType: '课后作业'
    }
    app.globalData.api.default.getHomeWorkInfo(obj).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data || []
      that.setData({
        homeworkInfoList: list
      })
    })

  }
})