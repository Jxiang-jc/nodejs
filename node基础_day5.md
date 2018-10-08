# Node.js（黑马博客案例）



## 今天主要内容

1. 博客项目开发
2. 能够看懂和绘制流程图
3. Cookie 和 Session 知识点的复习和使用
4. 登录、注销功能



## 1. 分析
1. 昨天的英雄案例使用{前后端分离}开发的（先定义接口文档，根据接口文档编写后端API， 前端写页面同时根据文档调用接口）
2. 今天的黑马博客，使用{传统的开发方式}，我们切换到后端开发人员的身份，一边定义接口，一边写页面调用接口；



## 2. 搭建博客案例基本结构并渲染首页

主要目标1：在渲染首页的时候，把相关的配置搭建起来（模板引擎、静态文件托管）



## 3. 用户注册模块的实现

+ 要求大家，能够根据自己对于业务逻辑的了解，能够画出业务流程图
+ 圆角矩形或圆圈： 表示开始/结束
+ 矩形： 表示一个处理过程
+ 菱形： 表示判断
+ 箭头：表示流转关系

## 4. 用户登录模块的实现


## 5. HTTP协议的无状态性
1. HTTP协议的通信模型：基于`请求 - 处理 - 响应`的！
2. 由于这个通信协议的关系，导致了HTTP每个请求之间都是没有关联的，每当一个请求完成之后，服务器就忘记之前谁曾经请求过！
3. 如果纯粹基于HTTP通信模型，是无法完成登录状态保持的！每次请求服务器，服务器都会把这个请求当作新请求来处理！
4. 我们可以通过 cookie 技术，实现状态保持，但是由于cookie是存储在客户端的一门技术，所以安全性几乎没有，因此不要使用cookie存储敏感的数据！


## 6. cookie介绍
### 6.1 什么是cookie，作用是什么
+ 由于**Http协议是无状态**的，且传统服务器**只能被动的响应请求**，所以，当服务器获取到请求的时候，并不知道当前请求属于哪个客户端！
+ 服务器为了能够明确区分每个客户端，需要使用一些小技术，来根据不同的请求区分不同的客户端；
+ 只要有请求发生，那么必然对应一个客户端，我们可以在每次客户端发起请求的时候，向服务器自动发送一个标识符，告诉服务器当前是哪个客户端正在请求服务器的数据；
+ 如何提供这个标识符呢？我们可以在请求头(Request Headers)中添加一个标签，叫做`cookie`，这样，每次发送请求，都会把这个cookie随同其他报文一起发送给服务器，服务器可以根据报文中的cookie，区分不同的客户端浏览器。
+ 如何在客户端请求头中添加标识符？
 - 在Node中可以在`writeHeader`的时候，通过`Set-Cookie`来将cookie标识通过响应报文发送给客户端！
 - 客户端也可以通过一些方式来操作自己的cookie，比如通过`jquery.cookie`这个插件！

### 6.2 cookie的基本使用
```js
var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
    // 解析cookie
    var cookies = {};
    var cookieStr = req.headers.cookie; // 从请求的headers中获取cookie信息
    cookieStr && cookieStr.split(';').forEach(function (item) {
        var parts = item.split('=');
        cookies[parts[0].trim()] = parts[1].trim(); // 将cookie解析出来，保存到对象中
    });

    res.writeHeader(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        "Set-Cookie": ['issend=ok', 'age=20']
    });

    if(cookies.issend ==='ok'){
        res.end('不要太贪心哦！');
    }else{
        res.end('呐，赏你一朵小红花~~');
    }
});

server.listen(4000, function () {
    console.log('服务器已启动!');
});
```

### 6.3 通过`expires`设置Cookie的过期时间
```js
// 设置 过期时间 为60秒之后
// 注意：在设置过期时间的时候，需要将时间转换为 UTC 格式
var expiresTime = new Date(Date.now() + 1000 * 60).toUTCString();
res.writeHeader(200, {
  'Content-Type': 'text/html; charset=utf-8',
  'Set-Cookie': ['isvisit=true;expires=' + expiresTime, 'test=OK']
});
res.end('<h3>你好，欢迎光临，送给你一个苹果！</h3>');
```

[GMT和UTC有什么区别？格林尼治标准时（GMT）与世界时（UTC）是怎么回事](http://www.wbiao.cn/cartier-watches/knowledge/article-1468.html)

### 6.4 cookie可以被伪造，不安全
使用谷歌插件`edit this cookie`，就能伪造cookie数据！所以不要使用cookie存储敏感的数据！比如登录状态和登录信息；
一些敏感的数据，应该存储都服务器端！

### 6.5 什么是Cookie的应用场景
1. 对安全性要求不高
2. 不需要存储大量的数据
3. 主要应用场景，是用来做 客户端 与 服务器之间的 状态保持技术；

## 7. 登录退出及状态保存

### 7.1 使用`express-session`来保存登录状态
#### 7.1.1 什么是session
由于HTTP是无状态的，所以服务器在每次连接中持续保存客户端的私有数据，此时需要结合cookie技术，通过session会话机制，在服务器端保存每个HTTP请求的私有数据；

#### 7.1.2 session原理
在服务器内存中开辟一块地址空间，专门存放每个客户端私有的数据，每个客户端根据cookie中保存的私有sessionId，可以获取到独属于自己的session数据。

#### 7.1.3 在express中使用session
1. 安装session模块
```bash
npm install express-session -S
```
2. 导入session模块
```js
var session = require('express-session')
```
3. 在express中使用`session`中间件：
```js
// 启用 session 中间件
app.use(session({
  secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
  resave: false, // 强制session保存到session store中
  saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}))
```
4. 将私有数据保存到当前请求的session会话中：
```js
// 将登录的用户保存到session中
req.session.user = result.dataValues;
// 设置是否登录为true
req.session.islogin = true;
```
5. 通过`destroy()`方法清空`session`数据：
```js
req.session.destroy(function(err){
  if(err) throw err;
  console.log('用户退出成功！');
  // 实现服务器端的跳转，这个对比于 客户端跳转
  res.redirect('/');
});
```


## 8. 注销功能的实现



## 作业：
1. 自己晚自习尝试着 把 用户注册 和 用户登录 的流程图画出来
2. 大家自己能够搭建一个 类似于黑马博客的Web服务器，然后，把 express-session 尝试着配置好使用一下；



## 相关文章
1. [node.js中express-session配置项详解](http://blog.csdn.net/liangklfang/article/details/50998959)
2. [MD5在线生成器1](http://www.cmd5.com/)
3. [MD5在线生成器2](http://pmd5.com/)
4. [JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)