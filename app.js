const store = require('./store/index')
const oss = require('./utils/oss');
const util = require('./utils/util');
const authApi = [
  "POST/user/update",
  "POST/user/get",
]

App(store.connector.connectApp({
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
})({

  // 全局变量
  globalData: {
    mode: "prod",
    devUrl: "http://127.0.0.1:9080",
    prodUrl: "https://mini-app.lflyes.com",
    toSubmitCard:{},
  },

  connector: store.connector,
  util: util,

  onLaunch: function () {
    if (wx.getStorageSync("mode")) {
      this.globalData.mode = wx.getStorageSync("mode")
    }
    this.login()
  },

  onShow: function () {
  },

  login: function () {
    wx.login({
      success: res => {
        setTimeout(()=>{
          this.$post("/passport/login",{
            code: res.code
          }).then((ures)=>{
            console.log(ures)
            this.dispatcher.user.setUserInfo(ures.data)
          })
        },100)
      }
    })
  },

  '$toast': function (msg) {
    wx.showToast({
      title: msg,
      duration: 2000,
      icon: "none"
    })
  },

  chooseImage: function (option) {
    let success = option.success
    // let accessid = "LTAITC3alsXDpEXJ";
    // let accesskey = "nssKnmbNCBZ50U6InaGAPY9xpEaN6R";
    // let url = "https://mlboos.oss-cn-hangzhou.aliyuncs.com"

    const accessid = "LTAIL6uqW8OYb26H";
    const accesskey = "Y7FpBLPhIxcISS5YIJMw15blmvvk78";
    const url = "https://lflyesmini.oss-cn-hangzhou.aliyuncs.com"
    let form = oss.getUploadForm(accessid, accesskey)
    wx.chooseImage({
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          formData: form,
          name: "file",
          filePath: tempFilePaths[0],
          url: url,
          success: function (dres) {
            option.success({
              tempFilePaths: [url + "/" + form.key]
            })
          }
        })
      },
    })
  },

  "$get": function (url,querys) {
    return this.request("GET",url,querys,null)
  },
  "$post": function ( url,param,querys) {
    return this.request("POST",url,querys,param)
  },
  "$put": function (url,params,querys) {
    return this.request("PUT",url,querys,params)
  },
  "$delete": function (url,params,querys) {
    return this.request("DELTE",url,querys,params)
  },
  "request": function (method,url,querys,params) {
    // if (AuthApi.indexOf(method + url) > -1 &&
    //   this.globalData.token == null) {
    //   return new Promise((resolve,reject) => {
    //     this.login().then((lresp) => {
    //       params.user_id = lresp.id
    //       this.request(method,url,querys,params).then((resp) => {
    //         resolve(resp)
    //       })
    //     })
    //   })
    // }
    if (!querys) {
      querys ={}
    }
    let queryStr = querys ? "?" : ''
    for (let q in querys) {
      queryStr = queryStr + q + "=" + querys[0] + "&"
    }
    return new Promise ((resolve,reject) => {
      wx.request({
        url:this.globalData[this.globalData.mode + "Url"] + url + queryStr,
        method: method,
        data: params,
        header: {
          'TOKEN': this.globalData.userInfo? this.globalData.userInfo.id:""
        },
        success: (res) => {
          let data = res.data
          if (data.error_code !=0) {
            wx.showToast({
              title:data.error_msg ? data.error_msg : "发现未知错误，请联系客服",
              duration: 2000,
              icon: "none"
            })
            reject(res.data)
            return
          }
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.data)
        },
      })
    })
  },
}))