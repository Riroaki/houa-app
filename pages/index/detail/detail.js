const {
    $Toast
} = require('../../../lib/dist/base/index.js');

Page({
    data: {
        pic: "https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
        title: "策略产品实习生",
        place: "滴滴出行-北京",
        salary: "150-200/天",
        workload: "4-5天/周",
        email: "test@qq.com",
        instruct: "ttt",
        description: "aaabbbhihkkjkjuhigbfghjvgcfhgcfghgfcghgfcghgvcghbvcghbvghbvghbvbnvhnbvbvbvghbvghbvghjvghjgvhgvh\nkhjhhhhbsnkjabdhjabjsiaaabbbhihkkjkjuhigbfghjvgcfhgcfghgfcghgfcghgvcghbvcghbvghbvghbvbnvhnbvbvbvghbvghbvghjvghjgvhgvh\nkhjhhhhbsnkjabdhjabjsi，\n我有一头小毛驴我从来也不骑",
        isFavored: true,
        offLine: false,
        resumes: [{
                name: "默认简历",
                description: "针对产品岗位"
            },
            {
                name: "运营岗简历",
                description: "1.0待修改"
            }
        ],
        showSubmitModal: false,
        currentSelectId: 0
    },

    onLoad: function(option) {
        let that = this;
        let id = option.id;
        // 请求工作的详细信息
        wx.request({
            url: 'www.baidu.com', // 请求单个工作信息的数据
            success(res) {
                that.setData({
                    offLine: false
                    // 需要将数据解析后传给页面
                })
            },
            fail() {
                that.setData({
                    offLine: true
                })
            }
        });
        // 请求简历信息
    },

    copy: function() {
        var that = this;
        wx.setClipboardData({
            data: that.data.email,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        console.log(res.data) // data
                    }
                })
            }
        });
    },

    // TODO：分享
    share: function() {

    },

    // TODO：举报
    report: function() {

    },

    // TODO：收藏
    favor: function() {
        let favor = this.data.isFavored;
        if (favor) {
            // 取消收藏
            // ...
        } else {
            // 添加收藏
            // ...
        }
        this.setData({
            isFavored: !favor
        });
    },

    // 阻止背景被拉动
    preventTouchMove: function() {},

    // 投递弹窗
    submit: function() {
        this.setData({
            showSubmitModal: true
        });
    },

    // 选择简历
    selectResume: function(event) {
        let id = parseInt(event.currentTarget.id);
        this.setData({
            currentSelectId: id
        });
    },

    // 确认提交
    onConfirmSubmit: function() {
        // 隐藏弹窗
        this.setData({
            showSubmitModal: false
        });
        // 显示提交成功
        $Toast({
            content: '提交成功',
            type: 'success'
        });
        // 提交id为currentSelectId序号的简历到服务器
    }
})