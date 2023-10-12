import { canIUseGetUserProfile } from '../common/version';

// 按钮组件的基础模板
export const button = Behavior({
  // externalClasses 用来定义外部样式类
  externalClasses: ['hover-class'],

  properties: {
    id: String, // 唯一标识
    buttonId: String, // 按钮id唯一标识
    lang: String, // 	指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
    businessId: Number, // 微信客服消息子商户 id
    sessionFrom: String, // 会话来源
    sendMessageTitle: String, // 	会话内消息卡片标题
    sendMessagePath: String, // 显示会话内消息路径
    sendMessageImg: String, // 显示会话内消息图片
    showMessageCard: Boolean, // 显示会话内消息卡片
    appParameter: String, // 	打开 APP 时，向 APP 传递的参数
    ariaLabel: String, // 无障碍
    openType: String, // 微信开放能力，具体支持可参考
    getUserProfileDesc: String, // 获取用户配置文件
  },

  data: {
    canIUseGetUserProfile: canIUseGetUserProfile(),
  },

  methods: {
    // triggerEvent 类似 vue 的 eimt 发射事件给父级组件
    onGetUserInfo(event: WechatMiniprogram.ButtonGetUserInfo) {
      this.triggerEvent('getuserinfo', event.detail);
    },

    onContact(event: WechatMiniprogram.ButtonContact) {
      this.triggerEvent('contact', event.detail);
    },

    onGetPhoneNumber(event: WechatMiniprogram.ButtonGetPhoneNumber) {
      this.triggerEvent('getphonenumber', event.detail);
    },

    onGetRealTimePhoneNumber(event: WechatMiniprogram.ButtonGetPhoneNumber) {
      this.triggerEvent('getrealtimephonenumber', event.detail);
    },

    onError(event: WechatMiniprogram.ButtonError) {
      this.triggerEvent('error', event.detail);
    },

    onLaunchApp(event: WechatMiniprogram.ButtonLaunchApp) {
      this.triggerEvent('launchapp', event.detail);
    },

    onOpenSetting(event: WechatMiniprogram.ButtonOpenSetting) {
      this.triggerEvent('opensetting', event.detail);
    },

    onAgreePrivacyAuthorization(event) {
      this.triggerEvent('agreeprivacyauthorization', event.detail);
    },

    onChooseAvatar(
      event: WechatMiniprogram.CustomEvent<
        WechatMiniprogram.GeneralCallbackResult & { avatarUrl: string }
      >
    ) {
      this.triggerEvent('chooseavatar', event.detail);
    },
  }
})