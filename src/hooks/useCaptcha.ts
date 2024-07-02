/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-10-28 17:32:06
 * @LastEditTime: 2023-01-04 14:35:39
 */
import { useEffect, useRef, useState } from "react";

interface useCaptchaProps {
    delay?: number;

    onSuccess?: (setConut: any) => void;

    initialCount?: number;

    clearNumber?: number;

    initExecution?: boolean;
}

/**
 * 倒计时hooks
 * @param option
 */
const useCaptcha = (option: useCaptchaProps) => {
    const [count, setCount] = useState(option.initialCount || 0);
    const { delay = 1000, onSuccess, clearNumber = 0, initExecution = true } = option;
    const [isInitExecution, setIsInitExecution] = useState(initExecution);
    const timeRef = useRef<any>();

    const setIntervalFn = () => {
        timeRef.current = setInterval(() => {
            if (count > clearNumber) {
                setCount(val => val - 1);
            } else {
                clearInterval(timeRef.current);
                onSuccess?.(setCount);
                setIsInitExecution(initExecution);
            }
        }, delay);
    };

    useEffect(() => {
        if (isInitExecution) {
            setIntervalFn();
        }

        return () => {
            clearInterval(timeRef.current);
        };
    }, [count, isInitExecution]);

    const setCountFn = (v: number) => {
        // console.log(v)
        setIsInitExecution(true);
        setCount(option.initialCount || v);
    };

    return {
        count,
        setCountFn,
    };
};
export default useCaptcha;
