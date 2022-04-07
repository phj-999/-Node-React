import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true, //是否让生成的文件含有hash后缀
  outputPath: 'build', //输出路径
  routes: [
    //{ path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layout/index',
      title: '首页',
      routes: [
        {
          path: '/',
          redirect: '/about'
        },
        {
          path: '/about',
          component: '@/pages/about/index',
          title: '关于',
        },
        {
          path: '/course',
          component: '@/pages/course/index',
          title: '课程',
          routes: [
            { path: '/course', redirect: '/course/list' },
            { path: '/course/list', component: './Course', title: '课程列表' },
            {
              path: '/course/add',
              component: './Course/addCourse',
              title: '添加课程',
            },
            {
              path: '/course/edit/:id',
              component: './Course/addCourse',
              title: '编辑课程',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
});
