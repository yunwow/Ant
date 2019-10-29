// pages/usercenter/couponlist/couponlist.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[]
  },
  getlist() {
    if (app.globalData.udata.userId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.getCoupons({
      userId: app.globalData.udata.userId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({ listdata: res.data.Data })
      } else {
        tool.alert('获取课程详情失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})