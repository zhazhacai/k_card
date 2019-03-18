const app = getApp()
const base = require("../../base.js")

Page({
   data:{
    user:{
      name:"我是KOL"
    },
    title:"关联各大平台主页的URL",
    platform:[
      {
        icon:"",
        main:true,
        name:"抖音",
        url:"https://www.baidu.com"
      },
      {
        icon:"",
        main:false,
        name:"哔哩哔哩",
        url:""
      }
    ]  
  },

  submit: function(e){
    console.log(e)
    if(e.detail.iv){
      wx.login({
        success: res => {
          setTimeout(()=>{
            e.detail.code = res.code
            app.$post("/user/wxUpdatePhone",e.detail).then((res)=>{
              wx.navigateTo({
                url: e.currentTarget.dataset.url
              })
            })
          },100)
        }
      })
    }
  }
})
  