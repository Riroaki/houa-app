// pages/condition/condition.js
import {
    cities
} from './data/city';
import {
    types
} from './data/type';
import {
    positions
} from './data/position';
const app = getApp();

Page({
    data: {
        currentId: 0,
        choices: [],
        tags: []
    },

    onLoad: function(option) {
        let that = this;
        let titleList = ['实习地点', '工作类别', '行业职位'];
        let id = parseInt(option.choice) - 1;
        that.setData({
            currentId: id,
            tags: app.globalData.conditions[id]
        });
        wx.setNavigationBarTitle({
            title: titleList[id]
        });
    },

    onChange(event) {},

    onReady() {
        let storeChoices = new Array(26);
        const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        words.forEach((item, index) => {
            storeChoices[index] = {
                key: item,
                list: []
            }
        });
        // 根据页面类别，从js数据导入当前选择区域
        let data = cities,
            id = this.data.currentId;
        if (id == 1) data = types;
        else if (id == 2) data = positions;
        // 导入数据
        data.forEach((item) => {
            let firstName = item.pinyin.substring(0, 1);
            let index = words.indexOf(firstName);
            storeChoices[index].list.push({
                name: item.name,
                key: firstName
            });
        });
        // 移除没有元素的字母项
        let tmp = []
        for (let i = 0; i < storeChoices.length; i++)
            if (storeChoices[i].list.length > 0)
                this.data.choices.push(storeChoices[i]);
        this.setData({
            choices: this.data.choices
        });
        console.log(this.data.choices);
    },

    tapItem: function(event) {
        let that = this,
            data = this.data.tags,
            myName = event._relatedInfo.anchorTargetText;
        // 如果点在了字母上
        if (myName.length == 1) return;
        // 如果已经在选中列表中出现了
        for (let i = 0; i < data.length; i++)
            if (data[i].name == myName) return;
        this.data.tags.push({
            name: myName,
            checked: true
        });
        // 刷新tags显示
        this.setData({
            tags: this.data.tags
        })
    },

    // 改变tag的选中状态
    onTagChange(event) {
        const detail = event.detail;
        this.setData({
            ['tags[' + event.detail.name + '].checked']: detail.checked
        })
    },

    // 清空tags，包括本地和全局的搜索
    clearTags: function() {
        let id = this.data.currentId;
        this.data.tags.length = 0;
        app.globalData.conditions[id].length = 0;
        // 刷新tags显示
        this.setData({
            tags: []
        });
    },

    // 保存筛选并返回并搜索（如果点击右上角则不会保存当前筛选结果）
    returnAndSearch: function() {
        let id = this.data.currentId;
        // 每一项内容 = name + checked
        app.globalData.conditions[id] = this.data.tags;
        wx.navigateBack({
            delta: 1,
        });
    }
})