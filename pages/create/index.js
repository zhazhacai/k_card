const app = getApp()
const base = require("../base.js")

Page(base.filter({
  state:{
    userInfo: state => state.user.userInfo,
  },
  data:{
    user:{
      name:"选择自己的角色"
    },
    title:"创建KCard" 
  },
  goto: function(e){
    if(e.detail.iv){
      wx.login({
        success: res => {
          setTimeout(()=>{
            e.detail.code = res.code
            app.$post("/user/wxUpdatePhone",e.detail).then(()=>{
              wx.navigateTo({
                url: e.currentTarget.dataset.url
              })
            })
          },100)
        }
      })
    }
  }
}))