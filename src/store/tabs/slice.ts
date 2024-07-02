import { createStore, createPersistedStore } from '@/store/utils';


const useTabs = createStore(createPersistedStore((set: any, get: any) => ({
    tabIndex: 1,
    time: null,
    setTabIndex: (index: number) => set({ tabIndex: index }),
    setTime: (time: number) => set({ time: time })
}), 'tabs'));

export default useTabs;