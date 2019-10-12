//app.js
const eventBus = require('./utils/eventbus.js')
App({
  globalData: {
    // baseUrl: 'https://mini.test.link-nemo.com:6670/',
    baseUrl: 'http://172.16.20.13:8000/',
    bus: eventBus.eventBus,
    userInfo: null,
    openId: null
  },
  onLaunch: function() {}
})