// pages/index/homework/homeList/homeList.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeList: [],
    answer: {},
    homeIndex: -1,
    homeworkId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时根据已保存答案填写到页面中  
    this.setData({
      homeIndex: options.index,
      homeworkId: options.id
    })
    // let answer = wx.getStorageSync("answer");
    // let newList = this.data.homeList
    // for (let key in answer) {
    //   newList[key].answer = answer[key]
    // }
    // // console.log(newList);
    // this.setData({
    //   homeList: newList
    // })
    this.getHomeWorkDetail()
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

  },
  // 获取作业提交的结果
  showResult(list) {
    let that = this
    app.globalData.api.default.showSubmitResult({
      homeworkId: that.data.homeworkId,
      studentId: app.globalData.studentId
    }).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let answerList = res.data.data || [];
      for (let i = 0; i < list.length; i++) {
        list[i].titleTrue = answerList[i].titleTrue
        list[i].answer = answerList[i].titleAnswer
      }
      that.setData({
        homeList: list
      })
    })

  },
  // 获取作业内容
  getHomeWorkDetail() {
    let that = this
    app.globalData.api.default.getHomeWorkDetail({
      homeworkId: that.data.homeworkId
    }).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data.titleList || [];
      that.showResult(list)

    })
  }
})