Component({
  options: {
    multipleSlots: true
  },
  properties: {
    user: String,
    title: String
  },
  methods: {
    redirectTo(e) {
      console.log(e)
      if (e.target.id === "d1") {
        wx.redirectTo({
          url: '/pages/kol/notice/notice'
        })
      } else if (e.target.id === "d2") {
        wx.redirectTo({
          url: '/pages/brand/notice/index'
        })
      } else if (e.target.id === "d3") {
        wx.redirectTo({
          url: '/pages/brand/center/index'
        })
      }
    }
  }

})
