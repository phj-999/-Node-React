/**
 * 深拷贝浅拷贝
 *  深拷贝:复制真正的值
 *  浅拷贝:只复制引用，未复制真正的值
 * */

//浅拷贝
var  arr1 = ['a','b',"c","d"]
var arr2 = arr1

arr1[0] = '你好吗'
arr2[1] = '还行'

console.log(arr1,arr2);

var  obj1 = {a:1,b:2}
var obj2 = Object.assign(obj1)

obj1.a = '100'
obj2.b = 'hhhh'

console.log(obj1,obj2);

//深拷贝
var obj3 = {
    a:1,
    b:2
}
var obj4 = JSON.parse(JSON.stringify(obj3))
obj3.a="100"
obj4.b="你怎么样"
console.log("obj4",obj4);
console.log(obj3,obj4);