# 修改

首页index hotGoods1 更改为 hotGoods

## 接口文档说明

返回json数据统一格式,示例

		{
            'code' : 1,
            'mes' : 'success',
            'data' : {},
        }

code代表是否成功，1表示成功，0表示失败

mes是提示信息

data是返回的数据，一般是从数据库中取出的数据


### 用户
**注册**
1. 用户名验重

    route：user/register/username
    
    method：post
    
    提交字段： username

    返回示例：

        {
            'code' : 1/0,
            'mes' : 'success/用户名被占用',
            'data' : {},
        }

2. 邮箱验重

    route：user/register/email

    提交字段：email
    
    method：post

    返回示例：

		{
            'code' => 1/0,
            'mes' => 'success/邮箱名被占用',
            'data' => {},
        }

3. 完成注册

    route：user/register/save
    
    method：post

    提交字段：username，email，password，sex，college，enroll_year,address

    返回示例：

		{
            'code' : 1/0,
            'mes' : 'xxxx（提示信息）',
            'data' : {}
        }

**登录**

    route：user/login

    提交字段：email，password
    
    method：post

    返回示例：

		{
            'code' : 0/1/2,
            'mes' : '用户名或密码错误/success/账户还没有激活',
            'data' : {},
        }


**登出**

    route：user/logout

    method：get


**忘记密码**

    route: user/forgetPwd

    method: post

    提交字段：email

    返回示例：

        		{
                    'code' : 0/1/2,
                    'mes' : '邮件发送成功/邮件发送失败',
                    'data' : {},
                }

**重置密码**

    route: user/resetPwd

    method: post

    提交字段： email，password

    返回示例：

    		{
                'code' : 0/1,
                'mes' : '重置密码成功/重置密码失败',
                'data' : {},
            }


**修改用户信息**

    route: user/edit

    method: post

    提交字段： username，college，address

    返回示例：

    		{
                'code' : 0/1,
                'mes' : '',
                'data' : {}/{
                                "id" : 1
                                "name": "lxyer",
                                "college": "软件学院",
                                "address": "韵苑"
                             }
            }

**修改用户头像**

    route: user/headPhoto

    method: post

    提交字段： file (base64编码)

    返回示例：

    		{
                'code' : 0/1,
                'mes' : '上传失败/上传成功',
                'data' : {}/{
                                'src' : xxx,
                             }
            }

**首页土豪榜**

    route: user/index

    method: post

    提交字段：type  (只能是week/total)

    返回示例：

    		{
                'code' : 0/1,
                'mes' : '',
                'data' : {}/
                                 [
                                        {
                                            "id": 29,
                                            "user_id": 34,
                                            "sex": "男",
                                            "college": "",
                                            "enroll_year": "2014",
                                            "address": "韵苑",
                                            "head_photo": "header3.jpg",
                                            "levell": 0,
                                            "score": 0,
                                            "week_score": 0,
                                            "username": "lxyeinsty"
                                        },

                                        {
                                            "id": 30,
                                            "user_id": 36,
                                            "sex": "男",
                                            "college": "机械学院",
                                            "enroll_year": "2014",
                                            "address": "韵苑",
                                            "head_photo": "header2.jpg",
                                            "levell": 1,
                                            "score": 0,
                                            "week_score": 0,
                                            "username": "lxyeinsty"
                                        } 此处省略，一共十个json对象

                                 ]

            }



### 物品

**首页加载更多物品**

    route: goods/index

    method: post

    提交字段：page （从1开始）

    返回示例：

        		{
                    'code' : 0/1,
                    'mes' : '',
                    'data' : {}/ [
                                        {
                                            "id": 39,
                                            "pro_name": "3123",
                                            "parent_cate": "学习用品",
                                            "son_cate": "课内教材",
                                            "contact": "11111111111",
                                            "pro_desc": "312231",
                                            "desire": "31231",
                                            "username": "lxyeins",
                                            "hot": 0,
                                            "receiver": null,
                                            "is_send": 0,
                                            "reg_time": "2015.11.09",
                                            "status": 0,
                                            "activity": 0,
                                            "src": "2cf0449e43228d071c599136a603a790.jpg",
                                            "college": "软件学院",  //主人院系
                                        }

                                        此处省略，一共15个json对象
                                    ]

                }

