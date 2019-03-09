Page({
    data: {
        offLine: false,
        jobList: [{
            uid: '123456',
            name: "HR实习",
            thumb: "https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
            viewed: 1000,
            place: "滴滴实习-北京",
            salary: "150-200/天",
            workload: "3-5天/周",
            isUrgent: true,
            isTop: true
        }]
    },

    // 加载数据
    onLoad: function (options) {
        // 检查option是favor还是history
        if (options.type === 'favor') {
            wx.setNavigationBarTitle({
                title: "我的收藏"
            })
            // 获取收藏信息
        } else {
            wx.setNavigationBarTitle({
                title: "浏览记录"
            })
            // 获取历史信息
        }
    },

    // 查看详情
    seeDetails(event) {
        let id = event.currentTarget.id;
        wx.navigateTo({
            url: '../../index/detail/detail?id=' + id,
        });
    }
})