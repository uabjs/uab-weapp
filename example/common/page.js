export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Uab Weapp 组件库演示'
      };
    },
    ...options
  });
}
