/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-04-10 09:04:50
 */
import { persist, combine } from 'zustand/middleware'
import produce from "immer"
import pipe from "ramda/es/pipe"
import { create } from 'zustand';


// 是否开启持久化
const isPersist = false

export function createPersistedStore(callback: any, name: string) {
    if (!isPersist) {
        return callback;
    }

    return persist(
        (set, get, api) => {
            return callback(set, get, api)
        },
        {
            name,
            getStorage: () => sessionStorage,
            serialize: (state) => JSON.stringify(state),
            deserialize: (str) => JSON.parse(str),
        }
    )
}

// 记录每次改变的state
const log = (config: any) => (set: any, get: any, api: any) => config((args: any) => {
    // 获取当前运行环境
    if (import.meta.env.PROD) {
        return set(args)
    }
    const storeName = api.persist.getOptions().name
    console.group(`stroe ============> %c ${storeName}`, 'color: #f00; font-size: 16px;')
    console.group("applying")
    console.log(args)
    console.groupEnd()
    set(args)
    console.group("new state")
    console.log(get())
    console.groupEnd()
    console.groupEnd()
}, get, api)

// 将 set 方法变成一个 immer proxy
const immer: any = (config: any) => (set: any, get: any, api: any) => config((partial: any, replace: any) => {
    const nextState = typeof partial === 'function'
        ? produce(partial)
        : partial
    return set(nextState, replace)
}, get, api)

export const createStore = !isPersist ? create : pipe(log, immer, create)
