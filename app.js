//app.js
App({
  onLaunch: function() {
    //调用登录接口拿openId
    wx.login({
      success: function(res) {
        // 拿到登录code
        // console.log(res);
        let code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          method: 'GET',
          data: {
            appid: 'wx78c4832fcb6108cb',
            secret: '2ee74fc44d14012bfc7aa7dd7e2ed6ec',
            js_code: code,
            grant_type: 'authorization_code'
          },
          success(res) {
            // console.log(res.data.openid)
            let openId = res.data.openid;
            wx.setStorage({
              key: 'openId',
              data: openId,
            })
          }
        })

      }
    })
  


  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          // 拿到登录code
          // console.log(res);
          let code = res.code;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            method: 'GET',
            data: {
              appid: 'wx78c4832fcb6108cb',
              secret: '2ee74fc44d14012bfc7aa7dd7e2ed6ec',
              js_code: code,
              grant_type: 'authorization_code'
            },
            success(res) {
              console.log(res.data.openid)
              let openId = res.data.openid;
              wx.setStorage({
                key: 'openId',
                data: openId,
              })
            }
          })

        }
      })
    }
  },
  globalData: {
    userInfo: null,
    hasBind: false,
    homeCounts: {},
    courseId: null,
    courseName: '',
    first_flag: false,
    studentNum: '',
    studentName: '',
    api: require("./api/api.js")
  },

  // systemInfo: null,



})