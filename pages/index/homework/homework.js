// pages/index/sign/sign.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    ingList: [],
    subList: [],
    homeCounts: {},
    courseName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      courseName: app.globalData.courseName
    })
    // this.getHomeWork()
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
    let homeCounts = wx.getStorageSync("homeCounts");
    this.setData({
      homeCounts: homeCounts
    })
    this.getHomeWork(true)
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
    wx.stopPullDownRefresh()
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
  changeTab(e) { //签到tab切换
    if (this.data.tabIndex == e.target.dataset.index) return
    this.setData({
      tabIndex: e.target.dataset.index
    })
    if (e.target.dataset.index == '0') {
      this.getHomeWork(true)
    } else {
      this.getHomeWork(false)
    }
  },
  answer(e) {
    // 拿到测试题的id，根据id请求测试题列表
    wx.navigateTo({
      url: '/pages/index/homework/homeList/homeList?id=' + e.target.dataset.id
    });
  },
  showResult(e) {
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '/pages/index/homework/resultList/resultList?id=' + e.target.dataset.id,
      success: (result) => {}
    });
  },

  getHomeWork(flag) {
    let that = this;
    app.globalData.api.default.getHomeWork({
      courseId: app.globalData.courseId,
      homeworkType: '课后作业',
      studentId: app.globalData.studentId
    }).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data || [];
      if (!list.length) return
      if (flag) {
        list = list.filter(item => {
          if (item.homeworkStatus === "发布" && !item.commits.length)
            return item
        })
        that.setData({
          ingList: list
        })
      } else {
        list = list.filter(item => {
          if (item.homeworkStatus === "发布" && item.commits.length)
            return item
        })
        that.setData({
          subList: list
        })
      }
      // console.log(list)

    })
  }

})