**发布物品**

    route: goods/issue

    method: post

    提交字段：pro_name,parent_cate,son_cate,contact,pro_desc,desire

    返回示例：

        		{
                    'code' : 0/1,
                    'mes' : "输入信息不符合要求"/"success",
                    'data' : {}/ {"pro_id": 50}
                }


**物品分类分页**

    route: goods/category

    method: post

    提交字段：curPage  (当前页面)

    返回示例：

        		{
                    {
                        "code": 0/1,
                        "mes": ''/"success",
                        "data": {}/{
                            "curPage": "1",
                            "maxPage": 6,
                            "data": [
                                {
                                    "id": 45,
                                    "pro_name": "111",
                                    "parent_cate": "衣服配饰",
                                    "son_cate": "鞋子",
                                    "contact": "11111111111",
                                    "pro_desc": "很好的鞋子",
                                    "desire": "帮助到需要的人",
                                    "username": "lxyeinsy",
                                    "hot": 0,
                                    "receiver": null,
                                    "is_send": 0,
                                    "reg_time": 1449643413,
                                    "status": 0,
                                    "activity": 0,
                                    "src": "3bf2a370941b9003cb5ca6f11150cf74.png",
                                    "college": "",
                                }
                                此处省略，一共15个json对象
                            ]
                        }
                    }
                }


**搜索物品分页**

    route: goods/search

    method: post

    提交字段：curPage  (当前页面)

    返回示例：

                {
                    "code": 0/1,
                    "mes": ""/"success",
                    "data": {
                        "curPage": "1",
                        "maxPage": 7,
                        "data": [
                            {
                                "id": 49,
                                "pro_name": "111",
                                "parent_cate": "衣服配饰",
                                "son_cate": "鞋子",
                                "contact": "11111111111",
                                "pro_desc": "很好的鞋子",
                                "desire": "帮助到需要的人",
                                "username": "lxyeins",
                                "hot": 0,
                                "receiver": null,
                                "is_send": 0,
                                "reg_time": 1449645704,
                                "status": 0,
                                "activity": 0,
                                "src": "145dfa2630e22b9407096913c9597a80.png",
                                "college": ""
                            }
                            此处省略，一共若干个json对象
                            ]
                        }
                }


**我的送送页物品展示（已送出，正在送出，我收到的）**

    route: goods/personal

    method: post

    提交字段：entrance (只能是sent，sending，received)    curPage  (当前页面)

    返回示例：

                {
                    "code": 0/1,
                    "mes": ""/"success",
                    "data": {
                        "curPage": "1",
                        "maxPae": 2,
                        "newNum": 0,
                        "data": [
                            {
                                "id": 49,
                                "pro_name": "111",
                                "parent_cate": "衣服配饰",
                                "son_cate": "鞋子",
                                "contact": "11111111111",
                                "pro_desc": "很好的鞋子",
                                "desire": "帮助到需要的人",
                                "username": "lxyeins",
                                "hot": 0,
                                "receiver": null,
                                "is_send": 0,
                                "reg_time": 1449645704,
                                "status": 0,
                                "activity": 0,
                                "pro_id": 49,
                                "goods_name": "111",
                                "sender_author": "lxyeins",
                                "receiver_author": null,
                                "sender_id": 34,
                                "receiver_id": 0,
                                "src": "145dfa2630e22b9407096913c9597a80.png",
                                ]
                             此处省略，一共8个json对象
                            }
                        }
                }


