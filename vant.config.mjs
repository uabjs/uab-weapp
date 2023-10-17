export default {
  name: 'uab-weapp',
  build: {
    srcDir: 'packages', // 读取的 md 文档目录
    site: {
      publicPath: '/uab-weapp/',
    },
  },
  site: {
    versions: [{ label: '0.x', link: '/uab-weapp/0.x' }],
    title: 'Uab Weapp',
    description: '轻量、可靠的小程序 UI 组件库',
    logo: 'https://avatars.githubusercontent.com/u/73016681?s=200&v=4',
    simulator: { // 模拟器
      url: 'https://vant-contrib.gitee.io/vant/v2/mobile.html?weapp=1', // 使用 vant 网页模拟器地址
      routeMapper: (path) => {
        return `/zh-CN${path}`
      },
      syncPathFromSimulator: false, // 模拟器同步路径
    },
    links: [
      {
        logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
        url: 'https://github.com/uabjs/uab-weapp',
      },
    ],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ]
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'button',
            title: 'Button 按钮',
          },
          {
            path: 'icon',
            title: 'Icon 图标',
          },
        ]
      },
      {
        title: '反馈组件',
        items: [
          {
            path: 'loading',
            title: 'Loading 加载',
          },
        ]
      }
    ]
  }
}