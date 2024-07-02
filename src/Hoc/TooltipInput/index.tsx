/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-29 17:17:32
 */
import { forwardRef, memo, useEffect, useState } from "react";
import { Input, Tooltip } from "antd";
import { ProFormText } from "@ant-design/pro-form";
import YinputNumber from "../YinputNumber";
import { getDataisEqual } from "@/utils/utils";

/**
 * 封装Input高阶组件
 * 能够有上浮提示
 * 后期扩展其他功能再加
 * **/
const TooltipWithInput = (WrapperComponent) => (props, ref) => {
  let { tooltip, placeholder, value, tooltipcontent } = props;
  const [title, setTitle] = useState(placeholder);

  useEffect(() => {
    if (tooltipcontent) {
      setTitle(tooltipcontent);
    } else if (value) {
      setTitle(value);
    }
  }, [value, tooltipcontent]);

  const content = (
    <div>
      <WrapperComponent
        {...props}
        tooltip={false}
        allowClear={props.allowClear || true}
        ref={ref}
        onChange={(ReactEvent: { nativeEvent: { target: { value: any } } }) => {
          if (props?.type == "number") {
            if (!tooltipcontent) {
              setTitle(ReactEvent);
            }
            props.onChange && props.onChange(ReactEvent);

            return;
          }
          if (ReactEvent.nativeEvent?.target?.value) {
            if (!tooltipcontent) {
              setTitle(ReactEvent.nativeEvent?.target?.value ?? "");
            }
          } else {
            if (!tooltipcontent) {
              setTitle(placeholder);
            }
          }
          props?.onChange?.(ReactEvent.nativeEvent?.target?.value);
        }}
      />
    </div>
  );

  return tooltip ? (
    <Tooltip title={title ?? ""} placement={props.placement || "topLeft"}>
      {content}
    </Tooltip>
  ) : (
    content
  );
};
const isEqualTooltipWithInput = (prevProps, nextProps) => {
  // if (getDataisEqual(prevProps, nextProps)) return true;
  return false;
};

/**
 * ECOInput 输入组件
 * **/
export const ECOInput = memo(
  forwardRef(TooltipWithInput(ProFormText)),
  isEqualTooltipWithInput
);

/**
 * ECOInput 输入组件
 * **/
export const ECOInputText = memo(
  forwardRef(TooltipWithInput(Input)),
  isEqualTooltipWithInput
);

/**
 * ECOInput Number 输入组件
 */
export const ECOInputNumber = memo(
  forwardRef(TooltipWithInput(YinputNumber)),
  isEqualTooltipWithInput
);
