/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-09-12 15:03:51
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-02-26 13:54:26
 * @FilePath: \caculator\src\utils\menu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const routes =  [
      {
        name: "数据上传",
        path: "/admin/dataupload",
      },
      {
        name: "指标填报",
        path: "/admin/targetfill",
      },
      {
        path: "/admin/404",
        name: "园区预测",
        isDevloping: true,
      },
      {
        path: "/admin/areacombination",
        name: "区域组合",
      },
      {
        path: "/admin/moretools",
        name: "更多工具",
      },
      {
        path: "/admin/ecoComputationsAdd",
        name: "碳数据核算",
      },
    ]
  
    export const moretoolsmenus =[
      {
        path: "/admin/moretools/feedback",
        name: "更多工具",
      },
      {
        path: "/admin/moretools/parktargetmantance",
        name: "园区指标维护",
      },
    ]