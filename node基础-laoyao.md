# 1.node.js

```markdown
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境

前端->谷歌浏览器  Chrome
    在我们以前运行一段JS，一定要有浏览器，如果没有浏览器，JS是没办法执行的
    
    以前JS的生效，影响力只能在浏览器层面
    
后端->NodeJS Chrome V8引擎（摆脱浏览器运行JS）
    只要你在系统上安装了node环境，那你可以脱离浏览器去运行JS（不需要html,css文件），没有界面的浏览器

	现在JS的活动范围在整个系统



```




# 2.安装

从这个网站下载[node官网下载地址](https://nodejs.org/en/download/)

# 3.简单的使用

1. 新建一份JS文件

2. 打开该文件下的命令行，执行`node 文件的名字(.js)`

3. 在命令中查看效果


# 4.自定义模块系统


我们以前写前端程序，好几万，合作完成一起完成项目

## 前端模块

```js
最简单
    <script src="m1" />
    <script src="m2" />
require.js
	模块一n1.js
		define()
        // 定义一个有依赖关系的模块
        define(['jquery'],function($){
            //返回一个函数
            //这个函数就是在引入模块的回调函数中的参数
            return {
                a(){},
                b(){},
            }
        })
	模块二n2.js
		require(['n1'])

	
			
```



## 后端模块（node）

```js
导出模块
module.exports = (对象，函数，数组，字符串，数字)
//module2.js
    module.exports = function sub(n1,n2){
        return n1-n2;
    }
```

```js
导入模块
require("相对路径/文件名字.js");
    function plus(n1,n2){
        return n1+n2;
    }
    console.log(plus(8,8))
    //导入module2模块
    var module2 = require("./module2.js");
    console.log(module2(99,88));
```


# 5.第三方模块

```js
require("gulp")
```

npm相当于应用商城，大量别人已经写好的模块

如果你需要用别人写好的模块，你可以从[npm官网](htps://www.npmjs.com)下载对应的模块

```bash
npm install gulp -g
npm i gulp -g//等于上面的命令
npm install//全部安装 依赖于package.json文件
npm uninstall//全部卸载
npm uninstall xxx//卸载制定模块
```
如果npm安装不上第三方模块，我们可以尝试国内的淘宝镜像[cnpm](https://npm.tabbao.org)

```
cnpm install 模块
```
安装成功，会在你本地目录下生成**node_modules**文件夹

gulp是我们学的第一个node的第三方模块，别人写好的模块，你先用npm/cnpm命令下载，再新建JS文件引入该模块
再根据别人的模块文档，更改对应的代码实现自己的功能

# 6.内置模块系统

参考官方文档

- [nodejs官方内置模块系统的文档](nodejs.cn/api)

## fs

文件系统
```js
require("fs)
```

读文件
```js
fs.readFile("文件路径","选项（可选的）",回调函数)//回调函数第一个参数err,第二个参数是关于数据的data
var fs = require("fs"); //node的内置模块 文件系统 对文件的增删查改

//console.log(fs);
var data = "";
fs.readFile("../../day1.md", {
	encoding: 'UTF-8'
}, function(err, d) { //err永远在前，data在后
	if(err) {throw err}
	//console.log(d);
	data = d;
})
```


写文件
```js
fs.writeFile("文件路径","要写入的文件内容",回调函数)
var fs = require("fs");
fs.writeFile("input.txt","hello wolrd",function(err,data){
	if(err){throw err}
	console.log(data);
})
```

## os

操作系统
```js
require("os")
os.cpus()
```

## http



```js
跟我们前端密切相关的模块，因为前端大量使用http和https

所以在node里面有两个与之对应的模块http和https模块

    var http = require("http");
    	//console.log(http);
    var server = http.createServer(function(req,res){//request,response
        console.log(decodeURI(req.url));
        //解决跨域
        res.setHeader("Access-Control-Allow-Origin","*");
        res.end("接受弹幕成功");//echo xxx;响应体
    });
    server.listen(12345);//0~65535
```



## 状态码

|status|描述|
|-|-|
|1xx|发送，准备|
|2xx|成功|
|3xx|缓存|
|4xx|浏览器端，客户端，前端问题|
|5xx|服务端，后端问题|

## 请求头，请求体，响应头，响应体

req->request请求的  前端-》后端

res->response响应的 后端-》前端

# 7.回掉函数

```js
function buypizza(callback){
    setTimeout(function(){
        console.log("出披萨")
        callback();
    },3000)
}

//function eatpizza(){console.log("吃披萨")}
    
// 买
buypizza(function(){console.log("吃披萨")});

// 吃
eatpizza();

function getData(callback){
    fs.readFile("../../day1.md", function(e, d) { //err永远在前，data在后
        if(e) {throw e}
        callback(d);
    })
}
getData(function(d){
    console.log(d);
})

$.ajax({
    url:"",
    success(){}
}).done(function(){})

function task1(callback){callback()};
    
function task2(){};

task1();
task2();
```



# 8.异步嵌套

```js
function buypizza() {
    setTimeout(function () {
        console.log("出披萨")
        callback();
    }, 3000)
}

buypizza(function () {
    setTimeout(function () {
        console.log("吃披萨")

        function visitgf() {
            console.log("见女朋友")
        }
        visitgf()
    }, 1000)
})
```



# 9.promise

```js
	如果出现大量的回调嵌套，（回调地狱，回调金字塔），建议使用promise，方便维护
function buypizza() {
    return new Promise(function (reslove, reject) {
        setTimeout(function () {
            console.log("出披萨")
            reslove()
        }, 3000)
    })
}

function eatpizza() {
    return new Promise(function (reslove, reject) {
        setTimeout(function () {
            console.log("吃披萨")
            reslove()
        }, 3000)
    })
}

function visitgf() {
    return new Promise(function (reslove, reject) {
        console.log("见女朋友")
    })
}

buypizza().then(eatpizza).then(visitgf);
```



# 10.事件循环

依赖内置的`events`模块，是一个内置模块，它不需要下载的，node自带的

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
```

eventEmitter它提供两个方法一个是`on`，另一个是`emit`,on是监听，emit是触发

监听

```js
eventEmitter.on('buypizza', function(){
    console.log("买披萨")
});
```

触发

```js
eventEmitter.emit('buypizza');
```

观察者模式

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序
eventEmitter.on('buypizza', function(){
    setTimeout(function(){
        console.log("买披萨")
        eventEmitter.emit('eatpizza');
    },3000)
});

eventEmitter.on('eatpizza', function(){
    setTimeout(function(){
        console.log("吃披萨")
        eventEmitter.emit('visitgf');
    },3000)
});

eventEmitter.on('visitgf', function(){
    console.log("见女朋友")
});

// 触发事件
eventEmitter.emit('buypizza');
```



# 11.request

是基于fs内置模块封装的一个第三方模块

```js
npm i request
```

爬数据

```js
var request = require('request');
//response 响应头
//body 响应体
request('http://www.27270.com/ent/meinvtupian/', function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
```



| error        | response                       | body                 |
| ------------ | ------------------------------ | -------------------- |
| 判断是否错误 | 响应头（状态码，服务器的信息） | 响应体（网站源代码） |

我们可以利用body来去挖掘网站的数据

下载对应的资源文件

```js
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
```

# 12.cheerio

它就是相当于jQuery,因为node服务端已经获取到网页源代码，所以我们需要在后端用jQuery的方法把它分析出有用的信息

```js
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')
 
$('h2.title').text('Hello there!')
$('h2').addClass('welcome')
```

1. 先加载cheerio模块
2. 然后`cheerio.load(放一段html结构)`，并赋给`$`符号
3. 再通过`$`符号，用类似jQ的方法来操作该DOM结构

# 13.github

github,gitlab,gitee>git

| git          | github,gitlab,gitee             |
| ------------ | ------------------------------- |
| 代码管理工具 | 是利用git这个技术实现的代码平台 |
|              |                                 |

只安装git，用处不大的，所以你要配合`github,gitlab,gitee`

[Git常用命令笔记](https://blog.csdn.net/qq_27080247/article/details/49942991)

# 14.爬音乐

- [爬虫](https://github.com/Wscats/node-tutorial/issues/2)

# 15.mysql

安装mysql模块

```bash
npm i mysql
```

# 16.express

| express | jq   | bootstrap |
| ------- | ---- | --------- |
| 框架    | 库   | 框架      |
| 后端    | 前端 | 前端      |
| js      | js   | css       |

（图纸，方位，风水，地质，大小，范围，层高，木结构MVC，MVVM）
框架（架构师）

> （斧子，锤子，工具，钻）
> 库（前端工程师）（jQ封装了方法）

```bash
npm i express
```

路由：找资源文件的路径

```js
var express = require('express')
var app = express()
//路由
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/list', function (req, res) {
  res.send('进入index路由')
})
app.get('/detail', function (req, res) {
  res.send('进入home路由')
})
app.listen(3000)
```

处理get请求，获取参数只需要`req.query`

```js
app.get()
```

处理post请求,相对get请求会麻烦点，需要`body-parser`配合`req.body`

```js
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.post()
```

- [express配置](https://github.com/Wscats/node-tutorial/issues/8)

| php            | nodejs(express) |
| -------------- | --------------- |
| $_GET["xxxx"]  | req.query       |
| $_POST["xxxx"] | req.body        |
| header         | req.append      |
| echo           | res.send        |

```js
有一种我觉得比较快速的方法
	1.先全局安装 npm i express ，2.验证是否安装成功 expres -h（在window会报错。因此要先 npm i express-generator -g） 3.然后就可以创建一个express的开发目录 express -e express（最后这个是文件名，）4.在express目录下 npm install 5.最后启动项目，npm start（默认端口号是3000）
	2.项目依赖：  
	"dependencies": {
    "body-parser": "^1.18.3",//解析前端提供过来的数据
    "cookie-parser": "~1.4.3",//解析cookie
    "debug": "~2.6.9",//显示一些调试信息,相当于console.log
    "ejs": "~2.5.7",//nodejs的express的模板，可以渲染前端页面
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",//日志，可以在控制台上格式化显示request的一些信息
    "serve-favicon": "^2.5.0"//专门用来设置
  }
```

