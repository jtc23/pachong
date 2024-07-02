/*
 * @Descripttion: 对于系统中，文本域的高组
 * @Author: yoke
 * @Date: 2021-10-19 14:46:12
 */

import { Input } from "antd";
import { forwardRef, memo } from "react";
import type { TextArea as TextAreaProps } from "_antd@4.18.9@antd/lib/input/TextArea.d.ts";

const { TextArea } = Input;

const YinputArea = (WrapperComponent: React.ElementType) => (props: TextAreaProps, ref: any) => {
    return <WrapperComponent showCount allowClear maxLength={1000} {...props} />;
};

export default memo(forwardRef(YinputArea(TextArea)), () => false);
