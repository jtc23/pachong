/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-07 09:33:47
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-11 10:11:22
 * @FilePath: \companyApplication\src\service\global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/utils/request";

/**
 * 获取图片验证码
 */
export async function getFakeCaptcha(): Promise<any> {
    return api.get("/api/login/verifyCodeService", {
        // getResponse: true,
    },{
        responseType: "blob",
        getResponse: true,
    });
}


export async function systemLogin(data: any): Promise<any> {
    // data.password = getAES(data?.password);
    return api.post("/api/login/m/login", data);
}

export async function systemMain(): Promise<any> {
    // data.password = getAES(data?.password);
    return api.get("/api/energy/monitor/get/cockpit");
}

export async function getOverview(): Promise<any> {
    // data.password = getAES(data?.password);
    return api.get("/api/energy/monitor/screen/get/overview");
}
