/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-13 14:15:23
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-09 15:11:14
 * @FilePath: \companyApplication\src\constat\instant.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE0
 */
export const instants ={
    "id": 6,
    "dataType": 1,
    "dataDate": "2022",
    "connectedEnterpriseNumber": 16,
    "keyEnterpriseNumber": 168,
    "comprehensiveConsumption": 0,
    "intensity": 0.3910000000,
    "electricity": 0,
    "electricityConsumption": 355381.0000000000,
    "heat": 0,
    "heatConsumption": 0,
    "gas": "-",
    "gasConsumption": 0,
    "coal": "-",
    "coalConsumption": 0,
    "oil": 0,
    "oilConsumption": 0,
    "exceededWarningEnterpriseNumber": 0,
    "exceededWarningValue": 0,
    "electricityShow":0,
}

export const total_energy=[
    {
        key: "2021",
        value: 6485.301384,
      },
      {
        key: "2022",
        value: 6425.643074,
      },
      {
        key: "2023",
        value: 7400.90366,
      },
      // {
      //   key: "2024",
      //   value: 0,
      // },
]
export const total_electric=[
    {
        key: "2021",
        value: 20285760,
      },
      {
        key: "2022",
        value: 21979360,
      },
      {
        key: "2023",
        value: 27836800,
      },
      // {
      //   key: "2024",
      //   value: 0,
      // },
]
export const list = [
  {
      icon: 'enterprise',
      name: '已接入设备',
      value: '0',
      dataIndex: 'connectedEnterpriseNumber',
      unit: '台'
  },
  {
      icon: 'consumption',
      name: '电力累计消耗',
      value: '0',
      dataIndex: 'comprehensiveConsumption',
      unit: '千瓦时'
  },

]