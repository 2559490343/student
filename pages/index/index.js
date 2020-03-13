//index.js
//获取应用实例
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasBind: false,
    num: '',
    name: '',
    flag: false,
    change_course_list: [],
    change_index: 0,
    courseName: '',
    visible: false,
    action: [{
        name: '去登录'
      },
      {
        name: '去选课',
        color: '#ff9900'
      },
    ],
    first_flag: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var that = this;
    let first_flag = wx.getStorageSync('first_flag') || null;
    if (first_flag === null || first_flag == true) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            console.log('未授权')
            wx.setStorageSync('first_flag', true)
            that.setData({
              first_flag: true
            })
            wx.hideTabBar()
          } else {
            console.log('已授权')
            if (!wx.getStorageSync('studentNum')) {
              that.setData({
                first_flag: true
              })
              wx.hideTabBar()
            } else {
              wx.setStorageSync('first_flag', false)
              wx.showTabBar()
              that.setData({
                first_flag: false
              }, () => {
                // 获取学生课程列表
                that.getCourseList()
              })
              // 获取微信用户信息
              wx.getUserInfo({
                success: function(res) {
                  console.log(res);
                  let userinfo = res.userInfo;
                  wx.setStorageSync("user", userinfo)
                  typeof cb == "function" && cb()
                }
              })
              // 调登录接口获取学生信息
              app.globalData.api.default.login({
                openId: wx.getStorageSync('openId')
              }).then(res => {
                console.log(res);
                if (res.data.code !== 0) return
                let info = res.data.data || {}
                app.globalData.studentNum = info.studentNum;
                app.globalData.studentId = info.studentId;
                // app.globalData.studentId = 1;
                app.globalData.studentName = info.studentName;
                $Toast({
                  content: `${info.studentName}同学，欢迎您！`,
                  type: 'default'
                });

              })
            }

          }
        }
      })
    } else {
      that.setData({
        first_flag: first_flag
      }, () => {
        console.log('对对对登录')

        if (!that.data.first_flag) {
          console.log('已登录')
        }
      })
    }



  },
  // 获取学生课程列表
  getCourseList() {
    let that = this;
    app.globalData.api.default.getStudentCourse({
      openId: wx.getStorageSync('openId')
    }).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data || [];
      that.setData({
        change_course_list: list
      })
    })
  },
  //跳转授权页面并附带flag判断重定向页面
  toAuth(flag) {
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/auth/auth?to_flag=' + flag,
          })

        } else {
          console.log("已授权")
          if (flag) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            wx.navigateTo({
              url: '/pages/index/selection/selection?first_flag=true',
            })
          }

        }
      }
    })
  },
  // 登录弹窗按钮点击事件
  handleClick({
    detail
  }) {
    if (detail.index === 0) {

      this.toAuth(true)

    } else {

      this.toAuth(false)

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  numInput(e) {
    this.setData({
      num: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 显示切换课程
  showChange() {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 切换课程
  handleChange(e) {
    console.log(e)
    this.setData({
      change_index: e.currentTarget.dataset.index
    })
  },
  // 取消切换课程
  handleCancelChange() {
    this.setData({
      flag: false
    })
    console.log(app.globalData.courseId)
  },
  // 确定切换课程
  handleChangeCourse() {
    if(!this.data.change_course_list.length) {
      this.setData({
        flag: false
      })
      // app.globalData.courseId = '11'
      return
    }
    this.setData({
      courseName: this.data.change_course_list[this.data.change_index].courseName,
      flag: false
    })
    app.globalData.courseId = this.data.change_course_list[this.data.change_index].courseId;
    app.globalData.courseName = this.data.change_course_list[this.data.change_index].courseName;
    $Toast({
      content: '已切换当前课程',
      type: 'success'
    });
  },
  toSelection(e) {
    // 判断是否选择了当前课程，如果没选则不跳转(跳转选课页面除外)
    if (this.isSelectCourse() || e.currentTarget.dataset.index == '1') {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      this.setData({
        visible: true
      })
    }

  },
  // 判断是否选择了当前课程
  isSelectCourse() {
    if (!app.globalData.courseId) return false
    else return true
  },
  hideDialog() {
    this.setData({
      visible: false,
      flag: true
    })
  }
})