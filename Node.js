# Node.js - day1



## 1. 整个node.js课程学习目标

1. 【基础概念】
   - 什么是node.js以及node.js的特点
   - node.js适合做什么
   - 什么是模块化、什么是Common.js模块化规范
   - 模块、包、npm、包加载机制
   - etc...
2. 【基本能力】
   - 掌握node.js中基本API的使用
   - 能够使用npm管理包
   - 能够使用ES6新语法
   - 能够使用node.js创建基本的web服务器
3. 【高阶内容】
   - 能够使用Express框架、结合mysql数据库实现后端网站

> 注意：整个node.js学习阶段，概念类知识点较多，需要理解透彻！



## 2. 了解基本概念 



### 2.1 语言 和 环境(平台) 之间的关系

1. **语言，是编写代码的语法规范**；程序员遵循特定的语法规范，编写出来的代码，只是单纯的文本字符串而已，**并不具备可执行的特点**；
2. **环境（平台），提供了执行代码的能力**，如果程序员编写的代码想要成功执行，必须要依赖于特定的执行环境；
   - 例如：Javascript代码可以被浏览器中的JS解析引擎执行；
   - 所以，浏览器，就是一个 Javascript 的执行环境；因为 Javascript 代码可以在浏览器中被执行；



### 2.2 前端 和 后端

1. 前端主要工作
   1. 页面结构
   2. 美化页面样式
   3. 书写页面的业务逻辑
   4. 使用Ajax调用后台接口
2. 后端主要工作
   1. 操作数据库
   2. 对外暴露操作数据库的API接口
3. 前后端协作开发



### 2.3 浏览器环境 中的 Javascript

1. 诞生：上世纪 90年代左右，网景 liveScript、表单验证
2. 一战：
   - 主角：微软和网景
   - 结果：微软IE胜出
   - 胜利的果实：ECMAScript 语言标准的诞生
3. 二战
   - 主角：谷歌、火狐、IE
   - 结果：谷歌胜出
   - 胜利的果实：谷歌的V8引擎是最快的JS解析引擎
4. 回顾：浏览器中 Javascript 的组成部分
   - ECMAScript核心 + DOM + BOM



### 2.4 Node环境 中的 Javascript

