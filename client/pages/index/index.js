//获取应用实例
var app = getApp();


Page({
      data: {

      },

      setup:function(){
        
      },

      //生命周期函数  页面加载 一个页面只会调用一次 
      onLoad: function () {
        console.log("onload");
        //建立连接
        wx.connectSocket({
          // url: "wss://echo.websocket.org",
          url: "ws://localhost:3001/test",
        })
        // 连接成功
        wx.onSocketOpen(function (res) {
          console.log('连接成功')
          // 发送数据   在onSocketOpen连接成功之后调用
          wx.sendSocketMessage({
            data: 'hello'
          })
        })
        // 连接失败
        wx.onSocketError(function (res) {
          console.log('连接失败')
        })
        // 接收消息
        wx.onSocketMessage(function (res) {
          console.log('收到服务器内容：' + res.data)
        })
        
      },
      onReady: function () {
        // Do something when page ready.
      },
      onShow: function () {
        // Do something when page show.

      },
      onHide: function () {
        // Do something when page hide.
      },
      onUnload: function () {
        // Do something when page close.
      },

})