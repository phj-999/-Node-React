const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const ObjectID = MongoDB.ObjectID;

const dbconfig = require('../config/mongodb')


class DB {

    static getInstance(){
        if (!DB.instance) {
            console.log('The First Single Sample Mode Walking Route')
            DB.instance = new DB()
            return DB.instance
        }
    }

    constructor(ele) {
        console.log('开始连接数据库');
        this.dbClient = null
        this.connect()
    }

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
    

    getObjectID(id){
        return  new ObjectID(id)
      } 

}

module.exports =  DB.getInstance()