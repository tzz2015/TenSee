// pages/colletion/colletion.js
// 引入网络请求工具
const netUtil = require('../../utils/netUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 0,
    demand: "",
    demandList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },
  //获取焦点
  onbindfocus(e) {
    console.log(e)
    this.setData({
      bottom: e.detail.height - 50,
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
        console.log(data)
        this.setData({
          demandList: data,
        })
      },
      msg => {
        console.log(msg)
      }
    )
  }
})