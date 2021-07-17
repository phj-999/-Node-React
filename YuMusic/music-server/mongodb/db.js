const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const ObjectID = MongoDB.ObjectID;

const dbconfig = require('../config/mongodb')

/**
 * 封装的mongodb连接以及增删改查方法
 * @class
 * @module DB
 * @exports DB.getInstance()
 */
class DB {
/**
 * 创建连接
 * @returns DB.instance
 */
    static getInstance(){
        if (!DB.instance) {
            console.log('The First Single Sample Mode Walking Route')
            DB.instance = new DB()
            return DB.instance
        }
    }

    constructor() {
        console.log('开始连接数据库');
        this.dbClient = null
        this.connect()
    }
  /**
   * koa连接数据库逻辑
   */
    connect(){
        //node连接数据库
        return new Promise((resolve,reject)=>{
            //判断是否已经连接数据库
            MongoClient.connect(dbconfig.dburl,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err,client)=>{
                if (err) {
                    console.log('连接失败');
                    reject(err)
                }else{
                    console.log('连接成功');
                    const db = client.db(dbconfig.dbName)
                    resolve(db)
                }
            })

        })
    } 
    
    /**
     * 插入数据的逻辑封装
     * @param {String} collectionName 用户名称
     * @param {Object} data 要插入的数据
     */
  insertOne(collectionName,data){
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
    
  /**
   * 查询功能逻辑封装，用于查询用户
   * @param {String} collectionName 数据库名称
   * @param {Object} json 参数一
   * @param {Object} json2 参数二
   * @returns {Array.<String>}
   */
  findOne(collectionName,json,json2){
    return new Promise((resolve,reject)=>{
      this.connect().then((db)=>{
        var result = db.collection(collectionName).find(json,json2);
        result.toArray(function(err,docs){
          if(err){
            reject(err);
            return;
          }
          resolve(docs);
        })
      })
    })
  }

// find(collectionName, json1,json2, json3) {
//   let attr ={}
//   let skipNum = 0
//   let pageSize = 0
//   let page
// }
  

    getObjectID(_id){
        return  new ObjectID(_id)
      } 

}

module.exports =  DB.getInstance()