// pages/techPage/techPage.js
const route = require("../../utils/tool/router.js");
const request_01 = require("../../utils/api/request_01.js");
const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		STATICIMG: app.globalData.STATICIMG,
		currtab: 2,
		teachData:null,
		teachid:null,
		worksData:null,
		page:1,
		page1:1,
		fllowData:[],//关注列表
		FenNum:[],//粉丝列表
		hasData:false,
		hasData2: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({ teachid: options.userId})
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
		this.setData({page:1,page1:1,});
		this.getTeach();
		this.GetFollow();
		this.GetFans();
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
		if (this.data.currtab == 2 && this.data.hasData) {
			this.setData({ page: ++this.data.page })
			this.GetFans();
		}
		if (this.data.currtab == 3 && this.data.hasData2){
			this.setData({ page1: ++this.data.page })
			this.guanzhu();
		}
		
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	changeTab(e) {
		let tab = e.currentTarget.dataset.tab;
		this.setData({ currtab: tab })
		console.log(e.currentTarget.dataset.tab);
	},
	getTeach(){
		let dat = {
			userId:this.data.teachid
		}
		request_01.getTeach(dat).then((res)=>{
			// console.log(res);
			if(res.data.Code)
			this.setData({ teachData:res.data.Data})
		})
	},
	guanzhu(){
		let dat = {
			userId: wx.getStorageSync('userdata').userId,
			followUserId:this.data.teachid	
		}
		request_01.PostFollow(dat).then((res)=>{
			console.log(res);
			if(res.data.Code=="200")
			this.getTeach();
		})	
	},
	getwokes(){//获取用户作品
	    let dat = {
			userId:this.data.teachid
		} 
		request_01.GetUserVideos(dat).then((res)=>{
			if(res.data.Code=="200")
				this.setData({ worksData:res.data.Data})
		})
	},
	GetFollow(){//获取用户关注列表
		let dat = {
			userId:this.data.teachid,
			pageSize:10,
			pageIndex: this.data.page
		}
		let arr = this.data.fllowData;
		request_01.GetFollow(dat).then((res)=>{
			if (res.data.Code == '200' && res.data.Data.length>0){
				arr = arr.concat(res.data.Data);
				this.setData({ fllowData: res.data.Data, hasData: res.data.Data.length > 0 })
			}
			
		})
	},
	GetFans(){//获取用户粉丝
		let dat = {
			userId:this.data.teachid,
			pageSize:10,
			pageIndex: this.data.page1	
		}
		let arr = this.data.FenNum;
		request_01.GetFans(dat).then((res)=>{
			if (res.data.Code == "200" && res.data.Data.length > 0){
				arr = arr.concat(res.data.Data);
				this.setData({ FenNum: arr, hasData2: res.data.Data.length > 0 })
			}
			
		})
	}
})