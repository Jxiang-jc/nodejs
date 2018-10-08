# Node.js - day4



## 今天主要内容

1. 获取参数的几种形式
2. 了解web开发模式
3. 设计数据库和后台接口
4. 实现前端功能



## 1. express中获取参数的几种形式

1. **获取 `http://127.0.0.1:3001/user?id=10&name=zs` 中的查询参数：**
   + 直接使用 `req.query` 获取参数即可；
   + 注意：URL 地址栏中通过 `查询字符串` 传递的参数，express 框架会直接解析，大家只需要使用 `req.query` 直接获取 URL 中 查询字符串的参数；
2. **从URL地址中获取路径参数：**
   + 假设后台的路由是 `app.get('/user/:id/:name', (req, res) => {})`
   + 假设客户端浏览器请求的URL地址为：`http://127.0.0.1:3001/user/10/zs`
   + 直接使用 `req.params` 可以获取URL地址中传递过来的参数；
3. **从post表单中获取提交的数据：**
   + 借助于`body-parser`来解析表单数据
   + **安装：**`npm i body-parser -S`
   + **导入：**`const bodyParser = require('body-parser')`
   + **注册中间件：**`app.use(bodyParser.urlencoded({ extended: false }))`
   + **使用解析的数据：** `req.body` 来访问解析出来的数据




## 2. Web 开发模式

### 2.1 混合模式（传统开发模式）
+ 以后端程序员为主，基本上不需要前端程序员，或者，前端程序员只负责画页面、美化样式、写JS特效，前端程序员不需要进行数据的交互；
+ 这种开发模式，在早些年比较常见；
+ 传统开发模式下，用的最多的是 Jquery + 模板引擎 + Bootstrap
+ 后端页面 .php   .jsp   .aspx   .cshtml
### 2.2 前后端分离（趋势）
+ 后端负责操作数据库、给前端暴露接口
+ 前后端分离的好处：保证了各个岗位的职责单一；
+ 前端负责调用接口，渲染页面、前端就可以使用一些流行的前端框架 Vue， React， Angular




## 3. 需求分析

1. 后端项目运行地址：http://127.0.0.1:5000
2. 前端项目运行地址：http://127.0.0.1:3000
3. 前后端分离开发模式的注意点：
 + 跨域问题
 + 如果不考虑 表单的 Post 提交，则 可以使用 JSONP 的形式来请求接口
 + 但是，我们的项目中，涉及到了 英雄表单的 提交，表单提交一般都是Post
 + 经过分析，由于JSONP，不支持Post，所以，我们的后端接口，无法设计成JSONP的接口；
 + 前端项目 Jquery + 模板引擎 + Semantic UI




## 4. JSONP 和 CORS 的区别

1. JSONP的原理：动态创建script标签；
  + JSONP发送的不是Ajax请求
  + 不支持 Post 请求；
2. CORS中文意思是`跨域资源共享` ,需要服务器端进行 `CORS` 配置；
  + CORS 发送的是真正的Ajax请求
  + CORS 支持Ajax的跨域
  + 如果要启用 CORS 跨域资源共享，关键在于 服务器端，只要 服务器支持CORS跨域资源共享，则 浏览器肯定能够正常访问 这种 CORS 接口；而且，客户端在 发送 Ajax的时候，就像发送普通AJax一样，没有任何代码上的变化；
3. 对于Node来说，如果想要开启 CORS 跨域通信，只需要安装`cors`的模块即可；




## 5. 数据库设计 - heros

| 字段名 | 字段类型 |  字段描述  |
|--------|-----------|------------|
|  id       |      int     | 主键Id（自增）  |
|  name |   varchar |  英雄名称  |
|  gender  |   varchar |  性别     |
|  ctime   |   varchar |创建时间  |
|  isdel   | tinyint（布尔值） | 是否被删除 0 表示未删除；1 表示已经被删除 |

在 mysql 中的 tinyint 等同于 bool 值 



## 6. 后台接口设计

### 获取所有英雄列表

+ 请求类型：GET
+ 请求地址：`http://127.0.0.1:5001/getallhero`
+ 请求的参数：无



### 插入新的英雄数据

+ 请求类型：POST
+ 请求地址：`http://127.0.0.1:5001/addhero`
+ 请求参数：{ name, gender }



### 根据Id获取英雄信息

请求类型：GET

请求地址：`http://127.0.0.1:5001/gethero/:id`

请求参数：通过 URL 地址，把要查询的英雄Id，携带过去



### 根据Id更新英雄数据

请求类型： POST

请求地址：`http://127.0.0.1:5001/updatehero/:id`

请求参数：{ name, gender }



### 根据Id软删除英雄数据

请求类型：GET

请求地址：`http://127.0.0.1:5001/deletehero/:id`

请求参数：通过 URL 地址栏传参，把 要删除的英雄Id提交给服务器



## 7. 后台接口项目实现




## 8. 前端功能实现



## 相关文章

+ [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
+ [cors模块解决Node跨域资源共享问题](https://github.com/expressjs/cors)