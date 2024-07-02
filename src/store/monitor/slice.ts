/*
 * @Description: 
 * @Author: tianchi
 * @Date: 2023-07-07 19:09:16
 * @LastEditTime: 2024-03-06 16:00:39
 */
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ConsumeRecordInfo, InvitationRecordInfo, ResponseLoginData, UserInfo,RequestLoginReponse,RequestLoginParams } from '@/types'
import { TableData } from '@/types/admin'



  

const monitorStore = create<any>()(
  persist(
    (set, get) => ({
        pointAddress : "",
        carbonDate : "",
      setRecoverValues: (value) =>
      set((state) => {

        return {
          ...state,
          ...value,
        }
      }),
    }),

    {
      name: 'user_storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
    }
  )
)


export default monitorStore
