Page({
    data: {
        actions: [{
            name: "好的"
        }],
        visible: false,
        content: ""
    },

    onLoad: function(options) {

    },

    getContent: function(event) {
        this.setData({
            content: event.detail.value
        });
    },

    handleClose: function(event) {
        this.setData({
            visible: false,
            content: ""
        });
    },

    submit: function(event) {
        if (this.data.content === '')
            return;
        // 显示对话框
        this.setData({
            visible: true
        });
        // 提交用户信息到服务器
        console.log(this.data.content);
    }
})