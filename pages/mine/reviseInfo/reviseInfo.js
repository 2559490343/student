// pages/mine/reviseInfo/reviseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    name: '',
    num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync("user");
    // let avatarUrl = app.globalData.userInfo.avatarUrl
    // user.avatarUrl = avatarUrl;
    // wx.setStorageSync("user", user);
    this.setData({
      user: user,
      num: user.num,
      name: user.name
    })
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
  getName(e) {
    // console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })

  },
  getNum(e) {
    // console.log(e.detail.value);
    this.setData({
      num: e.detail.value
    })

  },
  getAvatar(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    });

  },
  keep() {
    let newUser = this.data.user;
    if (this.data.name != '' && this.data.num != '') {
      newUser.name = this.data.name;
      newUser.num = this.data.num;
    }
    this.setData({
      user: newUser
    })

    // console.log(newUser);

    wx.setStorageSync("user", newUser);



    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000,
      mask: false,
      success: (result) => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      },
    });

  },
})