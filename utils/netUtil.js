//获取应用实例
const app = getApp()

/**
 * 供外部post请求调用
 */
function post(url, params, onSuccess, onFailed, isLoading) {
  request(url, params, "POST", onSuccess, onFailed, isLoading);
}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed, isLoading) {
  request(url, params, "GET", onSuccess, onFailed, isLoading);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onStart 开始请求,初始加载loading等处理
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */
function request(url, params, method, onSuccess, onFailed, isLoading) {
  if (isLoading == undefined || isLoading) {
    wx.showLoading({
      title: '正在加载',
    })
  }
  const baseUrl = app.globalData.baseUrl
  wx.request({
    url: baseUrl + url,
    data: dealParams(params),
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'OPENID': app.globalData.openId
    },
    success: function(res) {
      wx.hideLoading()
      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        if (res.data.code == 200) {
          if(onSuccess!=undefined){
            onSuccess(res.data.data); //request success
          }
        } else {
          if (onSuccess != undefined) {
            onFailed(res.data.msg); //request failed
          }
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
        /** end 处理结束*/
      }
    },

    fail: function(error) {
      wx.hideLoading()
      console.log(error)
      if (isLoading == undefined || !isLoading) {
        wx.showToast({
          title: error.errMsg,
          icon: none
        })
      }
      onFailed(error.errMsg); //failure for other reasons
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  return params;
}

module.exports = {
  postRequest: post,
  getRequest: get,
}