//index.js
//获取应用实例
const app = getApp()
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')

Page({
  data: {
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.getUser(app.globalData.userInfo)
    } else {
      app.userInfoReadyCallback = res => {
        this.getUser(res.userInfo)
      }
    }
  },
  getUser: function (userInfo) {
    netUtil.postRequest("updateUser/", userInfo,
      data => {
        console.log(data)
        app.globalData.userInfo=data
        if (!app.globalData.userInfo.realName){
          this.setData({
            dialogShow: true,
          })
        }
      },
      msg=> {
        console.log(msg)
      }
    )
  },
  onShow: function () {
  },
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    this.setData({
      dialogShow: false,
    })
  },

})