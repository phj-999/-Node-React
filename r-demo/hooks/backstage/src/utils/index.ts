import { useEffect,useState } from "react"


export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
//避免value为0的情况
export const isFalsy = (value:any) => value ===0?false : !value //!!表示把一个值转成布尔值
//在函数中 
export const cleanObject = (object?: { [key: string]: unknown }) =>{
    if (!object) {
        return {};
      }
      const result = { ...object };
      Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
          delete result[key];
        }
      });
      return result;
}

//对useEffect封装  避免写的时候全页面都是useffect带着[]
export const useMount = (callback:() => void) =>{
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

//防抖
// const debounce = (func,delay)=>{
//     let timeout
//     return (...param) =>{
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout =setTimeout(function () {
//             func(...param)
//         }, delay);
//     }
// }
//防抖hooks
export const useDebounce =(value:any, delay?:number)=>{
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        //每次value变化 设置一个定时器
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        //每次上一个useEffect处理完清理完后再运行
        return () => clearTimeout(timeout)
    }, [value,delay])

    return debouncedValue
}