**个人正在出送中物品展示的分页**

    route: goods/guest

    method: post

    提交字段：id (用户的id)    curPage  (当前页面)

    返回示例：
                    {
                             "code": 0/1,
                             "mes": ""/"success",
                             "data": {
                                 "curPage": "1",
                                 "maxPae": 2,
                                 "newNum": 0,
                                 "data": [
                                     {
                                         "id": 49,
                                         "pro_name": "111",
                                         "parent_cate": "衣服配饰",
                                         "son_cate": "鞋子",
                                         "contact": "11111111111",
                                         "pro_desc": "很好的鞋子",
                                         "desire": "帮助到需要的人",
                                         "username": "lxyeins",
                                         "hot": 0,
                                         "receiver": null,
                                         "is_send": 0,
                                         "reg_time": 1449645704,
                                         "status": 0,
                                         "activity": 0,
                                         "pro_id": 49,
                                         "goods_name": "111",
                                         "sender_author": "lxyeins",
                                         "receiver_author": null,
                                         "sender_id": 34,
                                         "receiver_id": 0,
                                         "src": "145dfa2630e22b9407096913c9597a80.png",
                                         ]
                                      此处省略，一共8个json对象
                                     }
                                 }
                    }


**物品详情页主人把物品送给谁**

    route: goods/give

    method: post

    提交字段：pro_id (送出物品的id)    receiver_id  (收到这到的id)

    返回示例：

                {
                    "code": 0/1,
                    "mes": "fail"/"success",
                    "data": []
                }


**接受者签收**

    route: goods/sign

    method: post

    提交字段：无

    返回示例：

                {
                    "code": 0/1,
                    "mes": "fail"/"success",
                    "data": []
                }


### 评论

**物品详情页评论**

    route: comments/details

    method: post

    提交字段：pro_id (物品的id)    curPage  (当前页面)

    返回示例：
                {
                    "code": 0/1,
                    "mes": ""/"success",
                    "data": {}/{
                        "curPage": "1",
                        "maxPage": 4,
                        "data": [
                            {
                                "id": 79,
                                "parent_id": 0,
                                "pro_id": 49,
                                "sender_id": 38,
                                "receiver_id": 35,
                                "content": "sdfs",   //主评论的内容
                                "status": 0,
                                "reg_time": 1446474401,
                                "sender_author": "lxyien",  //主评论人
                                "receiver_author": "lxy",   //向谁评论
                                "goods_name": "111",
                                "src": "header1.jpg",       //评论者的头像
                                "comments": [               //主评论下的子评论
                                    {
                                        "id": 63,
                                        "parent_id": 79,
                                        "pro_id": 49,
                                        "sender_id": 34,
                                        "receiver_id": 34,
                                        "content": "在来",
                                        "status": 1,
                                        "reg_time": 1446386573,
                                        "sender_author": "lxyeins",
                                        "receiver_author": "lxyeins",
                                        "src": "header1.jpg"
                                    },
                                    {
                                        "id": 73,
                                        "parent_id": 79,
                                        "pro_id": 49,
                                        "sender_id": 34,
                                        "receiver_id": 34,
                                        "content": "niaho",
                                        "status": 1,
                                        "reg_time": 1446389162,
                                        "sender_author": "lxyeins",
                                        "receiver_author": "lxyeins",
                                        "src": "header1.jpg"
                                    }
                                    此处省略，有若干个json对象
                                ]
                            }
                            此处省略，有8个json对象
                        ]
                    }
                }


**我的送送页主人收到的评论**

    route: comments/personal

    method: post

    提交字段： curPage  (当前页面)

    返回示例：
                {
                    "code": 1,
                    "mes": "success",
                    "data": {
                        "curPage": "1",
                        "maxPage": 3,
                        "newNum": 0,
                        "data": [
                            {
                                "id": 78,
                                "parent_id": 0,
                                "pro_id": 49,
                                "sender_id": 34,
                                "receiver_id": 34,
                                "content": "bushi",
                                "status": 1,
                                "reg_time": 1446390367,
                                "sender_author": "lxyeins",
                                "receiver_author": "lxyeins",
                                "goods_name": "111",
                                "src": "header3.jpg"
                            }
                            此处省略，有8个json对象
                        ]
                    }
                }


