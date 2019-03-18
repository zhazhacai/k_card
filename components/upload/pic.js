const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    up: function(){
      app.chooseImage({
				url: '',
				success: (res) => {
          let tempFilePaths = res.tempFilePaths;
          let list = this.data.list
          list.push(tempFilePaths[0])
					this.setData({
						list
					});
				},
				fail: (res) => { }
			});
    }
  }
})
