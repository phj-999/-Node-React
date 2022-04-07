type CourseList = {
  id: string;
  type: string;
  name: string;
  totalPrice: string;
  amount: string;
  address: string;
};

let courseList: CourseList[] = [
  {
    id: '1',
    type: 'html',
    name: 'Web前端开发零基础教程',
    totalPrice: '¥168',
    amount: '999',
    address: 'https://ke.qq.com/course/1968055?tuin=c9304a42',
  },
  {
    id: '2',
    type: 'javascript',
    name: 'JavaScript小白入门到实战项目',
    totalPrice: '¥48',
    amount: '999',
    address: 'https://ke.qq.com/course/464526?tuin=c9304a42',
  },
  {
    id: '3',
    type: 'javascript',
    name: 'Javascript-20个实战项目',
    totalPrice: '¥78',
    amount: '999',
    address: 'https://ke.qq.com/course/1740943?tuin=c9304a42',
  },
  {
    id: '4',
    type: 'Nodejs',
    name: 'Nodejs九阳真经-打通任督二脉',
    totalPrice: '¥78',
    amount: '999',
    address: 'https://ke.qq.com/course/2468298?tuin=c9304a42',
  },
  {
    id: '5',
    type: 'Nodejs',
    name: 'NodeJS实战项目-课程管理系统',
    totalPrice: '¥28',
    amount: '999',
    address: 'https://ke.qq.com/course/464841?tuin=c9304a42',
  },
  {
    id: '6',
    type: 'Nodejs',
    name: 'Express核心API精讲实战接口构建',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464637?tuin=c9304a42',
  },
  {
    id: '7',
    type: 'Nodejs',
    name: 'Koa2核心API精讲实战接口构建',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464614?tuin=c9304a42',
  },
  {
    id: '8',
    type: 'Nodejs',
    name: '阿里云服务器-nodejs项目部署',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/462866?tuin=c9304a42',
  },
  {
    id: '9',
    type: '工具',
    name: 'Git版本管理工具-入门到精通',
    totalPrice: '¥48',
    amount: '999',
    address: 'https://ke.qq.com/course/579440?tuin=c9304a42',
  },
  {
    id: '10',
    type: '工具',
    name: 'webpack4-进阶精讲教程',
    totalPrice: '¥28',
    amount: '999',
    address: 'https://ke.qq.com/course/464583?tuin=c9304a42',
  },
  {
    id: '11',
    type: 'Vue',
    name: 'Vue2.x入门到高效还原美团外卖项目(vue全家桶/axios/vue-router)',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/464832?tuin=c9304a42',
  },
  {
    id: '12',
    type: 'Vue',
    name: 'Vue2.x全栈项目-社交管理系统(vue+vuex+router+axios)',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/392110?tuin=c9304a42',
  },
  {
    id: '13',
    type: 'Vue',
    name: 'VueCli4核心API精讲入门实战(vue/vuex/state/路由/axios/打包)',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464544?tuin=c9304a42',
  },
  {
    id: '14',
    type: 'Vue',
    name: 'VueCli3.x全栈项目-资金管理系统',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/391846?tuin=c9304a42',
  },
  {
    id: '15',
    type: 'Vue',
    name: 'Vue移动端全栈开发-仿微信聊天朋友圈',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/392127?tuin=c9304a42',
  },
  {
    id: '16',
    type: 'Vue',
    name: 'VueCli3实战项目-还原饿了么1订餐app',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/379593?tuin=c9304a42',
  },
  {
    id: '17',
    type: 'Vue',
    name: 'VueCli3实战项目-还原饿了么2订餐app',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/395010?tuin=c9304a42',
  },
  {
    id: '18',
    type: 'Vue',
    name: 'VueCli3实战项目-还原饿了么3订餐app',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/399279?tuin=c9304a42',
  },
  {
    id: '19',
    type: 'Vue',
    name: 'VueCli3实战项目-还原饿了么4订餐app',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/414161?tuin=c9304a42',
  },
  {
    id: '20',
    type: 'typescript',
    name: 'TypeScript核心API精讲',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464466?tuin=c9304a42',
  },
  {
    id: '21',
    type: 'typescript',
    name: 'Node+TypeScript实战后端API接口',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/464485?tuin=c9304a42',
  },
  {
    id: '211',
    type: 'typescript',
    name: 'Node+TypeScript实战后端API接口',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/464485?tuin=c9304a42',
  },
  {
    id: '22',
    type: 'Vue',
    name: 'VueTypeScript实战组件封装-UIButton',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/2029549?tuin=c9304a42',
  },
  {
    id: '23',
    type: 'React',
    name: 'dvaJS实战点餐系统(商品管理/购物车/数据请求/路由)',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/382788?tuin=c9304a42',
  },
  {
    id: '24',
    type: 'React',
    name: 'UmiJS2商业级实战项目OA管理系统',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/470529?tuin=c9304a42',
  },
  {
    id: '25',
    type: 'React',
    name: 'ReactHooks核心API精讲(useState/Effect/Context/优化/重构)',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464538?tuin=c9304a42',
  },
  {
    id: '26',
    type: 'React',
    name: 'React全栈商业级应用项目',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/464697?tuin=c9304a42',
  },
  {
    id: '27',
    type: 'React',
    name: 'UmiJS3+Typescript+Mock用户管理系统',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464697?tuin=c9304a42',
  },

  {
    id: '28',
    type: '微信小程序',
    name: '微信小程序-入门到实战经典教程(京东商城)',
    totalPrice: '¥68',
    amount: '999',
    address: 'https://ke.qq.com/course/391953?tuin=c9304a42',
  },
  {
    id: '29',
    type: '微信小程序',
    name: 'mpVue实战教程-开发微信小程序',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/369750?tuin=c9304a42',
  },
  {
    id: '30',
    type: '微信小程序',
    name: 'uniapp商业级应用实战一套代码8端程序',
    totalPrice: '¥78',
    amount: '999',
    address: 'https://ke.qq.com/course/457370?tuin=c9304a42',
  },
  {
    id: '31',
    type: 'Flutter',
    name: 'Flutter核心API精讲小白入门到实战',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/466804?tuin=c9304a42',
  },
  {
    id: '32',
    type: 'Flutter',
    name: 'Flutter商业级实战项目-仿京东商城',
    totalPrice: '¥108',
    amount: '999',
    address: 'https://ke.qq.com/course/2262443?tuin=c9304a42',
  },
];

