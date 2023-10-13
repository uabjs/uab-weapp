import { canIUseGetUserProfile } from '../common/version';
// 按钮组件的基础模板
export const button = Behavior({
    // externalClasses 用来定义外部样式类
    externalClasses: ['hover-class'],
    properties: {
        id: String,
        buttonId: String,
        lang: String,
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String,
        openType: String,
        getUserProfileDesc: String, // 获取用户配置文件
    },
    data: {
        canIUseGetUserProfile: canIUseGetUserProfile(),
    },
    methods: {
        // triggerEvent 类似 vue 的 eimt 发射事件给父级组件
        onGetUserInfo(event) {
            this.triggerEvent('getuserinfo', event.detail);
        },
        onContact(event) {
            this.triggerEvent('contact', event.detail);
        },
        onGetPhoneNumber(event) {
            this.triggerEvent('getphonenumber', event.detail);
        },
        onGetRealTimePhoneNumber(event) {
            this.triggerEvent('getrealtimephonenumber', event.detail);
        },
        onError(event) {
            this.triggerEvent('error', event.detail);
        },
        onLaunchApp(event) {
            this.triggerEvent('launchapp', event.detail);
        },
        onOpenSetting(event) {
            this.triggerEvent('opensetting', event.detail);
        },
        onAgreePrivacyAuthorization(event) {
            this.triggerEvent('agreeprivacyauthorization', event.detail);
        },
        onChooseAvatar(event) {
            this.triggerEvent('chooseavatar', event.detail);
        },
    }
});
