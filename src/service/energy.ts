/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-04 16:23:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-10 15:01:45
 * @FilePath: \companyApplication\src\service\energy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/utils/request";


export async function getEnergyMonitorList(data: any): Promise<any> {
    return api.get("/api/energy/monitor/get/list", data);
}

export async function getpointAddressList(): Promise<any> {
    return api.get("/api/energy/monitor/get/address/list");
}
export async function getpointNameList(): Promise<any> {
    return api.get("/api/energy/monitor/get/name/list");
}

export async function getEnergyMointorDetail(data: any): Promise<any> {
    return api.get("/api/energy/monitor/get/load", data);
}


export async function getCarbonMonitorList(data: any): Promise<any> {
    return api.get("/api/energy/monitor/get/carbon/list", data);
}
export async function getCarbonMointorDetail(data: any): Promise<any> {
    return api.get("/api/energy/monitor/get/carbon/info", data);
}


/**
 * 荻取碳排监测详情页左侧导航栏
 */
export async function getCarbonMonitorNav(): Promise<any> {
    return api.get("/api/energy/monitor/get/tree/list");
}

/**
 * 获取大屏控制器详情信息
 */
export async function getEnergyMonitorDetail(): Promise<any> {
    return api.get("/api/energy/monitor/get/manage/info");
}

/**
 * 保存大屏控制器详情信息
 */
export async function saveEnergyMonitorDetail(data: any): Promise<any> {
    return api.post("/api/energy/monitor/save/manage/info", data);
}