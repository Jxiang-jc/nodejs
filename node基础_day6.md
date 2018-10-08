# Node.js - day6（黑马博客案例）



## MD5 的特性

1. **MD5 是一种加密算法**，在调用这个算法的时候，提供一个密码的明文， 调用的结果，得到一个 32 位长度的密文；
2. **MD5 算法的特性：**相同的字符串，如果多次调用 md5 算法，得到的结果，完全一样；
3. **MD5 算法，无法被逆向解密**；
4. 但是，基于 md5 算法的第二个特性，我们可以进行碰撞暴力破解；（MD5 存在被暴力破解的安全性问题）
5. 为了解决 简单的明文密码，被 md5 加密后，通过 暴力破解的安全性问题， 然后就出现了**加盐**的MD5加密；
6. 目前，md5的暴力破解，又升级了，升级到了 `彩虹表`；
7. 由于彩虹表出现，我们推荐大家，在存储网站密码的时候，使用 `bcrypt` 加密算法，得到加密之后的密文进行存储；



## bcrypt 加密算法

1. 在调用加密算法的时候，需要手动提供一个 `幂次`;
2. 调用加密算法，得到的加密结果格式：`$版本号$循环的幂次$22位的随机盐 31位的密文`
   + 加密的`随机盐`和`加密的幂次`，和`加密算法的版本号`已经被存储到了真正的密文中；



## 项目中使用 bcrypt 的步骤

1. 运行 `npm i node-pre-gyp -g` 

2. 在项目根目录中，打开终端，运行 `cnpm install bcrypt -S`

3. 导入 `bcrypt` 

   ```js
   // 导入加密的模块
   const bcrypt = require('bcrypt')
   ```

4. 定义幂次：

   ```js
   // 定义一个 幂次
   const saltRounds = 10    // 2^10
   ```

5. 调用 `bcrypt.hash()` 加密：

   ```js
   // 加密的方法
   bcrypt.hash('123', saltRounds, (err, pwdCryped) => {
      console.log(pwdCryped)
   })
   ```

6. 调用`bcrypt.compare()`对比密码是否正确：

   ```js
   // 对比 密码的方法
   bcrypt.compare('123', '$2b$10$i1ufUKnC9fXTsF9oqqvLMeDnpNfYIvhyqKRG03adiebNFPkjW3HPW', function(err, res) {
     console.log(res)
     // 内部对比的过程：
     // 1. 先获取 输入的明文
     // 2. 获取输入的密文
     // 2.1 从密文中，解析出来  bcrypt 算法的 版本号
     // 2.2 从密文中，解析出来 幂次
     // 2.3 从密文中，解析出来前 22 位 这个随机盐
     // 3. compare 方法内部，调用 类似于 hash 方法 把 明文，幂次，随机盐 都传递进去     最终得到正向加密后的密文
     // 4. 根据最新得到的密文，和 compare 提供的密文进行对比，如果相等，则 返回 true ，否则返回 false;
   })
   ```

   ​


## 使用模板引擎处理公共部分
在PHP中，抽取公共的区域，直接使用PHP语法就行；
但是，在Express的框架中，并没有抽取页面公共部分的语法，需要模板引擎提供这样的语法；



## 添加文章并跳转到文章详情
1. 发表文章之前，需要使用 第三方的插件，叫做 `markdown + editor` => `mditor`
2. 注意：`mditor`这个第三方模块，提供了两个功能：
 + 功能1： 可以当作一个纯粹的MarkDown编辑器插件，在前端页面中使用；
 + 功能2： 在Node端，我们可以`require('mditor')`，使用这个模块，提供的方法，把`markdown`文本，解析转换为`HTML`内容；


## 设计文章表的字段
![文章字段设计](./文章表字段设计.png)


## 完成文章编辑功能


## 首页文章列表渲染


## 使用Sql语句进行联表查询


## 首页文章列表分页功能的实现


## 相关文章
1. [node.js中express-session配置项详解](http://blog.csdn.net/liangklfang/article/details/50998959)
2. [MD5在线生成器1](http://www.cmd5.com/)
3. [MD5在线生成器2](http://pmd5.com/)
4. [JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)