# Requests

###请求示例

```json
wx.request({
          //TODO: 修改为真实URL
          url: 'http://localhost:8080/search/job_data',
          data: {
            key: words
            //TODO: 加入更多的请求参数……
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success(res) {
            //处理搜索到的数据
            console.log(res.data.code);
            console.log(res.data.msg);
            console.log(res.data.data[0]);
            console.log(res.data.data[0].title);
          },
          fail(err) {
            //网络错误的情况
            console.log(err);
          }
        });
```

### 搜索

- 使用位置：`index/index.js/search()`

- 请求数据，请求地址 /search/job_data，

  ```json
  {
      key: '阿里',	// 搜索关键字，可以为空
      place: ['北京', '杭州', ...], // 实习地点选择: array of string
      type: ['实习', '校招', ...], // 实习种类: array of string
      category: ['HR', '前端开发', '产品经理', ...], // 职位种类: array of string
      offset: 0 // 搜索偏移量（初始值为0），默认一次加载20条，所以每次上拉刷新会增加20
  }
  ```

- 返回数据

  ```json
  {
    "code":200, //状态码，正常都是200，非200则请求有问题
    "msg":"success", //状态信息
    "data":[{ //一个JSON数组，每一项都是一组实习信息
        "id":1,
        "title":"HR实习",
        "thumb":"https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
        "type":"实习",
        "category":"HR",
        "viewed":1,
        "place":"HR实习-上海",
        "workload":"3-5天/周",
        "salary":"200/天",
        "email":"hr@hr.com",
        "instruction":"邮箱投递",
        "description":"这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习这是一个非常好的HR实习",
        "urgent":true,
        "top":true
      }]
  }
  ```

### 职位详情

- 使用位置：`index/detail/detail.js/onLoad()`

- 请求数据，请求地址 /job/detail

  ```json
  {
    user: 'aaa', // 微信id
  	uid: '123456' // 职位编号
  }
  ```

- 返回数据

  ```json
  {
      //同搜索功能返回的内容，加上
      isFavored: true // 该用户是否收藏
  }
  ```

### 收藏

- 收藏变更

  - 使用位置：`index/detail/detail.js/favor()`
  - 添加收藏/取消收藏
    - 请求数据，请求地址 /job/modify_favored

  ```json
  {
    user: 'aaa',
  	uid: '123456',
  	status: true // 添加收藏则true，取消收藏为false
  }
  ```

  - 此类请求返回内容: 

  ```json
  {
    "code":200, //状态码，正常都是200，非200则请求有错误
    "msg":"success", //状态信息
    "data":{} //一般data为空，通过code或msg来判断操作是否成功
  }
  ```

  

- 收藏列表

  - 使用位置：`mine/favor/favor.js/onLoad()`

  - 请求数据，请求地址 /job/favored_list

    ```json
    {
        user: 'aaa'
    }
    ```

  - 返回数据格式同搜索

### 举报某工作页面（ui还没做，可以往后稍稍？）

- 使用位置：`index/detail/detail.js/report`（暂定）

- 举报

  - 请求，请求地址 /job/report

  ```json
  {
    user: 'aaa', //举报用户id
    uid: '123'， //举报的工作项目id（如果有）
    reason: "ssssss" // 举报理由
  }
  ```

### 广告和推文

- 备注：需要和公众号绑定才能打开推文；广告需要申请流量主

- 广告

  - 使用位置：`news/news.js/onLoad()`

  - 请求数据，直接请求地址：/news/ads

  - 返回数据

    ```json
    {
      "code":200, //状态码，正常都是200，非200则请求有错误
      "msg":"success", //状态信息
      "data": [
            'http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png',
            'http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png',
            ... // 图片链接；后期加入广告相关参数
        ]
    }
    ```

- 推文

  - 使用位置：`news/news.js/onLoad()`

  - 请求数据 直接请求地址：/news/posts

  - 返回数据

    ```json
    {
      "code":200, //状态码，正常都是200，非200则请求有错误
      "msg":"success", //状态信息
      "data": [{
        thumb: "http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png",
        title: "标题",
        head: "副标题",
        description: "说明",
        url: "https://mp.weixin.qq.com/s/SKH5NQyuARFkXUy9W_FSzw"
        }]
    }
    ```

  ### 用户信息

  - 检查申请状态

    - 使用位置：`mine/mine.js/`

    - 请求数据：请求地址：/users/info

      ```json
      {
          user: 'aaaa'
      }
      ```

    - 返回数据

      ```json
      {
        "code":200, //状态码，正常都是200，非200则请求有错误
        "msg":"success", //状态信息
        "data": {
          "user": 'aaaa', //用户名
          "current_status": "投简历", //当前状态（与界面文字一致）这里需要考虑投递多家公司情况
          "logs": [
            "2019年2月19日 14:55:66 投xxx简历",
            "2019年3月24日 12:33:44 过xxx初筛",
            ……
          ]
             
         }
      }
      ```

  - 个人简历（未完成）

    - 请求简历名称和描述
    - 请求简历内容
    - 发送简历内容
    - 选择简历投递某家公司

  - 浏览列表

    - 同收藏列表

  - 意见反馈

    - 同举报页面

  - 在线客服

    - 无请求

  

