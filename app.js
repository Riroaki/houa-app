//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，
                // 不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;
                            console.log(this.globalData.userInfo);

                            // 由于getUserInfo是网络请求，
                            // 可能会在Page.onLoad后才返回
                            // 所以此处加入callback以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                } else {
                    console.log("not authenticated.");
                }
            }
        })
    },
    globalData: {
        userInfo: {},
        userType: 0,
        currentCity: "杭州",
        conditions: [
            [],
            [],
            []
        ],
        hotKeys: ["网易", "阿里", "腾讯"],
        mindKeys: ["前端", "后端", "安卓", "iOS"]
    }
})