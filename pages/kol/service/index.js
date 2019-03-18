const app = getApp()
const base = require("../../base.js")
Page(base.filter({
  data:{
    user:{
      name:"我是KOL"
    },
    title:"添加服务介绍",
    type:["请选择服务类型", "广告"],
    agree: false,
    list:[{type:0,price:"",desc:""}]
  },

  change: function (e) {
    console.log(e)
    let list = JSON.parse(JSON.stringify(this.data.list))
    list[e.currentTarget.dataset.index][e.currentTarget.dataset.name] = e.detail.value
    this.setData({list:list})
    console.log(this.data.list)
  },

  add: function(){
    let list = JSON.parse(JSON.stringify(this.data.list))
    list.push({type:0,price:"",desc:""})
    this.setData({list:list})
  },

  doAgree: function(e){
    this.setData({
      agree: !this.data.agree
    })
    console.log(this.data)
  },

  submit(){
    app.globalData.toSubmitCard.services = this.data.list
    this.$post("/card",{}).then((res)=>{
      wx.navigateTo({
        url:"/pages/kol/examining/index"
      })
    })
  }
}))