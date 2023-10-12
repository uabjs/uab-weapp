import { UabComponent } from '../common/component';
import { button } from '../mixins/button';
import { canIUseFormFieldButton } from '../common/version';

const mixins = [button];

// 版本可以则标记为表单提交按钮
if (canIUseFormFieldButton()) {
  // behaviors: ['wx://form-field-button'] 是小程序组件中的一个属性，它的作用是将当前组件标记为表单提交按钮。当用户在表单中按下回车键时，如果当前聚焦的表单控件设置了 confirm-type 属性为 search 或 next，则会自动触发与该表单控件同级别且具有 wx://form-field-button 行为的按钮的 tap 事件。
  // 简单来说，这个属性可以让开发者更方便地实现表单的提交操作，提高交互性和用户体验。
  mixins.push('wx://form-field-button');
}

UabComponent({
  mixins,
  classes: [ 'hover-class', 'loading-class' ], // 用来定义外部样式类
  data: {
    baseStyle: '',
  },

  props: {
    formType: String, // 用于 form 组件，可选值为submit reset，点击分别会触发 form 组件的 submit/reset 事件
    icon: String,  // 图标
    classPrefix: { // 图标类名前缀，同 Icon 组件的 class-prefix 属性
      type: String,
      value: 'uab-icon',
    },
    plain: Boolean, // 是否为朴素按钮
    block: Boolean, // 是否为块级元素
    round: Boolean, // 是否为圆形按钮
    square: Boolean, // 是否为方形按钮
    loading: Boolean, // 是否使用 0.5px 边框
    hairline: Boolean, // 是否使用 0.5px 边框
    disabled: Boolean, // 是否禁用按钮
    loadingText: String, // 加载状态提示文字
    customStyle: String, // 自定义样式
    loadingType: { // 加载状态图标类型，可选值为 spinner
      type: String,
      value: 'circular',
    },
    type: { // 按钮类型，可选值为 primary info warning danger
      type: String,
      value: 'default',
    },
    dataset: null, // 按钮 dataset，open-type 为 share 时，可在 onShareAppMessage 事件的 event.target.dataset.detail 中看到传入的值
    size: { // 按钮尺寸，可选值为 normal large small mini
      type: String,
      value: 'normal',
    },
    loadingSize: { // 加载图标大小
      type: String,
      value: '20px',
    },
    color: String, // 按钮颜色，支持传入linear-gradient渐变色
  },
  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click', event);

      const {
        canIUseGetUserProfile,
        openType,
        getUserProfileDesc,
        lang,
      } = this.data

      // 点击按钮获取用户信息
      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: getUserProfileDesc || '  ',
          lang: lang || 'en',
          complete: (userProfile) => {
            this.$emit('getuserinfo', userProfile);
          },
        });
      }
    }
  }
})