App({
  // 小程序初始化完成触发，只会触发一次
  // option有小程序的路径、query、入口来源信息等
  onLaunch: function (options) {
    console.log('onLaunch');
  },
  onShow: function () {
    console.log('onshow');
  },
  onHide: function () {
    console.log('onHide');
  },
  // 全局错误监听函数
  onError: function (e) {
    console.log('onError', e);
  },
  globalFunction: function () {
    console.log('我是自定义全局函数');
  },
  // 定义全局数据
  globalData: {
    userInfo: null
  }
})