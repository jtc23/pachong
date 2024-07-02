/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-19 15:10:31
 */

import ProForm, { ProFormText } from "@ant-design/pro-form";
import React, { forwardRef, memo } from "react";
import { Input } from "antd";

const YInput = props => {
    return <Input {...props} {...(props.fieldProps ?? {})} allowClear title={props.value ?? ""} />;
};

const YProFormText = (WrapperComponent: React.ElementType) => (props: any, ref: any) => {
    return (
        <ProForm.Item {...props}>
            <WrapperComponent {...props} />
        </ProForm.Item>
    );
};

export default memo(forwardRef(YProFormText(YInput)), () => false);
