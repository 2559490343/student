// pages/index/sign/sign.js
import formatTime from '../../../utils/util'
const {
  $Toast
} = require('../../../dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    signIndex: null,
    ingList: {},
    hisList: [],
    courseName: '',
    signCode: '',
    visible: false, //对话框显示flag
    actions: [{
        name: '取消'
      },
      {
        name: '提交',
        color: '#ed3f14',
        loading: false
      }
    ], //对话框按钮组配置项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSigning();
    this.setData({
      courseName: app.globalData.courseName
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
    if (this.data.tabIndex == 0) {
      this.getSigning()
    } else {
      this.getHisSign()
    }
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
    if (e.target.dataset.index == '1') {
      this.getHisSign()
    } else {
      this.getSigning()
    }
  },
  showSignModal() {
    this.setData({
      visible: true
    })
    this.data.signIndex = null
  },
  showSignModal1(e) {
    let index = e.currentTarget.dataset.index
    let sign = this.data.hisList[index]
    this.setData({
      visible: true
    })
    this.data.ingList = sign
    this.data.signIndex = index
  },
  getSigning() {
    let that = this;
    app.globalData.api.default.getSigning({
        openId: wx.getStorageSync('openId'),
        sign: {
          courseId: app.globalData.courseId
        }
      }

    ).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      if (res.data.data)
        that.setData({
          ingList: res.data.data
        })
    })
  },
  getHisSign() {
    let that = this;
    app.globalData.api.default.getHisSign({
        openId: wx.getStorageSync('openId'),
        sign: {
          courseId: app.globalData.courseId
        }
      }

    ).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data || [];
      that.setData({
        hisList: list
      })
    })
  },
  handleClick({
    detail
  }) {
    if (detail.index === 0) {
      // 取消按钮
      this.setData({
        visible: false
      });
    } else {
      let studentStatus = '';
      console.log(this.data.signCode, this.data.ingList.sign)
      if (this.data.signCode == this.data.ingList.sign.code) {
        let nowTime = new Date().getTime();
        let lateTime = Date.parse(this.data.ingList.sign.lateTime) - 8 * 60 * 60 * 1000;
        let overTime = Date.parse(this.data.ingList.sign.createTime) + this.data.ingList.sign.truancyTime * 1000;
        if (lateTime - nowTime >= 0) {
          studentStatus = '正常签到'
        } else if (nowTime - lateTime > 0 && overTime - lateTime >= 0) {
          studentStatus = '迟到'
        } else {
          studentStatus = '旷课'
        }
        let that = this;
        // 提交按钮
        app.globalData.api.default.submitSignStatus({
          studentStatus: studentStatus,
          openId: wx.getStorageSync('openId'),
          sign: {
            signId: that.data.ingList.sign.signId
          }
        }).then(res => {
          console.log(res)
          if (res.data.code !== 0) return
          that.setData({
            visible: false
          });
          $Toast({
            content: '签到成功！',
            type: 'success'
          });
          console.log(this.data.signIndex)
          if (this.data.signIndex == null) this.getSigning()
          else this.getHisSign()
        })
      } else {
        $Toast({
          content: '验证码错误！',
          type: 'error'
        });
      }

    }
  },
  // 获取学生输入的验证码
  getSignCode(e) {
    console.log(e)
    this.setData({
      signCode: e.detail.value
    })
  }
})