import type { ProFormProps } from "@ant-design/pro-form";
import { ProForm } from "@ant-design/pro-form";
import { forwardRef, memo } from "react";

const YProForm = (WrapperComponent: React.ElementType) => (props: ProFormProps, ref: any) => {
    console.log(props);
    return <WrapperComponent submitter={false} layout="horizontal" {...props} ref={ref} />;
};

export default memo(forwardRef(YProForm(ProForm)), () => false);
