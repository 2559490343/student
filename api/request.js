const wxRequest = (method, url, data) => {
  let baseURL = "http://39.108.209.99:8080";

  return new Promise((resolve, reject) => {
    //显示loading
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: baseURL + '' + url,
      method: method,
      data: data,
      // header: {
      //   'Content-Type': 'application/json',
      //   'token': wx.getStorageSync("token")
      // },
      header: {
        'Content-Type': 'application/json',
        'token': '222222'
      },
      success(request) {
        //隐藏loading
        wx.hideLoading();

        // token密钥
        // let token = request.header["token"];
        // if (token != null) {
        //   wx.setStorageSync("token", token);
        // }

        if (request.data.code !== 0) {
          //显示错误信息
          wx.showToast({
            title: request.data.message,
            icon: 'none',
          })
        }
        resolve(request);
      },
      fail(error) {
        //隐藏loading
        wx.hideLoading();
        reject(error);
      }
    })
  });
}
export default {
  wxRequest
}