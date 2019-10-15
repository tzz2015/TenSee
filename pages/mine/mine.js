// pages/mine/mine.js
//获取应用实例
const app = getApp()
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')
const util = require('../../utils/util.js')
const imageUtil = require('../../utils/chooseMedia.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dialogShow: false,
    buttons: [{
      text: '确定'
    }],
    inputValue: "",
    phoneDialogShow: false
  },
  //事件处理函数
  editName: function() {
    this.setData({
      inputValue: app.globalData.userInfo.realName != null ? app.globalData.userInfo.realName : app.globalData.userInfo.nickName,
      dialogShow: true
    })
  },
  timeLine: function() {
    wx.showToast({
      title: "老蒙又看书去了，没有写！",
      icon: "none"
    })
    imageUtil.chooseImage(9,
      data => {
        console.log(data)
        imageUtil.uploadFile(data[0])
      }
    )
  },
  //事件处理函数
  editPhone: function() {
    this.setData({
      phoneDialogShow: true
    })
  },
  onLoad: function() {
    app.allowShare()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getOpenId()
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      this.getUser(app.globalData.userInfo)
      wx.stopPullDownRefresh()
    }, 500)
  },
  // 请求用户信息
  getUser: function(userInfo) {
    netUtil.postRequest("updateUser", userInfo,
      data => {
        if (data) {
          app.globalData.userInfo = data
          this.setData({
            userInfo: data,
            hasUserInfo: true
          })
        }

      },
      msg => {
        console.log(msg)
      }
    )
  },
  // dialog 输入框监听
  bindKeyInput: function(e) {
    app.globalData.userInfo.realName = e.detail.value
  },
  // phonedialog 输入框监听
  bindPhoneInput: function(e) {
    app.globalData.userInfo.phone = e.detail.value
  },
  // dialog 按钮监听
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    if (app.globalData.userInfo.realName == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return
    }
    this.getUser(app.globalData.userInfo)
    this.setData({
      dialogShow: false,
    })
  },
  // phonedialog 按钮监听
  phoneDialogButton(e) {
    console.log('phonedialog', e.detail)
    if (app.globalData.userInfo.phone == "" || app.globalData.userInfo.phone == null) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
      })
      return
    }
    this.getUser(app.globalData.userInfo)
    this.setData({
      phoneDialogShow: false,
    })
  },
  getOpenId: function() {
    var that = this
    wx.login({
      success(res) {
        console.log(res);
        netUtil.postRequest("login", res,
          data => {
            console.log(data)
            app.globalData.openId = data.openid
            that.getUser(that.data.userInfo)
          },
          msg => {
            console.log(msg)
          }
        )
      },
      fail(msg) {
        console.log(msg);
      }
    })
  },
})