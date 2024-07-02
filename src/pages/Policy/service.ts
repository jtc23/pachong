/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-04-17 15:18:00
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 11:13:55
 * @FilePath: \carb-enterprise-web\src\pages\Third\Policy\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/utils/request";

// 获取企业详情
export async function getLatestPolicyList(data: any) {
    return api.post('/api/init/c/learning/policy/get/list', data);
}

export async function getLatestPolicyDropNew(params: any): Promise<any> {
    return api.get("/api/init/c/learning/policy/get/tree",params)
}

