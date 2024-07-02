/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-09-13 17:19:01
 * @LastEditTime: 2022-10-21 14:10:53
 */
/*
 *@description: setState之后的一个callback
 * @author wayne
 * @date 2022-07-19 08:53
 */
import { useState, useRef } from "react";
import { isFunction } from "lodash";
import { useUpdateEffect } from "ahooks";

const useSetState = (initState?: any) => {
    const [state, setState] = useState(initState);
    const isUpdate = useRef<any>(null);
    const setXState = (newState: any, callback: (s: any) => void) => {
        isUpdate.current = callback;
        setState(newState);
    };

    useUpdateEffect(() => {
        if (isUpdate.current && isFunction(isUpdate.current)) {
            isUpdate.current(state);

            setTimeout(() => {
                isUpdate.current = null;
            }, 10);
        }
    }, [state]);

    return [state, setXState];
};

export default useSetState;
