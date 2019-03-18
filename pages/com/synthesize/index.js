Page({
  data: {
    user: {
      name: "我是KOL"
    },
    title: "完善KOL信息",
    infoTab: 0,
    currentTab: 0,
    list: [
      {
        name: '我是KOL',
        infoMsg: [
          '免费对接数千全领域广告主',
          '专业广告代理团队低成本服务',
          '分钟级、全天候监控你的短视频播放',
          '加入“催化技”，获得更多平台资源',
        ]
      },
      {
        name: '我是广告主/品牌',
        infoMsg: [
          '免费对接最适合的抖音KOL达人',
          '专业策划、执行团队低成本服务',
          '分钟级、全天候监控短视频广告投放效果',
          '抖音蓝v代运营服务',
        ]
      },
    ],
    Flist:[
      {
        url: './../../assets/img/comslices/Mask.png',
        ranking: '1',
        name: '尼古拉斯赵四',
        fans: '12000w'
      },
      {
        url: './../../assets/img/comslices/Mask.png',
        ranking: '2',
        name: '尼古拉斯赵四',
        fans: '12000w'
      },
      {
        url: './../../assets/img/comslices/Mask.png',
        ranking: '3',
        name: '尼古拉斯赵四',
        fans: '12000w'
      },
      {
        url: './../../assets/img/comslices/Mask.png',
        ranking: '4',
        name: '尼古拉斯赵四',
        fans: '12000w'
      },
    ]
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      infoTab: e.detail.current
    });
  },
  //点击切换
  clickInfoTab: function (e) {
    var that = this;
    if (this.data.infoTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        infoTab: e.target.dataset.current
      })
    }
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

})