**发布评论**

    route: comments/add

    method: post

    提交字段：parent_id(父评论的id，如果直接评论物品的话parent_id就是0)，pro_id(物品的id)，receiver_id(接受者的id)
                content(评论的内容)

    返回示例：
    
            {
             "code": 1,
             "mes": "success",
             "data": {
                 "parent_id": "0",
                 "pro_id": "36",
                 "sender_id": 34,
                 "receiver_id": "34",
                 "content": "你好",
                 "status": 0,
                 "reg_time": 1450092930,
                 "id": 81,
                 "sender_author": "lxyeins",
                 "receiver_author": null,
                 "pro_name": "1112",
                 "src": "header3.jpg",
                 "comments": []
             }
         }
         
         
**搜索页面模板**

    route: search?key=关键字
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，max（最大页码数），goods（物品信息）
              
              goods示例：同上面json中的data
              
              [
                  {
                      "id": 33,
                      "pro_name": "13123",
                      "parent_cate": "学习用品",
                      "son_cate": "课内教材",
                      "contact": "11111111111",
                      "pro_desc": "31231",
                      "desire": "1231",
                      "username": "lxyeins",
                      "hot": 5,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1446468866,
                      "status": 0,
                      "activity": 0,
                      "src": "9b124153593fe5304872a47efbf3f431.jpg",
                      "college": "",
                      "has_albums": [
                          {
                              "id": 67,
                              "pid": 33,
                              "album_path": "9b124153593fe5304872a47efbf3f431.jpg"
                          }
                      ]
                  },
                  {
                      "id": 34,
                      "pro_name": "123",
                      "parent_cate": "学习用品",
                      "son_cate": "课内教材",
                      "contact": "11111111111",
                      "pro_desc": "32131",
                      "desire": "31231",
                      "username": "lxyeins",
                      "hot": 44,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1446469005,
                      "status": 0,
                      "activity": 0,
                      "src": "411f1a20bb0e3b9d4ce7e6c8428ea89a.jpg",
                      "college": "",
                      "has_albums": [
                          {
                              "id": 68,
                              "pid": 34,
                              "album_path": "411f1a20bb0e3b9d4ce7e6c8428ea89a.jpg"
                          },
                          {
                              "id": 69,
                              "pid": 34,
                              "album_path": "552790d71a1ce6a623f73328ed48e947.jpg"
                          }
                      ]
                  }
                  此处有若干个对象
              ]
              
              

