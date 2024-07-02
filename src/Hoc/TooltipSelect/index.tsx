/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-29 17:17:32
 */
import { forwardRef, memo, useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import { ProFormSelect } from "@ant-design/pro-form";
import EllipsisText from "@/components/EllipsisText";
import styles from "./index.less";
import { isArray, isNumber, isString } from "lodash-es";

const { Option } = Select;

/**
 * 封装Select高阶组件
 * 能够有上浮提示
 * 后期扩展其他功能再加
 * **/
const TooltipWithSelect = (WrapperComponent, key) => (props, ref) => {
  let {
    tooltip,
    placeholder,
    options,
    fieldNames,
    value,
    disabledflag = false,
  } = props;
  const [title, setTitle] = useState(placeholder);
  let propst = JSON.parse(JSON.stringify(props));
  delete propst.placement;
  delete propst.options;
  delete propst.fieldNames;

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        let e = value?.split?.("、");
        if (e?.length) {
          let str = e?.map(
            (el) => options?.find((els: any) => el == els.value)?.label
          );
          setTitle(str?.join("、"));
        } else {
          setTitle(placeholder);
        }
      }

      if (isArray(value)) {
        let e = value?.map(
          (el) => options?.find((els: any) => el == els.value)?.label
        );
        setTitle(e?.join("、"));
      }
    }
  }, [value, options]);

  // 修改选中项的value类型
  let valueFormat: string[] | string | undefined = value ?? undefined;

  if (isArray(value)) {
    valueFormat = value?.map((el) => String(el));
  }

  if (
    value !== undefined &&
    value !== null &&
    (isString(value) || isNumber(value))
  ) {
    valueFormat = String(value);
  }

  const content = (
    <div>
      {key == "select" ? (
        <WrapperComponent
          {...propst}
          style={{ ...(props.fieldProps?.style ?? {}), ...props?.style }}
          allowClear={props?.fieldProps?.allowClear ?? true}
          showSearch={props?.fieldProps?.showSearch}
          ref={ref}
          disabled={disabledflag}
          onChange={(e: any) => {
            if (Array.isArray(e)) {
              if (e?.length) {
                let str = e?.map(
                  (el) => options?.find((els: any) => el == els.value)?.label
                );
                setTitle(str?.join("、"));
              } else {
                setTitle(placeholder);
              }
            } else {
              setTitle(e);
            }
            props.onChange(e);
          }}
          dropdownClassName={
            props.dropdownClassName ?? "select_disabled_dropdown"
          }
          filterOption={(input: any, option: any) => {
            console.log(option);
            console.log(options);
            let find = options.find(
              (els: any) => "" + els?.id == option?.value
            );
            console.log(
              options.find((els: any) => "" + els?.id == option?.value)
            );

            let key = fieldNames?.label ?? "title" ?? "label";

            return input && find?.[key]?.includes(input);
          }}
          value={valueFormat}
        >
          {options?.map((el: any, index: number) => {
            if (props?.fieldProps?.mode === "multiple") {
              return (
                <Option
                  key={index}
                  value={el?.[fieldNames?.["value"]] ?? String(el?.value)}
                  disabled={el.deleted == 1 ? true : el.disabled}
                >
                  {el?.[fieldNames?.["label"]] ?? el.title ?? el.label}
                </Option>
              );
            }
            return (
              <Option
                key={index}
                value={el?.[fieldNames?.["value"]] ?? String(el?.value)}
                disabled={el.deleted == 1 ? true : el.disabled}
              >
                <EllipsisText>
                  {el?.[fieldNames?.["label"]] ?? el.title ?? el.label}
                  {el.deleted == 1 ? (
                    <span className={styles.detele}>（已删除）</span>
                  ) : null}
                </EllipsisText>
              </Option>
            );
          })}
        </WrapperComponent>
      ) : (
        <WrapperComponent
          {...props}
          allowClear={props.allowClear || true}
          ref={ref}
          onChange={(e: any) => {
            if (Array.isArray(e)) {
              if (e?.length) {
                let str = e?.map(
                  (el) => options?.find((els: any) => el === els.value)?.label
                );
                setTitle(str?.join("、"));
              } else {
                setTitle(placeholder);
              }
            } else {
              setTitle(e);
            }
            props.onChange(e);
          }}
        />
      )}
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
const isEqualTooltipWithSelect = (prevProps, nextProps) => {
  // if (prevProps.value === nextProps.value) return true;
  return false;
};

/**
 * ECOSelect 输入组件
 * **/
export const ECOSelect = memo(
  forwardRef(TooltipWithSelect(ProFormSelect, "pro")),
  isEqualTooltipWithSelect
);

/**
 * ECOSelect 输入组件
 * **/
export const ECOSelectText = memo(
  forwardRef(TooltipWithSelect(Select, "select")),
  isEqualTooltipWithSelect
);
