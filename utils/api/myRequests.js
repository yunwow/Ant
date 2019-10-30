import $ from './request.js'
const SERVICE = "http://119.23.75.89/"

const myRequest = (data, url, type = 'post') => {
  let key = '';
  let _url = `${SERVICE}${url}`
  console.log("_url", _url)
  let app = getApp();
  console.log(app.globalData.ulogin)
  
  return new Promise((resolve, reject) => {
    $[`${type}P`](_url, data, app.globalData.ulogin ? app.globalData.token : '').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 注册登录
 */
//获取openid
const getOpenid = (data, url = 'Login/Login') => { return myRequest(data, url) }
//手机号解密
const getPhoneNumber = (data, url = '/api/Oauth/decryptedPhone') => { return myRequest(data, url) }
//解密手机号
const decryptnumber = (data, url = 'Login/GetPhoneNumber') => { return myRequest(data, url, 'get') }
//解密手机号
const getSessionKey = (data, url = 'Login/GetSessionKey') => { return myRequest(data, url, 'get') }

/**
 * 安全
 */
//> 获取手机验证码
const Getcode = (data, url = 'Login/GetPhoneCode') => { return myRequest(data, url, 'get') }

/**
 * 个人中心
 */
// 获取积分列表
const getintegral = (data, url = 'Point/GetPointRecord') => { return myRequest(data, url, 'get') }
// 获取积分列表
const uDetail = (data, url = 'User/GetUserDetail') => { return myRequest(data, url, 'get') }
// 查询赠送的卡券 Get
const getCoupons = (data, url = 'Coupon/GetCoupons') => { return myRequest(data, url, 'get') }
// 兑换卡券 Post
const exCoupon = (data, url = 'Coupon/ExchangeCoupon') => { return myRequest(data, url) }

/**
 * 约课
 */
//获取所有门店列表
const getStore = (data, url = 'Store/GetAllStores') => { return myRequest(data, url, 'get') }
//获取最近排课时间列表
const storeTime = (data, url = 'Course/GetNewestCourseTime') => { return myRequest(data, url, 'get') }
//通过门店获取某天排课列表
const getCourse = (data, url = 'Course/GetCoursePlanByStore') => { return myRequest(data, url, 'get') }
//取消用户课程
const cancelCourse = (data, url = 'Course/CancelCourse') => { return myRequest(data, url, 'get') }

/**
 * 课表
 */
//我的课程列表
const mycourse = (data, url = 'Course/MyCourseList') => { return myRequest(data, url, 'get') }
//课程详情
const mycuresDetail = (data, url = 'Course/GetCourseDetail') => { return myRequest(data, url, 'get') }
//评价课程
const evalcourse = (data, url = 'Course/ReviewCourse') => { return myRequest(data, url, 'get') }
//教师课程
const teachercourse = (data, url = 'Course/GetRecommendTeachers') => { return myRequest(data, url, 'get') }





module.exports = {
  myRequest,
  getOpenid,
  Getcode,
  getPhoneNumber,
  getintegral,
  getStore,
  getCourse,
  storeTime,
  mycourse,
  mycuresDetail,
  uDetail,
  evalcourse,
  teachercourse,
  decryptnumber,
  getCoupons,
  exCoupon,
  getSessionKey
}