**物品详情页页面模板**

    route: details?pro_id=物品的id
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，max（评论最大页码数），goods（物品信息），comments(评论信息)
              
              物品信息goods示例：同上面json中的data
              
              {
                  "id": 49,
                  "pro_name": "111",
                  "parent_cate": "衣服配饰",
                  "son_cate": "鞋子",
                  "contact": "11111111111",
                  "pro_desc": "我3123",
                  "desire": "2112",
                  "username": "lxyeins",
                  "hot": 0,
                  "receiver": "lxyeins",
                  "is_send": 0,
                  "reg_time": "2015.12.09",
                  "status": 0,
                  "activity": 0,
                  "src": [
                      "145dfa2630e22b9407096913c9597a80.png",
                      "66fafc1f7c0499b183d8e4cb94b6b271.jpg"
                  ],
                  "user_id": 34,
                  "receiver_id": 0
              }
              
              评论信息comments示例：同上面json中的data
              [
                  {
                      "id": 79,
                      "parent_id": 0,
                      "pro_id": 49,
                      "sender_id": 38,
                      "receiver_id": 35,
                      "content": "sdfs",
                      "status": 0,
                      "reg_time": 1446474401,
                      "sender_author": "lxyien",
                      "receiver_author": "lxy",
                      "goods_name": "111",
                      "src": "header1.jpg",
                      "comments": [
                          {
                              "id": 63,
                              "parent_id": 79,
                              "pro_id": 49,
                              "sender_id": 34,
                              "receiver_id": 34,
                              "content": "在来",
                              "status": 1,
                              "reg_time": 1446386573,
                              "sender_author": "lxyeins",
                              "receiver_author": "lxyeins",
                              "src": "header1.jpg"
                          },
                          {
                              "id": 73,
                              "parent_id": 79,
                              "pro_id": 49,
                              "sender_id": 34,
                              "receiver_id": 34,
                              "content": "niaho",
                              "status": 1,
                              "reg_time": 1446389162,
                              "sender_author": "lxyeins",
                              "receiver_author": "lxyeins",
                              "src": "header1.jpg"
                          }
                      ]
                  },
                  {
                      "id": 78,
                      "parent_id": 0,
                      "pro_id": 49,
                      "sender_id": 34,
                      "receiver_id": 34,
                      "content": "bushi1",
                      "status": 0,
                      "reg_time": 1446390367,
                      "sender_author": "lxyeins",
                      "receiver_author": "lxyeins",
                      "goods_name": "111",
                      "src": "header3.jpg",
                      "comments": [
                          {
                              "id": 47,
                              "parent_id": 78,
                              "pro_id": 28,
                              "sender_id": 34,
                              "receiver_id": 34,
                              "content": "你是",
                              "status": 1,
                              "reg_time": 1446385669,
                              "sender_author": "lxyeins",
                              "receiver_author": "lxyeins",
                              "src": "header3.jpg"
                          }
                      ]
                  },
                  {
                      "id": 77,
                      "parent_id": 0,
                      "pro_id": 49,
                      "sender_id": 34,
                      "receiver_id": 34,
                      "content": "jiushi1",
                      "status": 1,
                      "reg_time": 1446390358,
                      "sender_author": "lxyeins",
                      "receiver_author": "lxyeins",
                      "goods_name": "111",
                      "src": "header3.jpg",
                      "comments": []
                  },
                  {
                      "id": 75,
                      "parent_id": 0,
                      "pro_id": 49,
                      "sender_id": 34,
                      "receiver_id": 34,
                      "content": "jiusi",
                      "status": 1,
                      "reg_time": 1446389194,
                      "sender_author": "lxyeins",
                      "receiver_author": "lxyeins",
                      "goods_name": "111",
                      "src": "header3.jpg",
                      "comments": []
                  }
              ]
              
              


**我的送送模板数据**

    route：user-center?id=xxx
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，max（评论最大页码数），user（主人信息），data（正在送出的信息/新留言信息)
              
              user示例：同上面json中的data   
                       
              {
                  "id": 29,
                  "user_id": 34,
                  "sex": "男",
                  "college": "",
                  "enroll_year": "2014",
                  "address": "韵苑",
                  "head_photo": "header3.jpg",
                  "levell": 3,
                  "score": 70,
                  "week_score": 0,
                  "username": "",
                  "src": "header3.jpg"
              }
              
              
              data示例：
              
              [
                  {
                      "id": 48,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645254,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 48,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "e945314f5d422b77663c37109101ee09.jpg",
                      "has_albums": [
                          {
                              "id": 82,
                              "pid": 48,
                              "album_path": "e945314f5d422b77663c37109101ee09.jpg"
                          }
                      ]
                  },
                  {
                      "id": 47,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645145,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 47,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "13dd53dd39f25f3e8b591927f6272e6a.jpg",
                      "has_albums": [
                          {
                              "id": 81,
                              "pid": 47,
                              "album_path": "13dd53dd39f25f3e8b591927f6272e6a.jpg"
                          }
                      ]
                  }
              ]


**个人中心模板数据**

    route：user-info
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，user（主人信息）
              
              user示例：同上面json中的data   
                       
              {
                  "id": 29,
                  "user_id": 34,
                  "sex": "男",
                  "college": "",
                  "enroll_year": "2014",
                  "address": "韵苑",
                  "head_photo": "header3.jpg",
                  "levell": 3,
                  "score": 70,
                  "week_score": 0,
                  "username": "",
                  "src": "header3.jpg"
              }
              
              

