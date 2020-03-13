// pages/index/homework/homeList/homeList.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeList: [],
    answer: {},
    answerList: [],
    homeIndex: -1,
    homeworkTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //页面加载时根据已保存答案填写到页面中  
    // this.setData({
    //   homeIndex: options.index
    // })
    // let answer = wx.getStorageSync("answer");
    // let newList = this.data.homeList
    // for (let key in answer) {
    //   newList[key].answer = answer[key]
    // }
    // // console.log(newList);
    // this.setData({
    //   homeList: newList
    // })
    this.getHomeWorkDetail(options.id)
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
  submit() { //提交并且保存作业

    //请求

    console.log(this.data.answerList)
    app.globalData.api.default.submitHomeWork(this.data.answerList).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      wx.showToast({
        title: '提交成功!',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          //返回上一层
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
        },
      });
    })




  },
  // keep() { //保存但不提交
  //   let oldAnswer = wx.getStorageSync("answer")
  //   let newAnswer = this.data.answer;
  //   if (!oldAnswer || JSON.stringify(oldAnswer) == "{}") {
  //     oldAnswer = newAnswer
  //   } else {
  //     for (let key in oldAnswer) {
  //       for (let i in newAnswer) {
  //         if (i == key) {
  //           oldAnswer[key] = newAnswer[i];
  //         } else {
  //           oldAnswer[i] = newAnswer[i];
  //         }
  //       }
  //     }
  //   }
  //   let counts = 0;
  //   for (let key in oldAnswer) {
  //     if (oldAnswer[key].replace(/\s*/g, "") == '') {
  //       delete oldAnswer[key]
  //     } else {
  //       counts++
  //     }
  //   }
  //   let homeCounts = wx.getStorageSync("homeCounts") || {};

  //   homeCounts[this.data.homeIndex] = counts;
  //   wx.setStorageSync("homeCounts", homeCounts)

  //   wx.setStorageSync("answer", oldAnswer);

  //   wx.showToast({
  //     title: '保存成功!',
  //     icon: 'success',
  //     image: '',
  //     duration: 1500,
  //     mask: false,
  //     success: (result) => {
  //       //返回上一层
  //       // setTimeout(() => {
  //       //   wx.navigateBack({
  //       //     delta: 1
  //       //   });
  //       // }, 1500)
  //     },
  //   });

  // },
  getChoAnswer(e) { //获取选择题的答案
    // console.log(e.target.dataset.index,e.detail.value);
    this.data.answer[e.target.dataset.index] = e.detail.value;
    this.data.answerList[e.target.dataset.index].titleAnswer = e.detail.value
    if (e.target.dataset.answer.toUpperCase() == e.detail.value.toUpperCase()) {
      this.data.answerList[e.target.dataset.index].titleTrue = 'true'
    } else {
      this.data.answerList[e.target.dataset.index].titleTrue = 'false'
    }
  },
  getJudAnswer(e) { //获取判断题的答案
    // console.log(e.target.dataset.index,e.detail.value);
    this.data.answer[e.target.dataset.index] = e.detail.value;
    this.data.answerList[e.target.dataset.index].titleAnswer = e.detail.value
    if (e.target.dataset.answer == e.detail.value) {
      this.data.answerList[e.target.dataset.index].titleTrue = 'true'
    } else {
      this.data.answerList[e.target.dataset.index].titleTrue = 'false'
    }
  },
  getEssAnswer(e) { //获取简答题的答案
    this.data.answerList[e.target.dataset.index].titleAnswer = e.detail.value
    this.data.answerList[e.target.dataset.index].titleTrue = ''
  },
  getFillAnswer(e) { //获取填空题的答案
    this.data.answerList[e.target.dataset.index].titleAnswer = e.detail.value
    this.data.answer[e.target.dataset.index] = e.detail.value;
    if (e.target.dataset.answer == e.detail.value) {
      this.data.answerList[e.target.dataset.index].titleTrue = 'true'
    } else {
      this.data.answerList[e.target.dataset.index].titleTrue = 'false'
    }
    console.log(e.target.dataset.answer, e.detail.value)
  },
  // 获取作业内容
  getHomeWorkDetail(id) {
    let that = this
    app.globalData.api.default.getHomeWorkDetail({
      homeworkId: id
    }).then(res => {
      console.log(res)
      if (res.data.code !== 0) return
      let list = res.data.data.titleList || []
      that.setData({
        homeList: list,
        homeworkTitle: res.data.data.homeworkTitle
      }, () => {
        let l = [];
        list.forEach(item => {
          let obj = {}
          obj.homeworkId = id;
          obj.titleId = item.titleId;
          obj.studentId = app.globalData.studentId
          l.push(obj)
        })
        that.setData({
          answerList: l
        })
      })
    })
  }
})