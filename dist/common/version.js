let systemInfo;
export function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
/** 版本大小对比：输出 -1 表示 v1 小于 v2, 输出 1 表示 v1 大于 v2, 输出 0 一样大 */
function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i], 10);
        const num2 = parseInt(v2[i], 10);
        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
    }
    return 0;
}
/** 对比系统版本 */
function gte(version) {
    const system = getSystemInfoSync();
    return compareVersion(system.SDKVersion, version) >= 0;
}
/** 当前版本是否可以使用表单字段按钮 */
export function canIUseFormFieldButton() {
    return gte('2.10.3');
}
/** 判断是否可以使用获取用户配置文件，可以返回 true */
export function canIUseGetUserProfile() {
    return !!wx.getUserProfile;
}