1. [什么是 Node.js](http://nodejs.cn/)：就是 Javascript 的服务器端运行环境，可以让程序员使用 Javascript 来实现服务器端的编程；
2. Node.js 中 Javascript 的组成部分
   - ECMAScript 核心 + 全局成员 + 核心 API 模块
   - 全局成员：console、setInterval、setTimeout。。。
   - 核心 API 模块：就是 Node 平台 单独提供的一些API，这些API是Node平台所独有的；
3. 注意：Node.js 中 没有 BOM 和 DOM
   1. 由于 Node 服务器端运行环境中，没有浏览器 和 HTML 的概念，所以，Node中的javascript 提出了 DOM 和 BOM 这两个对象模型，取而代之的，是 全局成员 和  核心 API 模块；





### 2.5 ECMAScript 规范，浏览器中的js，Node中的js之间的关系

1. ECMAScript 规范（标准）：就是一本书，这本书中规定了语言的特性；
2. 浏览器中的js：
   - 浏览器中的 js 组成部分：ECMAScript 核心 + DOM + BOM
3. Node中的js：
   - Node中的 js 组成部分： ECMAScript 核心 + 全局成员 + 核心API成员



### 2.6 画图说明 浏览器中的js 与 Node中 js 之间的区别



### 2.7 总结

1. **什么是 Node.js(我们自己给它下个定义)**

   > 就是一个服务器端的Javascript运行环境，可以让程序员，通过 Javascript 做 后台服务器编程开发

2. **学习 Node.js 可以做什么**

   - 像 PHP 一样，使用 Javascript 编写符合规范的**后端 API 接口** 或 **网站**
   - 使用 Node.js 开发一些**实用的工具** 或 **包**
   - 基于 Socket 技术，开发类似于聊天室之类的**即时通讯项目**
   - 基于 Electron 环境，开发**桌面软件**
   - ect...



## 3. 环境安装

### 3.1 LTS 和 Current 版本区别

1. **LTS：**【推荐在企业中使用】，是**长期稳定版**的安装包，运行稳定、安全；
2. **Current：**【推荐学习或尝鲜去使用】，是**最新特征版**，这个安装包中有最新的Node特性；



### 3.2 下载安装

  1.从这个网站下载[node官网下载地址](https://nodejs.org/en/download/)



### 3.3 查看 Node 版本号

1. 打开终端，在命令行输入命令`node -v`即可
2. **Tips: 如何进入终端呢？**
   - 【推荐】在任意目录的空白位置，先按住`shift`键不松开，然后，在空白位置，鼠标右键单击，会出来一个右键菜单，选择`在此处打开 powershell/cmd 窗口`
   - 【了解】使用快捷键`windows徽标 + R`打开运行面板，输入 `cmd` 后直接回车；





### 3.4 path 环境变量

1. **什么是path环境变量**
   - Path环境变量的作用：能够让我们在终端中执行相关的命令，从而快速启动应用程序；
2. **系统环境变量和用户环境变量的区别**
   - 用户环境变量：
   - 系统环境变量：
3. **通过终端输入命令的形式，快速启动应用程序时，路径的查找规则**
   - 先在当前运行 终端命令的 目录中查找，如果有则直接运行；
   - 如果当前运行 终端命令的 目录中没有，则去全局的path环境变量中查找；





## 4. Node.js 环境中 执行 js 代码的两种方式

### 4.1 node 命令【推荐】

1. 直接使用 `node 要执行的js文件的路径` 来执行指定的JS文件

> 小技巧：
>
> 1. 在终端中，使用键盘的↑, 可以快速定位到上一次执行的命令
> 2. 在终端中，使用键盘的 `tab` 键能够快速补全路径
> 3. windows 系统上，在终端中输入 `cls` 可以清屏



### 4.2 REPL 环境 - 了解

1. **如何进入 REPL 环境**： 打开任意终端，直接输入 `node` 并回车，就会进入到 REPL 环境中；
2. **如何离开 REPL 环境**：按两次`ctrl + c` 就能退出 REPL 环境；
3. **REPL中，每个字母代表什么意思呢**：

- **R**： Read 的意思，每当我们输入完毕代码之后，只要敲击回车，Node环境就会读取用户输入的代码
- **E**：Evaluate 的意思，表示把 Read 进来的用户代码，调用 类似于 Eval 的函数，去解析执行
- **P**：Print 输出的意思；把第二步中解析执行的结果，输出给用户；
- **L**：Loop 循环的意思，表示当输出完毕之后，进入下一次的 REP循环



## 5. ECMAScript 6常用语法

### 5.1 let(变量) 与 const(常量)

1. 之前定义变量，用 var 关键字；有如下主要缺点：
   - 存在变量提升问题，降低 js 代码的可阅读性
   - 没有块级作用域，容易造成变量污染
2. let 主要特性：
   - 不存在变量提升问题，只有定义之后才能使用此变量
   - 有 `{ }` 作用域
3. const 主要特性：
   - 不存在变量提升问题，只有定义之后才能使用此变量
   - const 定义的**常量**，**无法被重新赋值**
   - 当定义常量的时候，必须定义且初始化，否则报语法错误
   - const 定义的常量，也有 块级作用域





### 5.2 变量的解构赋值（常用）

> **定义：**所谓的解构赋值，就是把 某个对象中的属性，当作变量，给解放出来，这样，今后就能够当作变量直接使用了；

- 可以使用 `:`为解构出来的变量重命名

```
  // 变量的解构赋值
  const { name : name123, age, gender } = person
  console.log(name123)
```



### 5.3 箭头函数(常用)

1. 语法：

   - 定义普通的 `function` 函数

     ```js
     function show() {
         console.log('这是普通 function 定义的 show 方法')
     }
     
     ```

   - 把方法定义为箭头函数（最完整的写法）

     ```js
     (形参列表) => { 函数体代码 }
     ```

2. **箭头函数，本质上就是一个匿名函数**；

3. **箭头函数的特性**： 箭头函数内部的 this, 永远和 箭头函数外部的 this 保持一致；

4. **变体**：

   - 变体1：如果箭头函数，左侧的形参列表中，只有一个参数，则，左侧小括号可以省略；
   - 变体2：如果右侧函数体中，只有一行代码，则，右侧的 `{ }` 可以省略；
   - 变体3：如果箭头函数左侧 只有一个 形参，而且右侧只有一行代码，则 两边的 `()` 和 `{}` 都可以省略

5. **注意**： 如果我们省略了 右侧函数体的 `{ }`，那么，默认会把 右侧函数体中代码的执行结果，当作箭头函数的调用结果 return 出去；



### 5.4 对象中 `定义方法` 和 `定义属性` 的便捷方式



## 6. 文件操作

### 6.1 文件读取 	`fs.readFile`

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

### 6.2 文件写入 	`fs.writeFile`

```js
fs.writeFile("文件路径","要写入的文件内容",回调函数)
var fs = require("fs");
fs.writeFile("input.txt","hello wolrd",function(err,data){
	if(err){throw err}
	console.log(data);
})
```

### 6.3 文件追加	`fs.appendFile`

- `fs.appendFile(path, data[, options], callback)(异步地追加数据到一个文件，如果文件不存在则创建文件。)`

- ```js
  1.异步地追加数据到一个文件，如果文件不存在则创建文件。 data 可以是一个字符串或 Buffer。
      fs.appendFile('message.txt', 'data to append', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
  2.如果 options 是一个字符串，则它指定了字符编码。
  	fs.appendFile('message.txt', 'data to append', 'utf8', callback);
  3.file 可能是一个被打开用来追加数据的数字文件描述符（通过 fs.open() 或者 fs.openSync()）。这样的文件描述符将不会被自动关闭。
  	fs.open('message.txt', 'a', (err, fd) => {
          if (err) throw err;
          fs.appendFile(fd, 'data to append', 'utf8', (err) => {
            fs.close(fd, (err) => {
              if (err) throw err;
            });
            if (err) throw err;
          });
        });
  ```

### 6.4 fs模块中路径操作问题【难点】

- 使用 fs 模块操作文件的时候，如果提供的操作路径是 `相对路径`， 则会根据当前执行node命令时的磁盘目录，去拼接提供的文件的相对路径，从而容易出现问题；例如：

  ```js
  const fs = require('fs')
  
  // 调用 fs.readFile 方法时，提供的第一个参数是相对路径，容易出现问题
  fs.readFile('./files/1.txt', 'utf-8', (err, data) => {
      if(err) return console.log(err.message)
      console.log(data)
  })
  ```

- 推荐使用 node 中提供的 `__dirname` 来解决 fs 模块操作文件时候的路径问题



### 6.5 读取文件信息   ` fs.stat`

```js
fs.stat(path[, options], callback)

path <string> | <Buffer> | <URL>
options <Object>

bigint <boolean> 在返回的fs.Stats 对象中的数字类型值是否为bigint. Default: false.
callback <Function>

err <Error>
stats <fs.Stats>
异步的 stat(2). 回调函数中包含两个参数 (err, stats) ，其中 stats 为 fs.Stats 对象。

如果发生了错误， err.code 将会为 Common System Errors中的某个值。

不推荐在调用fs.open(), fs.readFile() or fs.writeFile() 前通过使用 fs.stat() 来检查某个文件是否存在。对于这种情况，开发者应当通过直接open/read/write文件并检测产生的异常来 判断文件是否可用。

如果不需要操作文件只是想获取文件是否可用，推荐使用fs.access()。
```



### 6.6 读取指定目录中所有文件的名称   `fs.readdir`

```js
fs.readdir(path[, options], callback)

path <string> | <Buffer> | <URL>
options <string> | <Object>

encoding <string> 默认 = 'utf8'
callback <Function>

err <Error>
files <string[]> | <Buffer[]>
异步的 readdir(3)。 读取一个目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组。

可选的 options 参数用于传入回调的文件名，它可以是一个字符串并指定一个字符编码，或是一个对象且由一个 encoding 属性指定使用的字符编码。 如果 encoding 设为 'buffer'，则返回的文件名会被作为 Buffer 对象传入。 注意: 'path' 的路径是以当前文件为基准进行查找的,而不是运行的时候的相对路径
```



### 6.7 复制文件 `fs.copyFile`

```js
fs.copyFile(src, dest[, flags], callback)

src <string> | <Buffer> | <URL> 要被拷贝的源文件名称
dest <string> | <Buffer> | <URL> 拷贝操作的目标文件名
flags <number> 拷贝操作修饰符 默认: 0
callback <Function>

异步的将 src 拷贝到 dest。Asynchronously copies src to dest. 默认情况下，如果 dest 已经存在会被覆盖。回调函数没有给出除了异常以外的参数。Node.js 不能保证拷贝操作的原子性。如果目标文件打开后出现错误，Node.js 将尝试删除它。

1.flags 是一个可选的整数，用于指定行为的拷贝操作。唯一支持的 flag 是 fs.constants.COPYFILE_EXCL ，如果 dest 已经存在，则会导致拷贝操作失败。
	const fs = require('fs');

    // 默认情况下，destination.txt 将创建或覆盖
    fs.copyFile('source.txt', 'destination.txt', (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
2.如果第三个参数是数字，那么肯定是 flags，代码如下所示:
	const fs = require('fs');
    const { COPYFILE_EXCL } = fs.constants;

    // 使用 COPYFILE_EXCL ，如果 destination.txt 文件存在，操作将失败。
    fs.copyFile('source.txt', 'destination.txt', COPYFILE_EXCL, callback);
	ps：这里一定是写COPYFILE_EXCL，我的理解flsgs的作用是，为了告诉我们之前已经存在一个文件了，因为直接复试是会覆盖之前的内容
```



## 7. 路径操作

1. **path.join([...paths])**

   ```js
   // 最佳实践：以后只要设计到路径拼接，一定要使用 path.join() 方法
   fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', (err, dataStr) => {
     if (err) return console.log(err.message)
     console.log(dataStr)
   }))
   ```

2. `path.sep   // 路径分隔符`

3. `path.basename(path[, ext])  //获取文件名称的`

4. `path.dirname(path)  // 获取文件所在的路径的`

5. `path.extname(path)   // 获取文件的扩展名`

