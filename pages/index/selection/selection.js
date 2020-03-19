// pages/index/selection/selection.js
const app = getApp()
const {
  $Toast
} = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    first_flag: null, //判断是否为第一次进入选课页面
    user: {},
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
    studentName: '',
    studentNum: null,
    courseName: '',
    courseCode: '', // 课程邀请码
    courseId: '', //点击选课的课程id
    index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(typeof options.first_flag);
    this.setData({
      first_flag: options.first_flag
    })
    this.getPublishCourse()
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

  selectedCourse(e) { //可选选课按钮事件
    let selected = e.target.dataset.selected;
    this.setData({
      visible: true,
      courseId: e.target.dataset.courseid,
      index: e.target.dataset.index
    })
    // if (this.data.first_flag === 'true') {
    //   // 第一次选课
    //   this.setData({
    //     visible: true
    //   })
    // } else {
    //   //第二次选课
    //   this.setData({
    //     visible: true
    //   })
    // }

  },
  // 输入邀请码搜索课程
  // search() {
  //   console.log(999)
  // },
  //获取搜索框输入的内容
  searchCourseName(e) {
    console.log(e.detail.value)
    this.setData({
      courseName: e.detail.value
    })
  },
  //第一次选课对话框按钮事件
  handleClick({
    detail
  }) {
    if (detail.index === 0) {
      // 取消按钮
      this.setData({
        visible: false
      });
    } else {
      console.log(this.data.courseId)
      if (!this.data.studentName.trim() && this.data.first_flag === 'true') {
        $Toast({
          content: '姓名不能为空！',
          type: 'warning'
        });
        return
      } else if (!this.data.studentNum && this.data.first_flag === 'true') {
        $Toast({
          content: '学号不能为空！',
          type: 'warning'
        });
        return
      } else if (!this.data.courseCode) {
        $Toast({
          content: '邀请码不能为空！',
          type: 'warning'
        });
        return
      }
      let that = this;
      // 提交按钮
      app.globalData.api.default.joinCourse({
        studentNum: parseInt(that.data.studentNum) || app.globalData.studentNum,
        studentName: that.data.studentName || app.globalData.studentName,
        openId: wx.getStorageSync('openId'),
        code: that.data.courseCode,
        cid: that.data.courseId
      }).then(res => {
        console.log(res)
        if (res.data.code !== 0) return
        that.setData({
          visible: false
        });
        $Toast({
          content: '选课成功！',
          type: 'success'
        });
        wx.setStorageSync('first_flag', false)
        if (that.data.studentNum) wx.setStorageSync('studentNum', that.data.studentNum)
        let newList = [];
        newList = this.data.courseList.concat(newList);
        newList[that.data.index].selected = true;
        that.setData({
          courseList: newList
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }, 1500);
      })
    }
  },
  // 获取学生输入的姓名事件
  getStudentName(e) {
    this.setData({
      studentName: e.detail.value
    })
  },
  // 获取学生输入的学号事件
  getStudentNum(e) {
    this.setData({
      studentNum: e.detail.value
    })
  },
  // 获取学生输入的邀请码
  getStudentCode(e) {
    this.setData({
      courseCode: e.detail.value
    })
  },
  // 获取当前开放的课程列表
  getPublishCourse() {
    app.globalData.api.default.getPublishCourse().then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      this.setData({
        courseList: res.data.data
      })
    })
  }
})