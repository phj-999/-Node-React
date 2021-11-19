/**
 * 获取当前时间 格式 xx年xx月xx日xx:xx::xx
 * @module createTime 
 * @returns nowDate
 */

const createTime = () =>{
    /**
     * 创建一个取得当前日期的实列 new Date
     * @class
     * @inner
     */
    let date = new Date()
     /**
     * nowMonth是当前月份
     * strDate 是当前日期
     * hour 是小时
     * minute 是分钟
     * second 是秒数
     *  @inner
     */
    let nowMonth = date.getMonth()+1
    let strDate = date.getDate()
    let hour = date.getHours();
    let minute=date.getMinutes();
    let second = date.getSeconds()
    
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth>=1 && nowMonth<=9) {
        nowMonth = '0' + nowMonth
    }

    // 对日期进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }

    // 对hour进行处理
    if (hour>=0 && hour <= 9) {
        hour = '0'+ hour
    }

    // 对minute进行处理
    if (minute>=0 && minute <= 9) {
        minute = '0'+minute
    }
    
    // 对second进行处理
    if (second>=0&&second<=9) {
        second = '0'+ second
    }
    var nowDate = date.getFullYear()+'年' + nowMonth + '月' + strDate +'日' + hour +':'+ minute +':'+ second

    return nowDate
}

module.exports = createTime