// import { getParkInfo } from '@/api/overviw';
import enums from '@/enums';
import cookieUtils from '@/utils/cookieUtils';
import { useEffect, useState } from 'react';
export default () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});
    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        (async () => {
            const atobData = url.get('data')!
            if (atobData) {
                const data = {
                    ...JSON.parse(window.atob(atobData) || "{}"),
                };

                for (let i in data) {
                    cookieUtils.setCookies(i, data[i]);
                    sessionStorage.setItem(i, data[i]);
                }
                const res={}
                // let res = await getParkInfo();
                if (res?.code === enums.ResultCodeEnums.SUCCESS) {
                    let data = {
                        ...JSON.parse(window.atob(atobData) || "{}"),
                        ...res?.data?.list?.[0] ?? {}
                    }
                    for (let i in data) {
                        cookieUtils.setCookies(i, data[i]);
                        sessionStorage.setItem(i, data[i]);
                    }
                    setData(data);
                    setLoading(false);
                }
            }

        })()

    }, [])

    return {
        loading,
        data
    }
}