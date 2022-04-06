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
        },
      ],
    },
  ],
  fastRefresh: {},
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
});
