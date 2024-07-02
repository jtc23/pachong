/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-26 13:41:10
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-04 10:10:09
 * @FilePath: \caculator\src\enums\global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum GLOBAL{
    MENU="menu",
    PERMISSION="permission",
    VIP="vip",
    GPT="gptcontent",
    USER="user",
    IS_AFK="is_afk",
    POLLING_TIME="polling_time",
    ISPATH="isPath",
    MESSAGE="message"
}

export enum RESPONSECODE {
    // 成功
    SUCCESS = 0,
    // 没有数据
    FAIL = 1,
    //验证码错误
    CODERROR=920,
    //短信错误
    MESERROR=960,
}

export enum CHARACTER {
    // 默认用户
    USER = "user",
    // 管理用户
    ADMIN = "leader"
}

export enum CODES {
    UnifiedSocialCreditCode = "统一社会信用代码",
    CustomsCode ="海关编码"
}