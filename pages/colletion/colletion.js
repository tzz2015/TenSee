// pages/colletion/colletion.js
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPulic: false,
    bottom: 0,
    demand: "",
    demandList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDemandList()
    app.allowShare()
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      this.getDemandList()
    }, 500)
  },
  //获取焦点
  onbindfocus(e) {
    console.log(e)
    this.setData({
      bottom: e.detail.height - 55,
    })
  },
  // 输入框行数变化时
  bindblur(e) {
    this.setData({
      bottom: 0,
    })
  },
  // 输入监听
  bindinput(e) {
    this.setData({
      demand: e.detail.value,
    })
  },
  // 发布
  sendValue() {
    netUtil.postRequest("add_demand", this.data,
      data => {
        this.getDemandList()
        this.setData({
          demand: "",
        })
      },
      msg => {
        console.log(msg)
      }
    )
  },
  // 获取需求列表
  getDemandList() {
    netUtil.postRequest("demands", null,
      data => {
        wx.stopPullDownRefresh()
        console.log(data)
        this.setData({
          demandList: data,
        })
      },
      msg => {
        wx.stopPullDownRefresh()
        console.log(msg)
      }
    )
  },
  viewTap: function() {
    console.log('view tap')
  },
  // 点赞
  postStart: function(e) {
    console.log(e.currentTarget.id)
    netUtil.postRequest("add_start", {
        id: e.currentTarget.id
      },
      data => {
        this.getDemandList()
        wx.showToast({
          title: '点赞成功',
        })
      },
      msg => {
        console.log(msg)
      }
    )
  },
  onShow: function() {
    this.getShowPulic()
  },
  // 获取tabBar接口
  getShowPulic: function() {
    netUtil.postRequest("switch_tab_bar", null,
      data => {
        if (data == 1) {
          this.setData({
            showPulic: true
          })
        }
      },
      msg => {
        console.log(msg)
      }, false
    )
  }
})