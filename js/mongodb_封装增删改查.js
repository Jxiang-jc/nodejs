function Mongo(options) {
    this.settings = {
        url: 'mongodb://localhost:27017',
        MongoClient:require('mongodb').MongoClient,
        assert:require('assert'),
        dbName:'1805'
    };

    for(let i in options){
        this.settings[i] = options[i];
    }

    this._run = function (fun) {
        let that = this;
        let settings = this.settings;
        this.settings.MongoClient.connect(this.settings.url, function (err, client) {
            settings.assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(settings.dbName);
            // console.log(db)


            fun(db, function () {
                
                client.close();
            });
        });
    };

    this.insert = function (collectionName, data, func) {
        //增加数据
        let insertDocuments = function (db, callback) {
            // let collection = db.collection('kugouMusic');
            db.collection(collectionName).insertMany(
                data
            , function (err, result) {
                if (!err) {
                    func(result);
                } else {
                    func(false);
                }
                callback(result);
            });
        };

        this._run(insertDocuments);
    };

    this.update = function (collectionName, updateData, data, func) {
        //更新数据
        let updateDocument = function (db, callback) {
            let collection = db.collection(collectionName);
            collection.updateOne(updateData
                , {$set: data}, function (err, result) {
                    if (!err) {
                        func(true);
                    } else {
                        func(false);
                    }
                    callback(result);
                });
        };

        this._run(updateDocument);
    };

    this.delete = function (collectionName, data, func) {
        //删除数据
        let deleteDocument = function (db, callback) {
            let collection = db.collection(collectionName);
            collection.deleteOne(data, function (err, result) {
                if (!err) {
                    func(true);
                } else {
                    func(false);
                }
                callback(result);
            });
        };

        this._run(deleteDocument);
    };

    this.find = function (collectionName, data, func) {
        //查找数据
        let findDocuments = function (db, callback) {
            // Get the documents collection
            let collection = db.collection(collectionName);
            // Find some documents
            collection.find(data).toArray(function (err, docs) {
                if (!err) {
                    func(true,docs);
                }
                else {
                    func(false, err);
                }
                callback(docs);
            });
        };

        this._run(findDocuments);
    };
}

module.exports = Mongo;



/*我存入到了一个名字叫server.js的文件名内


使用
我们在需要使用页面先将模块引入，比如我在路由文件index.js里面引入：
const Server = require("../server.js");

然后需要实例化对象，如下：
let server = new Server();



如果需要配置相关信息，可以在实例化的时候传入一个对象配置，可以配置数据库的地址：
let server = new Server({url:"mongodb://localhost:27017/mydb"});



里面封装了四个方法，添删改查，分别是 
添加方法
server.insert(数据表名,需要插入的数据（键值对的对象）,回调函数);



更新方法
server.update(数据表名,查询的数据（对象）,更新的数据（对象）,回调函数);



删除方法
server.delete(数据表名,查询的数据（对象）,回调函数);



查找方法
server.find(数据表名,查询的数据（对象）,回调函数);

回调函数都会返回两个值，第一个布尔类型，是否处理成功，第二个值，查找返回查找到的个数，别的都返回处理成功的个数（现在一次只处理一条）



使用案例
比如我需要在一个路由里面查找数据，我就需要这样：

server.find("users",{username:"username"},function (bool,data) {
        if(bool){
            console.log("查询到数据为"+data.length+"条");
        }
        else{
            console.log(data);
        }
    });
});

上面的代码是查询了users表里面username为username的字段的数据，如果成功，后面data就会返回一个数组，如果出现错误，就直接返回data错误。
*/
