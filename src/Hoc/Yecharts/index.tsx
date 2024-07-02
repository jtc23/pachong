/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-01 09:11:17
 * @LastEditTime: 2022-08-11 09:30:00
 */

import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./index.less";
// import ReactECharts from "echarts-for-react";

const Yecharts = (WrapperComponents: any) => (props: any, ref: any) => {
    const ecartRef = useRef();
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (ecartRef.current) {
                ecartRef?.current?.resize();
            }
        });
    }, []);

    useImperativeHandle(ref, () => ecartRef);

    return <WrapperComponents ref={ecartRef} {...props} />;
};

// export default memo(forwardRef(Yecharts(ReactECharts)), () => false);
