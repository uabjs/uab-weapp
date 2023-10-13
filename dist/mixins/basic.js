// 默认注入到组件内的共享特性，类似于一些编程语言中的 “mixins” 或 “traits”。
export const basic = Behavior({
    methods: {
        $emit(name, detail, options) {
            // 微信小程序组件间通信（参考：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html）
            this.triggerEvent(name, detail, options);
        },
        // 设置 data 数据，返回一个 promise 微任务，页面数据改变后会触发 promise 的成功回调
        set(data) {
            this.setData(data);
            return new Promise((resolve) => wx.nextTick(resolve));
        },
    },
});
