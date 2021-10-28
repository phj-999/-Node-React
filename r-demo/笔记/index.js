//数组扁平化 除去重复数据 升序  最终得到一个升序并且不重复的数组
let arr = [1,2,[3,4,5,[6,7,[8,9]]]]
//es6的方法 用flat函数 数组扁平化 将多维数组转换成一维数组
const flatArr1 = (arr) => {
    return arr.flat(Infinity)
}
console.log(flatArr1(arr));

//es5的方法
let arr1 = [1,2,[3,4,5,[6,7,[8,9]]]]
let arrEs5 = arr1.toString()
console.log(arrEs5);