**我的送送模板数据（pc）**

    route：personal?entrance=sending/send/info
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，max（评论最大页码数），user（主人信息），data（正在送出的信息/新留言信息)
              
              user示例：同上面json中的data   
                       
              {
                  "id": 29,
                  "user_id": 34,
                  "sex": "男",
                  "college": "",
                  "enroll_year": "2014",
                  "address": "韵苑",
                  "head_photo": "header3.jpg",
                  "levell": 3,
                  "score": 70,
                  "week_score": 0,
                  "username": "",
                  "src": "header3.jpg"
              }
              
              
              data示例：
              
              [
                  {
                      "id": 48,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645254,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 48,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "e945314f5d422b77663c37109101ee09.jpg",
                      "has_albums": [
                          {
                              "id": 82,
                              "pid": 48,
                              "album_path": "e945314f5d422b77663c37109101ee09.jpg"
                          }
                      ]
                  },
                  {
                      "id": 47,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645145,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 47,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "13dd53dd39f25f3e8b591927f6272e6a.jpg",
                      "has_albums": [
                          {
                              "id": 81,
                              "pid": 47,
                              "album_path": "13dd53dd39f25f3e8b591927f6272e6a.jpg"
                          }
                      ]
                  }
              ]
              
              
**guest页面**

    route：guest?id=（用户的id）
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，max（评论最大页码数），user（主人信息），data（正在送出的信息/新留言信息)
              
              user示例：同上面json中的data   
                       
              {
                  "id": 29,
                  "user_id": 34,
                  "sex": "男",
                  "college": "",
                  "enroll_year": "2014",
                  "address": "韵苑",
                  "head_photo": "header3.jpg",
                  "levell": 3,
                  "score": 70,
                  "week_score": 0,
                  "username": "",
                  "src": "header3.jpg"
              }
              
              
              data示例：
              
              [
                  {
                      "id": 48,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645254,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 48,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "e945314f5d422b77663c37109101ee09.jpg",
                      "has_albums": [
                          {
                              "id": 82,
                              "pid": 48,
                              "album_path": "e945314f5d422b77663c37109101ee09.jpg"
                          }
                      ]
                  },
                  {
                      "id": 47,
                      "pro_name": "111",
                      "parent_cate": "衣服配饰",
                      "son_cate": "鞋子",
                      "contact": "11111111111",
                      "pro_desc": "我3123",
                      "desire": "2112",
                      "username": "lxyeins",
                      "hot": 0,
                      "receiver": null,
                      "is_send": 0,
                      "reg_time": 1449645145,
                      "status": 0,
                      "activity": 0,
                      "pro_id": 47,
                      "goods_name": "111",
                      "sender_author": "lxyeins",
                      "receiver_author": null,
                      "sender_id": 34,
                      "receiver_id": 0,
                      "src": "13dd53dd39f25f3e8b591927f6272e6a.jpg",
                      "has_albums": [
                          {
                              "id": 81,
                              "pid": 47,
                              "album_path": "13dd53dd39f25f3e8b591927f6272e6a.jpg"
                          }
                      ]
                  }
              ]

         
**首页模板数据**

    route：/
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，hotGoods,newGoods,chart
              
              hotGoods和newGoods示例   
              [         
              {
                     "id": 39,
                     "pro_name": "3123",
                     "parent_cate": "学习用品",
                     "son_cate": "课内教材",
                     "contact": "11111111111",
                     "pro_desc": "312231",
                     "desire": "31231",
                     "username": "lxyeins",
                     "hot": 0,
                     "receiver": null,
                     "is_send": 0,
                     "reg_time": "2015.11.09",
                     "status": 0,
                     "activity": 0,
                     "src": "2cf0449e43228d071c599136a603a790.jpg",
                     "college": "软件学院",  //主人院系
              } .....若干个对象
              ]
              
              
              chart示例：
              
                                                [
                                                      {
                                                          "id": 29,
                                                          "user_id": 34,
                                                          "sex": "男",
                                                          "college": "",
                                                          "enroll_year": "2014",
                                                          "address": "韵苑",
                                                          "head_photo": "header3.jpg",
                                                          "levell": 0,
                                                          "score": 0,
                                                          "week_score": 0,
                                                          "username": "lxyeinsty"
                                                      },
              
                                                      {
                                                          "id": 30,
                                                          "user_id": 36,
                                                          "sex": "男",
                                                          "college": "机械学院",
                                                          "enroll_year": "2014",
                                                          "address": "韵苑",
                                                          "head_photo": "header2.jpg",
                                                          "levell": 1,
                                                          "score": 0,
                                                          "week_score": 0,
                                                          "username": "lxyeinsty"
                                                      } 此处省略，一共十个json对象
              
                                               ]
        
              
