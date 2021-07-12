const Config = require('./index')
const MongoDB = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = MongoDB.ObjectID;

class DB{
  constructor(ele){
    console.log('Connect to the database')
    this.connect()
  }

  static getInstance(){
    //  多次调用也只会 走一次或多次
    if(!DB.instance){
      console.log('The First Single Sample Mode Walking Route')
      //因为没有DB.instance 所以就自己创造个实例对象
      DB.instance = new DB()
    }else{
      console.log('Second,Third times ...')
    }
    return DB.instance
  }

  connect(){
    //nodejs连接数据库
    return new Promise((resolve,reject)=>{
      MongoClient.connect(Config.url,{useNewUrlParser: true,useUnifiedTopology: true},(err,client)=>{   // Config.url === LXW
        if(err){
          console.log('Connection Failed')
          reject(err)
        }else{
          console.log('Connection Succeeded')
          // 数据库db对象
          const db = client.db(Config.dbName);
          // new promise解决异步问题  返回文件对象 //  整个connect() 基本就是db对象 ==>db
          resolve(db)
        }
      })
    })
  }
  // 新增
  insert(collectionName,data){
    return new Promise((resolve,reject)=>{
      this.connect().then(db=>{
        db.collection(collectionName).insertOne(data,(error,result)=>{
          if(!error){
            console.log('增加数据成功');
            resolve(result)
          }else{
            console.log(error,'增加数据失败');
            reject(error)
          }
        })
      })
    })
  }
  // 更新
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
          db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }
  // 删除
  delete(collectionName,condition){
    return new Promise((resolve,reject)=>{
      this.connect().then(db=>{
        db.collection(collectionName).deleteOne(condition,function(error,result){
          if(!error){
            console.log('删除数据成功');
            resolve(result)
          }else{
            console.log(error,'删除数据失败');
            reject(error)
          }
        })
      })
    })
  }
  // 查询
  find(collectionName, json1, json2, json3) {
    let attr = {}
    let skipNum = 0
    let pageSize = 0
    let page = 1
    if (arguments.length === 2) {
      attr = {}
      skipNum = 0
      pageSize = 0
    } else if (arguments.length === 3) {
      attr = json2
      skipNum = 0
      pageSize = 0
    } else if (arguments.length === 4) {
      attr = json2
      page = Number(json3.page) || 1
      pageSize = Number(json3.pageSize) || 10
      skipNum = (page - 1) * pageSize
    } else {
      console.log('传入参数有误');
    }
    return new Promise((resolve, reject) => {
        this.connect().then((db) => {
          let result = db.collection(collectionName).find(json1, attr).skip(skipNum).limit(pageSize).sort({"add_time": -1});
          result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        })
      })
    })
  }

  //固定写法  用于获取_id值下标
  getObjectID(id){
    return  new ObjectID(id)
  }
}

module.exports =  DB.getInstance()