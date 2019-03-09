# Requests

### 搜索

- 使用位置：`index/index.js/search()`

- 请求数据

  ```json
  {
      (string) key: '阿里',	// 搜索关键字，可以为空
      condition: [
  		['北京', '杭州', ...], // 实习地点选择: array of string
          ['实习', '校招', ...], // 实习种类: array of string
          ['HR', '前端开发', '产品经理', ...] // 职位种类: array of string
      ],
      (int) offset: 0 // 搜索偏移量（初始值为0），默认一次加载10条，所以每次上拉刷新会增加10
  }
  ```

- 返回数据

  ```json
  {
      res: [
          {
              (string) uid: '123456',
              (string) name: "HR实习",
              (string) thumb: "https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
              (int) viewed: 1000, // 被查看次数
              (strinig) place: "滴滴实习-北京",
              (string) salary: "150-200/天",
              (string) workload: "3-5天/周",
              (boolean) isUrgent: true, // 是否为急招
              (boolean) isTop: true // 是否置顶
          }, {
              ...
          }
  	]
  }
  ```

### 职位详情

- 使用位置：`index/detail/detail.js/onLoad()`

- 请求数据

  ```json
  {
      (string) user: 'aaa', // 微信id
  	(string) uid: '123456' // 职位编号
  }
  ```

- 返回数据

  ```json
  {
      (string) thumb: "https://avatar.csdn.net/2/5/2/3_weixin_38047955.jpg",
      (string) name: "策略产品实习生",
      (string) place: "滴滴出行-北京",
      (string) salary: "150-200/天",
      (string) workload: "4-5天/周",
      (string) email: "test@qq.com",
      (string) instruct: "ttt", // 投递方式备注
      (string) description: "aaabbbhihkkjkjuhigb", // 职位详情
      (boolean) isFavored: true // 该用户是否收藏
  }
  ```

### 收藏

- 收藏变更

  - 使用位置：`index/detail/detail.js/favor()`
  - 添加收藏/取消收藏
    - 请求数据

  ```json
  {
      (string) user: 'aaa',
  	(string) uid: '123456',
  	(boolean) add: true // 添加收藏则true，取消收藏为false
  }
  ```

- 收藏列表

  - 使用位置：`mine/favor/favor.js/onLoad()`

  - 请求数据

    ```json
    {
        (string) user: 'aaa'
    }
    ```

  - 返回数据格式同搜索

### 举报某工作页面（ui还没做，可以往后稍稍？）

- 使用位置：`index/detail/detail.js/report`（暂定）

- 举报

  - 请求

  ```json
  {
      (string) reason: "ssssss" // 举报理由，非空
  }
  ```

### 广告和推文

- 备注：需要和公众号绑定才能打开推文；广告需要申请流量主

- 广告

  - 使用位置：`news/news.js/onLoad()`

  - 请求数据

    ```json
    {
        (string) name: 'ads'
    }
    ```

  - 返回数据

    ```json
    {
        thumbs: [
            'http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png',
            'http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png',
            ... // 图片链接；后期加入广告相关参数
        ]
    }
    ```

- 推文

  - 使用位置：`news/news.js/onLoad()`

  - 请求数据

    ```json
    {
        (string) name: 'posts'
    }
    ```

  - 返回数据

    ```json
    {
        res: [
            {
                thumb: "http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png",
                title: "标题",
                head: "副标题",
                description: "说明",
                url: "https://mp.weixin.qq.com/s/SKH5NQyuARFkXUy9W_FSzw"
            }
        ]
    }
    ```

  ### 用户信息

  - 检查申请状态

    - 使用位置：`mine/mine.js/`

    - 请求数据

      ```json
      {
          (string) user: 'aaaa'
      }
      ```

    - 返回数据

      ```json
      {
          res: [
              {
              	(string) thumb: 'http://www.qingpingshan.com/uploads/allimg/170109/201114K11-1.png', // 公司图片缩略图
                  timestamps: [
          			'2019/03/04/23/59',
              		'2019/03/05/00/01',
              		'2019/03/05/01/00',
              		'2019/03/06/09/20',
              		'2019/03/07/12/00',
                  ] // 长度不定(1-5的数组)，分别代表投递、hr查阅、过初筛、过考核、最终录用时间
              }
          ]
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

  