**土豪榜页面模板数据**

    route：chart
    
    method：get
    
    模板数据：loginFlag,username(登录者的用户名)，chartOne(前三个),chartTwo（4-8）,chartThree（最后是个）
    
            示例：
            
                                                              [
                                                                  {
                                                                      "id": 29,
                                                                      "user_id": 34,
                                                                      "sex": "男",
                                                                      "college": "",
                                                                      "enroll_year": "2014",
                                                                      "address": "韵苑",
                                                                      "head_photo": "header3.jpg",
                                                                      "levell": 0,
                                                                      "score": 0,
                                                                      "week_score": 0,
                                                                      "username": "lxyeinsty"
                                                                  },
                          
                                                                  {
                                                                      "id": 30,
                                                                      "user_id": 36,
                                                                      "sex": "男",
                                                                      "college": "机械学院",
                                                                      "enroll_year": "2014",
                                                                      "address": "韵苑",
                                                                      "head_photo": "header2.jpg",
                                                                      "levell": 1,
                                                                      "score": 0,
                                                                      "week_score": 0,
                                                                      "username": "lxyeinsty"
                                                                  } 此处省略，一共十个json对象
                          
                                                           ]
                    
            
        
                  
**编辑物品**

    route: goods/edit?action=delete/edit&pro_id=(物品的id)

    method: post

    提交字段：pro_name,parent_cate,son_cate,contact,pro_desc,desire

    返回示例：

        		{
                    'code' : 0/1,
                    'mes' : "输入信息不符合要求"/"success",
                    'data' : {}/ {"pro_id": 50}
                }
                
                

**mobile最热物品模板**

    route: hot

    method: get

    模板数据：loginFlag,username(登录者的用户名)，goods
    
    goods示例：
    
                  [         
                     {
                            "id": 39,
                            "pro_name": "3123",
                            "parent_cate": "学习用品",
                            "son_cate": "课内教材",
                            "contact": "11111111111",
                            "pro_desc": "312231",
                            "desire": "31231",
                            "username": "lxyeins",
                            "hot": 0,
                            "receiver": null,
                            "is_send": 0,
                            "reg_time": "2015.11.09",
                            "status": 0,
                            "activity": 0,
                            "src": "2cf0449e43228d071c599136a603a790.jpg",
                            "college": "软件学院",  //主人院系
                     } .....十五个对象
                  ]
        
    
        		
**mobile最热物品分页**

    route: goods/hot

    method: post

    提交字段：curPage  (当前页面)

    返回示例：

        		{
                    {
                        "code": 0/1,
                        "mes": ''/"success",
                        "data": {}/{
                            "curPage": "1",
                            "maxPage": 6,
                            "data": [
                                {
                                    "id": 45,
                                    "pro_name": "111",
                                    "parent_cate": "衣服配饰",
                                    "son_cate": "鞋子",
                                    "contact": "11111111111",
                                    "pro_desc": "很好的鞋子",
                                    "desire": "帮助到需要的人",
                                    "username": "lxyeinsy",
                                    "hot": 0,
                                    "receiver": null,
                                    "is_send": 0,
                                    "reg_time": 1449643413,
                                    "status": 0,
                                    "activity": 0,
                                    "src": "3bf2a370941b9003cb5ca6f11150cf74.png",
                                    "college": "",
                                }
                                此处省略，一共15个json对象
                            ]
                        }
                    }
                }

**提醒用户**

    route：remind?action=xxx  (action='register-ok'表示用户注册成功，提箱邮件发送)
    
    method：get
    