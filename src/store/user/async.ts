/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-27 14:58:03
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-09-12 16:20:11
 * @FilePath: \caculator\src\store\user\async.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {  getAllPermission } from "@/services/user";
import { RequestLoginParams } from '@/types';
import userStore from '../user/slice'
import { RESPONSECODE } from "@/enums/global";
import { createBrowserHistory } from "history";
import {routes} from "@/utils/menu"
// 登录
export async function fetchAllpermison() {

    const response = await getAllPermission()
    if (response.code==RESPONSECODE.SUCCESS) {

      const menus =routes.filter(el=>response.data.find((item:any)=>item.name ==el?.name))
      // console.log(menus);
      userStore.getState().setPermission({ ...response.data})
      //userStore.getState().setPermission({ ...response.data,menus:menus })
        // console.log(response.data);
        // setTimeout(()=>{
        //     history.push("/admin")
        // },100)
        
    }
    // return response
  }

export default {
    fetchAllpermison,
}
  