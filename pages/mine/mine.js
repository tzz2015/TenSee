// pages/mine/mine.js
//获取应用实例
const app = getApp()
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')
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
  //事件处理函数
  editPhone: function () {
    this.setData({
      phoneDialogShow: true
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.getAppId()
    e.detail.userInfo.appId = app.globalData.appId
    this.getUser(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      app.getAppId()
      this.getUser(app.globalData.userInfo)
      wx.stopPullDownRefresh()
    }, 500)
  },
  // 请求用户信息
  getUser: function(userInfo) {
    netUtil.postRequest("updateUser", userInfo,
      data => {
        app.globalData.userInfo = data
        this.setData({
          userInfo: data,
          hasUserInfo: true
        })
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
})