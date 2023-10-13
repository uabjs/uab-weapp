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
    classes: ['hover-class', 'loading-class'],
    data: {
        baseStyle: '',
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: 'uab-icon',
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: 'circular',
        },
        type: {
            type: String,
            value: 'default',
        },
        dataset: null,
        size: {
            type: String,
            value: 'normal',
        },
        loadingSize: {
            type: String,
            value: '20px',
        },
        color: String, // 按钮颜色，支持传入linear-gradient渐变色
    },
    methods: {
        onClick(event) {
            this.$emit('click', event);
            const { canIUseGetUserProfile, openType, getUserProfileDesc, lang, } = this.data;
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
});
