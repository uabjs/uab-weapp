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
    logo: 'https://img.yzcdn.cn/vant/logo.png',
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
        url: 'https://github.com/uabjs/uab-weapp.git',
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
        ]
      }
    ]
  }
}