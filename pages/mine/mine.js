const app = getApp();

Page({
    data: {
        stages: ["投简历", "已审阅", "过初筛", "过考核", "待录用"],
        currentStages: [{
            thumb: "https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
            stage: 2
        }]
    },
    onLoad() {
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo);
                        }
                    })
                }
            }
        })
    },

    // 查看简历
    seeResume: function(event) {
        wx.navigateTo({
            url: '../resume/resume',
        });
    },

    // 查看申请状态
    seeMoreStages: function(event) {
        console.log(event);
    },

    // 查看收藏&历史记录
    seeMore: function(event) {
        let dest = event.currentTarget.id;
        wx.navigateTo({
            url: "favor/favor?type=" + dest
        });
    },

    // 意见反馈
    saySomething: function(event) {
        wx.navigateTo({
            url: 'feedback/feedback',
        });
    },

    // 退出登录——其实是回到欢迎页面重新选择意向
    logOut: function(event) {
        wx.redirectTo({
            url: '../welcome/welcome',
        });
    }
})