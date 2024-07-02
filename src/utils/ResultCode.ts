export class ResultCode {
    // SUCCESS
    SUCCESS = 0;
    // ERROR
    ERROR = 1;

    // 用户未登录！
    USER_NOT_LOGIN = 10;
    // 用户信息不存在！
    USER_NOT_EXIST = 11;
    // 用户没有绑定企业！
    USER_NOT_BOUND_COMPANY = 12;
    // 用户没有权限进行该操作！
    USER_NOT_AUTHORIZED = 13;

    // 全局异常捕获状态码
    // 服务器数据处理错误！
    SERVER_EXCEPTION_ERROR = -999;
    // 服务器空对象错误！
    SERVER_NULL_EXCEPTION_ERROR = -998;
    // 服务器数字格式化错误！
    SERVER_NUMBER_FORMAT_EXCEPTION_ERROR = -997;

    // 参数错误
    //  参数错误！
    PARAMETER_ERROR = 100;
    // 参数不能为空！
    PARAMETER_EMPTY_ERROR = 101;
    // 数据重复错误！
    DATA_IS_DUPLICATE_ERROR = 102;
    // 数据一致不需要更新！
    DATA_CONSISTENCY_ERROR = 103;
    // 该数据不存在！
    DATA_NOT_EXISTENCE_ERROR = 104;

    // 文件错误
    // 上传文件错误！
    FILE_UPLOAD_ERROR = 200;
    // 文件不存在！
    FILE_NOT_EXISTS_ERROR = 201;
    // 文件下载错误！
    FILE_DOWNLOAD_ERROR = 202;
    // 文件没有数据！
    FILE_EMPTY_ERROR = 203;
    // Excel文件标题错误！【%s】
    EXCEL_FIELD_HEADER_ERROR = 204;
    // Excel文件列不能为空！【%s】
    EXCEL_FIELD_EMPTY_ERROR = 205;
    // Excel文件数据类型错误！【%s】
    EXCEL_FIELD_TYPE_ERROR = 206;

    // 化学物质、CAS号、化学式在当前化学物质下不可重复添加！
    COMPANY_IS_NOT_AGENCY = 303;
    // 进行中项目不能评价！
    PROJECT_GOING_CANNOT_EVALUATION = 304;

    // 具体错误
    // 该企业不存在！
    COMPANY_NOT_EXISTENCE_ERROR = 300;

    public codeListMsg = new Map([
        [this.USER_NOT_LOGIN, "用户未登录"],
        [this.USER_NOT_EXIST, "用户信息不存在"],
        [this.USER_NOT_BOUND_COMPANY, "用户没有绑定企业"],
        [this.USER_NOT_AUTHORIZED, "用户没有权限进行该操作"],

        [this.SERVER_EXCEPTION_ERROR, "服务器数据处理错误"],
        [this.SERVER_NULL_EXCEPTION_ERROR, "服务器空对象错误"],
        [this.SERVER_NUMBER_FORMAT_EXCEPTION_ERROR, "服务器数字格式化错误"],

        [this.PARAMETER_ERROR, "参数错误"],
        [this.PARAMETER_EMPTY_ERROR, "参数不能为空"],
        [this.DATA_NOT_EXISTENCE_ERROR, "该数据不存在"],
        [this.DATA_CONSISTENCY_ERROR, "数据一致不需要更新"],

        [this.FILE_UPLOAD_ERROR, "上传文件错误"],
        [this.FILE_NOT_EXISTS_ERROR, "文件不存在"],
        [this.FILE_DOWNLOAD_ERROR, "文件下载错误"],
        [this.FILE_EMPTY_ERROR, "文件没有数据"],
        [this.EXCEL_FIELD_HEADER_ERROR, "1"],
        [this.EXCEL_FIELD_EMPTY_ERROR, "1"],
        [this.EXCEL_FIELD_TYPE_ERROR, "1"],

        [this.PROJECT_GOING_CANNOT_EVALUATION, "进行中项目不能评价"],
    ]);
}

export const infoResultCode: any = {
    // SUCCESS
    SUCCESS: 0,
    // ERROR
    ERROR: 1,
    //请重新登录
    USER_NOT_LOGIN: 1001,
    // token错误
    USER_NOT_EXIST: 1010,
    // 用户名密码错误
    USER_NAME_OR_PASSWORD_ERROR: 1003,
};

infoResultCode.codeListMsg = new Map([[infoResultCode.USER_NAME_OR_PASSWORD_ERROR, "用户名密码错误"]]);

/**
 * 很重要的信息
 * 需要特殊处理的code
 * 不弹框拦截的错误码！！！
 */
export const notInterceptResultCode: { [key: string]: number } = {
    //前用户未分配角色，请联系管理员
    USER_WITHOUT_CHARACTER: 1,
    // 请重新登录
    USER_NOT_LOGIN: 1001,
    // token失效
    USER_TOKEN_INVALID: 1009,
    // token过期
    USER_TOKEN_EXPIRE: 900,

    // 登录=============
    // 用户不存在
    USER_NOT_EXIST: 930,
    // 用户已存在
    USER_EXIST: 940,
    // 用户禁用
    USER_DISABLE: 950,
    // 验证码错误
    CAPTCHA_ERROR: 920,
    // 用户无权限登录
    USER_DISABLE_ERROR: 950,
    // 短信验证失败
    USER_SMS_VERIFICATION_ERROR: 960,
    //文件不存在
    FILE_NOT_EXIT: 201,
};

export const CodeMessage ={
    
}
export const OUT_OF_LOGIN={
       // 请重新登录
       USER_NOT_LOGIN: 1001,
       // token失效
       USER_TOKEN_INVALID: 1009,
       // token过期
       USER_TOKEN_EXPIRE: 900,
       //登录信息超时
       USER_LOGOUT: 40101,
       //用户不存在
       USER_NOT_EXIST: 11,
       
}