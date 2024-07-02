/*
 * @Descripttion: 系统中的Button高组
 * @Author: yoke
 * @Date: 2021-10-18 09:20:45
 */

import { forwardRef, memo } from "react";
import { Button } from "antd";
import type { YButtonProps } from "./index.d";
import classNames from "classnames";
import styles from "./index.module.less";
const Ybutton =
  (WrapperComponent: React.ElementType) => (props: YButtonProps, ref: any) => {
    const { type } = props;
    const ghostList = ["y-edit", "y-error"];

    return (
      <WrapperComponent
        {...props}
        ghost={ghostList?.filter((el) => el == type)?.length ? true : false}
        className={classNames([styles[type], "y-button", props.className])}
      />
    );
  };
export default memo(forwardRef(Ybutton(Button)), () => false);
