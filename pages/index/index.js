//index.js
//获取应用实例
const app = getApp()
var WxSearch = require('../../lib/wxSearch/wxSearch.js');
const {
    $Toast
} = require('../../lib/dist/base/index');

Page({
    data: {
        wxSearchData: null,
        offset: 0,
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

    onLoad: function() {
        // console.log('onLoad');
        let that = this;
        //初始化的时候渲染wxSearchdata
        WxSearch.init(that, 53, app.globalData.hotKeys);
        WxSearch.initMindKeys(app.globalData.mindKeys);
        that.search();
    },

    // 跳转条件筛选界面
    selectConditions: function(event) {
        let dest = event.target.id;
        wx.navigateTo({
            url: '../condition/condition?choice=' + dest,
        })
    },

    // 下拉刷新
    onPullDownRefresh: function() {
        let that = this;
        // that.setData({
        //     pageIndex: 0,
        // })
        that.gainLoadingListData();
    },

    // 刷新
    gainLoadingListData: function() {
        let that = this;
        // 向服务器请求数据并更新页面
        wx.showNavigationBarLoading() //在标题栏中显示加载
        $Toast({
            content: '拼命加载中',
            type: 'loading'
        });
        setTimeout(() => {
            // 停止页面下拉刷新
            wx.stopPullDownRefresh();
            wx.hideNavigationBarLoading();
            $Toast({
                content: '刷新成功',
                type: 'success'
            });
        }, 1000);
    },

    // 上拉加载
    onReachBottom: function() {
        let that = this;
        that.setData({
            offset: that.data.offset + 10, // 加载新的10条
        })
        // 上拉获取更多数据
        this.gainMoreLoadingListData()
    },

    gainMoreLoadingListData: function() {
        let that = this;
    },

    // 搜索函数
    search: function() {
        var that = this;
        WxSearch.wxSearchAddHisKey(that);
        var words = that.data.wxSearchData.value;
        // 将words发送到服务器请求数据
        console.log(words);
        // 处理搜索到的数据。。。
    },

    // 查看详情
    seeDetails(event) {
        let id = event.currentTarget.id;
        wx.navigateTo({
            url: 'detail/detail?id=' + id,
        });
    },

    // 搜索栏定义的方法
    wxSearchInput: function(e) {
        var that = this
        WxSearch.wxSearchInput(e, that);
    },
    wxSerchFocus: function(e) {
        var that = this
        WxSearch.wxSearchFocus(e, that);
    },
    wxSearchBlur: function(e) {
        var that = this
        WxSearch.wxSearchBlur(e, that);
    },
    wxSearchKeyTap: function(e) {
        var that = this
        WxSearch.wxSearchKeyTap(e, that);
        // console.log("search key tap");
    },
    wxSearchDeleteKey: function(e) {
        var that = this
        WxSearch.wxSearchDeleteKey(e, that);
    },
    wxSearchDeleteAll: function(e) {
        var that = this
        WxSearch.wxSearchDeleteAll(that);
    },
    wxSearchTap: function(e) {
        var that = this;
        WxSearch.wxSearchHiddenPancel(that);
        WxSearch.wxSearchAddHisKey(that);
        // console.log("search tap");
        this.search()
    }
})