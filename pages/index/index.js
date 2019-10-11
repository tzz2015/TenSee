//index.js
//获取应用实例
const app = getApp()
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')
Page({
  data: {
    baseUrl: "",
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // banner
    background: [],
    // 感言列表
    feelingList: []
  },
  onLoad: function() {
    this.setData({
      baseUrl: app.globalData.baseUrl
    })
    this.getBaner()
    this.getFeelings()
    if (app.globalData.userInfo) {
      this.getUser(app.globalData.userInfo)
    } else {
      app.userInfoReadyCallback = res => {
        this.getUser(res.userInfo)
      }
    }
  },
  // 请求用户信息
  getUser: function(userInfo) {
    netUtil.postRequest("updateUser", userInfo,
      data => {
        console.log(data)
        app.globalData.userInfo = data
        if (!app.globalData.userInfo.realName) {
          this.setData({
            dialogShow: true,
          })
        }
      },
      msg => {
        console.log(msg)
      }
    )
  },
  // 请求感言列表
  getFeelings() {
    netUtil.getRequest("feeling", null,
      data => {
        wx.stopPullDownRefresh()
        console.log(data)
        this.setData({
          feelingList: data,
        })
      },
      msg => {
        wx.stopPullDownRefresh()
        console.log(msg)
      }
    )
  },
  // dialog 按钮监听
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    if (e.detail.index == 1 && app.globalData.userInfo.realName == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return
    }
    if (e.detail.index == 1) {
      this.getUser(app.globalData.userInfo)
    }
    this.setData({
      dialogShow: false,
    })
  },
  // dialog 输入框监听
  bindKeyInput: function(e) {
    app.globalData.userInfo.realName = e.detail.value
  },
  // 请求banner
  getBaner: function() {
    netUtil.getRequest("banner", null,
      data => {
        wx.stopPullDownRefresh()
        console.log(data)
        this.setData({
          background: data,
        })
      },
      msg => {
        wx.stopPullDownRefresh()
        console.log(msg)
      }
    )
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      this.getBaner()
      this.getFeelings()
    }, 500)
  },
})