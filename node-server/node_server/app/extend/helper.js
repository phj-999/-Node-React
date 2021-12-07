const dayjs = require("dayjs");

module.exports = {
  /**
   * 时间格式化
   */
  time() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss");
  },
  /**
   * 日期转化成当前时间戳
   * @return {string} 当前时间
   */
  timestamp(data) {
    return new Date(data).getTime();
  },
  /**
   * 从对像中排除某些属性
   * @param {Object} source
   * @param {Array} arr
   * @return {Object} obj
   **/
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      let obj = {};
      for (let i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
};
