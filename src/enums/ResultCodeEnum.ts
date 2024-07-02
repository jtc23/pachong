/**
 * 枚举
 */
export enum ResultCodeEnums {
    /**
     * 成功
     */
    SUCCESS = 0,
    /**
     * 失败
     */
    FAIL = 1,
    /**
     * 验证码失效或者不存在
     */
    CAPTCHA_INVALID = 1066,
    /**
     * 用户名或密码错误
     */
    USERNAME_OR_PASSWORD_ERROR = 1003,

    /**
     * 验证码错误
     */
    CAPTCHA_ERROR = 1067,

    /**
     * token错误
     */
    TOKEN_ERROR = 1011,

    /**
     * token失效
     */
    TOKEN_INVALID = 1010,
}
