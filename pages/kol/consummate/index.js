const app = getApp()
const base = require("../../base.js")
var address = require("../../city.js")
Page(base.filter({
  data: {
    user: {
      name: "我是KOL"
    },
    title: "完善KOL信息",
    sexs: ['请选择', '男', '女'],
    mainTags: ["请选择主标签", "广告"],
    tags: ["请选择", "广告"],
    card: {},

    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    areaInfo: ''

  },

  onLoad(options) {
    // this.$get("/user/get/" + this.data.userInfo.id).then((res) => {
    //   this.setData({
    //     card: res.data
    //   })
    // })

    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id]||[],
    })


  },

  cardChange: function (e) {
    let card = this.data.card
    card[e.currentTarget.dataset.name] = e.detail.value
    this.setData({ card: card })
  },

  changeUserImg: function () {
    app.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceTYpe: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        let card = this.data.card
        card["avatar"] = tempFilePaths[0]
        this.setData({ card: card })
      }
    });
  },

  submit() {
    console.log(this.data.card)
    wx.navigateTo({
      url: "/pages/kol/service/index"
    })
    app.globalData.toSubmitCard = this.data.card
  },

  bindSex(e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindCity(e) {
    let cities = [...e.detail.value]
    // cities.map(item=>{
    //   console.log(item==="全部")
    //   item==="全部"?item='':item;
    //   console.log(item)
    // })

    for (let i = 0; i < cities.length; i++) {
      cities[i] === "全部" ? cities[i] = '' : cities[i];
    }
    this.setData({
      region: cities,
      regionCode: e.detail.code,
    });
    console.log(e.detail.value, this.data.region)
  },

  // 城市选择
  // 点击所在地区弹出选择框
  select: function (e) {
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      this.startAddressAnimation(true)
    }
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      this.animation.translateY(0 + 'vh').step()
    } else {
      this.animation.translateY(40 + 'vh').step()
    }
    this.setData({
      animationAddressMenu: this.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    this.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name||''
    that.setData({
      areaInfo: areaInfo,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id]||[],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id]||[],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation
  }
}))