import { UabComponentOptions } from '../definitions'
import { basic } from '../mixins/basic'

function UabComponent<
  Data extends WechatMiniprogram.Component.DataOption,
  Props extends WechatMiniprogram.Component.PropertyOption,
  Methods extends WechatMiniprogram.Component.MethodOption
>(uabOptions: UabComponentOptions<Data, Props, Methods>): void {
  const options: WechatMiniprogram.Component.Options<Data, Props, Methods> = {};

  // 设置 externalClasses 外部样式类的默认值 （查考：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB）
  options.externalClasses = options.externalClasses || []
  options.externalClasses.push('custom-class')

  // 设置 behaviors 组件间代码共享的默认值
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);

  // 设置 relations
  const { relation } = uabOptions;
  if (relation) {
    options.relations = relation.relations;
    options.behaviors.push(relation.mixin);
  }

  // 添加默认配置
  options.options = {
    multipleSlots: true,  // 组件默认支持多个 slot 插槽 （参考：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/glass-easel/dynamic-slots.html）
    addGlobalClass: true, // 等价于	styleIsolation: apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；（参考：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/glass-easel/migration.html#JSON-%E9%85%8D%E7%BD%AE 和 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB）
  };

  Component(options);
}


export { UabComponent }