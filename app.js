//app.js
const eventBus = require('./utils/eventbus.js')
App({
  globalData: {
    // baseUrl: 'https://mini.test.link-nemo.com:6670/',
    baseUrl: 'https://jenkins.free.idcfengye.com/',
    bus: eventBus.eventBus,
    userInfo: null,
    openId: null
  },
  onLaunch: function() {}
})