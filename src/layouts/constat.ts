/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2023-03-14 11:46:16
 */
import { SystemIdEnums } from '@/enums/System'
// 区域概览
const OVER_VIEW = {
    name: '区域概况',
    key: SystemIdEnums.OVER_VIEW_ID
}

// 碳排总览
const CARBON_OVER_VIEW = {
    name: '碳排总览',
    key: SystemIdEnums.CARBON_OVER_VIEW_ID
}

// 能耗在线
const ENERGY_ONLINE = {
    name: '能耗在线',
    key: SystemIdEnums.ENERGY_ONLINE_ID
}

// 碳足迹
const CARBON_FOOTPRINT = {
    name: '碳足迹',
    key: SystemIdEnums.CARBON_FOOTPRINT_ID
}

// 碳普惠
const CARBON_BENEFIT = {
    name: '碳普惠',
    key: SystemIdEnums.CARBON_BENEFIT_ID
}

// 项目能耗评估
const PROJECT_ENERGY_ASSESSMENT = {
    name: '项目能耗评估',
    key: SystemIdEnums.PROJECT_ENERGY_ASSESSMENT_ID
}

export let parkCode = ''


export let isNanChang = false

// 系统列表常量
export const systemList = (data: any) => {
    parkCode = data?.code;
    isNanChang = parkCode == 'ncjkq'
    // 判断为南昌园区的
    if (data?.park === '1714840355763507202') {
        return [
            OVER_VIEW,
            ENERGY_ONLINE,
            CARBON_OVER_VIEW,
        ]
    }

    // 如果是四川双流机场经济技术开发区的话
    if (data?.park === '1721729452541071361') {
        return [
            OVER_VIEW,
            CARBON_OVER_VIEW,
            ENERGY_ONLINE,
            CARBON_FOOTPRINT,
            PROJECT_ENERGY_ASSESSMENT
        ]
    }

    // 1721729452541071361
    return [
        OVER_VIEW,
        CARBON_OVER_VIEW,
        ENERGY_ONLINE,
        CARBON_FOOTPRINT,
        CARBON_BENEFIT,
        PROJECT_ENERGY_ASSESSMENT
    ]
}
