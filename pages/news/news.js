let app = getApp();

Page({
    data: {
        ads: ['', ''],
        posts: [{
            thumb: '',
            title: "标题",
            subtitle: "副标题",
            url: "https://www.zhihu.com"
        }],
        offLine: false
    },

    // 加载广告和推文
    onLoad: function() {
        let that = this;
        return; // 测试
        // Get ads
        wx.request({
            url: '', // 广告信息接口
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                that.setData({
                    ads: ['https://mmbiz.qlogo.cn/mmbiz_png/Oiay4RsrsDN3WKACkWaMcCFyNLRmFgIzVxiahibrJ507DlPUDib3nJhcEEvXtgmPBRYVIibaPLBsbSQ9WIW4UCaIhuw/0?wx_fmt=png', 'http://upload.art.ifeng.com/2017/0425/1493105660290.jpg',
                        'http://img5.cache.netease.com/photo/0001/2016-09-07/C0BVGRPC6VVV0001.jpg'
                    ],
                    offLine: false
                });
            },
            fail: function(err) {
                console.log(err);
                that.setData({
                    ads: [],
                    offLine: true,
                });
            }
        });

        // Get posts
        wx.request({
            url: '', // 推文信息接口
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                that.setData({
                    posts: [{
                        thumb: "http://upload.art.ifeng.com/2017/0425/1493105660290.jpg",
                        title: "标题",
                        subtitle: "副标题",
                        url: ""
                    }, {
                        thumb: "http://upload.art.ifeng.com/2017/0425/1493105660290.jpg",
                        title: "标题",
                        subtitle: "副标题",
                        url: ""
                    }, {
                        thumb: "http://upload.art.ifeng.com/2017/0425/1493105660290.jpg",
                        title: "标题",
                        subtitle: "副标题",
                        url: ""
                    }],
                    offLine: false
                });
            },
            fail: function(err) {
                console.log(err);
                that.setData({
                    posts: [],
                    offLine: true
                });
            }
        })
    },

    // 进入推文页面
    readPost: function(event) {
        let url = event.currentTarget.id;
        wx.navigateTo({
            url: './detail/detail?url=' + url,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    // 进入广告页面
    readAd: function(event) {
        console.log(event);
        // 暂时不需要写
    }
})