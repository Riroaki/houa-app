const app = getApp();

Page({
    data: {
        msg: "Hi朋友！请问您来..."
    },

    taphr: function(event) {
        console.log("tap hr");
        // 0 means hiring people
        app.globalData.userType = 0;
        wx.switchTab({
            url: '../index/index'
        });
    },
    
    tapjh: function(event) {
        console.log("tap job hunter");
        // 1 means seeking jobs
        app.globalData.userType = 1;
        wx.switchTab({
            url: '../index/index'
        });
    }
})