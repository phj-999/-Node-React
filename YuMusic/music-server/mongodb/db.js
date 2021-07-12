const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const ObjectID = MongoDB.ObjectID;

const dbconfig = require('../config/mongodb')


class DB {

    static getInstance(){
        if (!DB.instance) {
            console.log('The First Single Sample Mode Walking Route')
            DB.instance = new DB()
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
    

    
    

    getObjectID(id){
        return  new ObjectID(id)
      } 

}

module.exports =  DB.getInstance()