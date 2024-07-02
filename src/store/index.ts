/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-05 10:48:16
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-11 11:11:21
 * @FilePath: \companyApplication\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Description: 
 * @Author: tianchi
 * @Date: 2023-07-07 18:59:25
 * @LastEditTime: 2024-03-06 10:47:56
 */

// import chatStore from './chat/slice'

import userStore from './user/slice'
import monitorStore from './monitor/slice'
import useTabs from "./tabs/slice"
import useEnergyData from "./energy/slice"


export { userStore,monitorStore,useTabs,useEnergyData }