// 获取路径参数
function getUrlParam(url: string, key: string) {
  // 获取参数
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); // 匹配目标参数
  var result = url.split('?')[1].match(reg); // 返回参数值
  var keywords = result ? decodeURIComponent(result[2]) : '';
  return keywords;
}

const getCourseList = (req: { url: string }, res: any) => {
  // console.log(req.url);
  let keywords = getUrlParam(req.url, 'keywords');
  let filterList =
    !keywords || keywords == ''
      ? courseList
      : courseList.filter((item: { type: string; name: string }) => {
          return (
            item.type.indexOf(keywords) !== -1 ||
            item.name.indexOf(keywords) !== -1
          );
        });
  res.send({
    success: true,
    datas: filterList,
    keywords: keywords,
  });
};

// 添加课程
const addCourse = (req: { body: CourseList }, res: any) => {
  let { type, name, totalPrice, amount, address } = req.body;
  courseList.unshift({
    id: Date.now().toString(),
    type,
    name,
    totalPrice,
    amount,
    address,
  });

  res.send({ msg: '添加成功', success: true });
};

// 获取编辑课程信息
const getEditCourse = (req: { url: string }, res: any) => {
  let id = getUrlParam(req.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id == id);
  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  res.send({ success: true, datas: courseList[index] });
};

// submit edit
const editCourse = (req: { body: CourseList }, res: any) => {
  let { id } = req.body;
  let index = courseList.findIndex((item: CourseList) => item.id == id);

  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  courseList[index] = { ...req.body };

  res.send({ msg: '编辑成功', success: true });
};

// 删除课程信息
const deleteCourse = (req: { url: string }, res: any) => {
  let id = getUrlParam(req.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id == id);
  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  // 更新数据
  courseList.splice(index, 1);

  res.send({ success: true, msg: '删除成功' });
};

export default {
  '/api/courseList': getCourseList,
  '/api/dictionary/type': {
    datas: [
      { label: 'HTML', value: 'html' },
      { label: 'Javascript', value: 'Javascript' },
      { label: 'Node', value: 'Node' },
      { label: '工具', value: '工具' },
      { label: 'Vue', value: 'Vue' },
      { label: 'React', value: 'React' },
      { label: '微信小程序', value: '微信小程序' },
      { label: 'Flutter', value: 'Flutter' },
    ],
  },
  'POST /api/course/add': addCourse,
  '/api/course/editCourse': getEditCourse,
  'POST /api/course/edit': editCourse,
  'DELETE /api/course/delete': deleteCourse,
};
