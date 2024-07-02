/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-09-07 15:15:38
 * @LastEditTime: 2022-10-27 17:11:00
 */

import styles from "./index.less";
import React from "react";

interface MangerListFrameprops {
    children: React.ReactNode;
    style?: any;
}
const MangerListFrame = ({ children, style }: MangerListFrameprops) => {
    return (
        <div className={styles.MangerListFrame} style={style}>
            {children}
        </div>
    );
};

export default MangerListFrame;
