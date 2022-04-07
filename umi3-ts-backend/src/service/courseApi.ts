import axios from 'axios'
import {Response} from '@/utils/types'
// 检查请求状态
function checkStatus(response:{data: Response; status: number}):Response {
   if (response.status>=200 && response.status<300) {
    return { ...response.data };
   }
   return { datas: [], success: false, keywords: '' };
}
export const getList = async (params: object) => {
  const response = await axios.get('/api/courseList', { params });
  return checkStatus(response);
};

// 请求课程分类
export const getTypeList = async () => {
  const response = await axios.get('/api/dictionary/type');
  return checkStatus(response);
};

// 添加课程
export const add = async (params: object) => {
  const response = await axios.post('/api/course/add', params);
  return checkStatus(response);
};

// 获取编辑课程信息
export const getEditCourse = async (params: object) => {
  const response = await axios.get('/api/course/editCourse', { params });
  return checkStatus(response);
};

// 编辑课程
export const editCourse = async (params: object) => {
  const response = await axios.post('/api/course/edit', params);
  return checkStatus(response);
};

// 删除课程
export const deleteCourse = async (params: object) => {
  const response = await axios.delete('/api/course/delete', { params });
  return checkStatus(response);
};
