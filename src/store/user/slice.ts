/*
 * @Description: 
 * @Author: tianchi
 * @Date: 2023-07-07 19:09:16
 * @LastEditTime: 2024-03-07 11:29:28
 */
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ConsumeRecordInfo, InvitationRecordInfo, ResponseLoginData, UserInfo,RequestLoginReponse,RequestLoginParams } from '@/types'
import { TableData } from '@/types/admin'
import async from './async'

export interface userState {
  // 用户信息
  user_name?: RequestLoginReponse | undefined
  menus?:any[]
  permissions?:any[]
  // 登陆Token
  token?: string | undefined
  // 退出
  logout?: () => void
  // 记录数据
  invitation_records?: TableData<InvitationRecordInfo>

  setLoginData: (data: RequestLoginReponse | undefined) => void

}

const userStore = create<userState>()(
  persist(
    (set, get) => ({
      user_name: undefined,
      token: undefined,
      logout: () => set(() => ({ user_name: undefined, token: undefined,menus:[],permissions:[] })),
      setLoginData: async(data:RequestLoginReponse|undefined)=>
        set(() => {
          if(data){
            return{
              token:true,
              user_name:data,
            }
          }     
        }),

    }),


    {
      name: 'user_storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
    }
  )
)


export default userStore
