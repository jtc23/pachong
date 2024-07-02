/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:11:13
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-19 11:23:18
 * @FilePath: \companyApplication\src\store\energy\slice.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ResultCodeEnums } from '@/enums/ResultCodeEnum';
import { isEmpty } from 'lodash-es';
import { createPersistedStore, createStore } from '@/store/utils'
// import { getEnergy } from '@/api/energy';
import { message } from 'antd';
import { instants, list, total_energy, total_electric } from "@/constat/instant"

const useEnergyData = createStore(createPersistedStore((set: any, get: () => any) => ({
  data: instants,
  leftList: list,
  total_energy: total_energy,
  total_electric: total_electric,
  topList: [],
  typeName: [],
  typeValue: [],
  setDataEnergy: (obj: any) => set({ data: obj }),
  setleftList: (obj: any) => set({ leftList: obj }),
  setValues: (value) =>
    set((state) => {

      return {
        ...state,
        ...value,
      }
    }),
  // async getDataEnergy() {
  //     const state = get()
  //     if (!isEmpty(state.data)) return
  //     try {
  //         const res ={}
  //         // const res = await getEnergy()
  //         if (res?.code == ResultCodeEnums.SUCCESS) {
  //             set({ data: res.data })
  //         }
  //     } catch (error: any) {
  //         message.error(error.message)
  //     }
  // },
}), 'energyData'))
export default useEnergyData