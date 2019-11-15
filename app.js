//app.js
const eventBus = require('./utils/eventbus.js')
App({
  globalData: {
    // baseUrl: 'https://mini.test.link-nemo.com:6670/',
    // baseUrl: 'http://172.16.18.251:8000/',
    baseUrl: 'https://lyf.test.link-nemo.com/',
    bus: eventBus.eventBus,
    userInfo: null,
    openId: null,
  },
  onLaunch: function() {

  },
  // 允许转发
  allowShare: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})