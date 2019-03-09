const {
    $Toast
} = require('../../lib/dist/base/index');

Page({
    data: {
        resumes: [{
                name: "默认简历",
                description: "针对产品岗位"
            },
            {
                name: "运营岗简历",
                description: "1.0待修改"
            }
        ],
        showEditModal: false,
        currentEditing: 0,
        currentVal: null,
        showDeleteModal: false,
        deleteId: 0
    },

    onLoad: function(options) {
        // 去服务器获取简历信息存到resumes
    },

    // 编辑简历名字和描述
    editName: function(event) {
        let id = parseInt(event.currentTarget.id);
        // 弹窗
        this.setData({
            currentEditing: id,
            currentVal: this.data.resumes[id],
            showEditModal: true
        });
    },

    // 阻止背景被拉动
    preventTouchMove: function() {},

    // 编辑过程
    inputChange: function(event) {
        let which = event.currentTarget.id;
        let val = this.data.currentVal;
        if (which === 'descriptionEdit')
            val.description = event.detail.value;
        else
            val.name = event.detail.value;
        this.setData({
            currentVal: val
        });
    },

    // 隐藏名称编辑对话框
    hideEditModal: function() {
        this.setData({
            showEditModal: false
        });
    },

    // 确认修改
    onConfirm: function() {
        this.hideEditModal();
        // 在这里获取修改内容并传给服务器，保存修改内容
        let id = this.data.currentEditing;
        let res = this.data.resumes;
        let before = res[id];
        // 成功提示，不管是不是一致都会显示
        $Toast({
            content: '修改成功',
            type: 'success'
        });
        // 本地修改并发往服务器
        let after = this.data.currentVal;
        // 对长度为0的，变回默认值
        if (after.name === '')
            after.name = '默认简历';
        if (after.description === '')
            after.description = '无描述';
        // 替换本地数据
        res.splice(id, 1, after);
        console.log(res);
        this.setData({
            resumes: res
        });
        // 将改变内容发往服务器...
    },

    // 点击详情进入编辑和查看
    seeDetail: function(event) {
        let id = parseInt(event.currentTarget.id);
        wx.navigateTo({
            url: 'detail/detail?id=' + id,
        });
    },

    // 添加新简历
    addResume: function(event) {
        console.log("添加新简历");
        // 导航到detail页面进行填写……
    },

    // 删除简历
    deleteThis: function(event) {
        let id = parseInt(event.currentTarget.id);
        this.setData({
            showDeleteModal: true,
            deleteId: id
        });
    },

    // 确认删除
    onConfirmDelete: function() {
        this.hideDeleteModal();
        let res = this.data.resumes;
        let id = this.data.deleteId;
        res.splice(id, 1);
        this.setData({
            resumes: res
        });
        // 显示删除成功
        $Toast({
            content: '删除成功',
            type: 'success'
        });
        // 告知服务器。。。
    },

    // 取消删除
    onCancelDelete: function() {
        this.hideDeleteModal();
    },

    // 隐藏删除对话框
    hideDeleteModal: function () {
        this.setData({
            showDeleteModal: false
        });
    },
})