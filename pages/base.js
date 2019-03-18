const app = getApp()

module.exports.filter = function (obj) {
  let states = obj.state ? obj.state : {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
  }

  // 添加状态管理
  app.connector.connectPage(states)(obj)

  obj.inputChange = function (e) {
    let data = {}
    data[e.currentTarget.dataset.name] = e.detail.value
    this.setData(data)
  }

  // 为每一个页面注入get方法
  obj.$get = function (url, querys) {
    return app.$get(url, querys)
  }

  // 为每一个页面注入post方法
  obj.$post = function (url, params, querys) {
    return app.$post(url, params, querys)
  }

  return obj
}