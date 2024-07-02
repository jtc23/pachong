/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-19 15:10:31
 */

import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { Input } from "antd";

// positiveInt naturalNumber

const YinputNumber =
  (WrapperComponent: React.ElementType) => (props: any, ref: any) => {
    const [value, setValue] = useState<string | undefined | number>(undefined);
    const { ytype, onChange, places, isZero, automaticMax, automaticMin } =
      props;

    const getValue = (value: any) => {
      const reg = /^-?[0-9]*(\.[0-9]*)?$/;

      if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
        return value;
      } else {
        // 只允许输入整数及小数
        let v = value.replace(/[^\d.]/g, "");
        v = v.replace(/^\./g, "");
        v = v.replace(/\.{2,}/g, "");
        v = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        v = v.replace(/[^\d||/.)]/g, "");
        return v;
      }
    };

    const onNumberChange = (e: any) => {
      let { value } = e.target;
      //   console.log(value, automaticMin <= Number(value));
      // if (!value) return onChange && onChange(value) && setValue("");

      // 判断不为0或者不为-
      if (isZero) {
        value = value.replace("-", "");
      }

      // 自动变成最大值
      if (automaticMax && automaticMax <= Number(value)) {
        setValue(automaticMax);
        onChange(automaticMax);
        return;
      }

      // 自动变成最小值
      if (automaticMin && automaticMin >= Number(value)) {
        console.log(value);

        setValue(automaticMin);
        onChange(automaticMin);
        return;
      }
      // 限制输入框小数位数
      let str = "";
      let int = value.split(".")[0];
      let float = value.split(".")[1] ?? "";
      if (float) {
        let pr = float.substring(0, places);
        str = `${int}${float ? "." : ""}${pr}`.replace(/\s*/g, "");
      } else {
        str = value;
      }
      setValue?.(str);
      onChange?.(str);
      // switch (ytype) {
      //   case "positiveInt":
      //     let number = value.replace(/[^0-9]/g, "");
      //     setValue(number);
      //     onChange(number);
      //     break;
      //   default:
      //     let num = getValue(value);

      //     break;
      // }
    };

    useEffect(() => {
      // 去掉 “10.00” === "10"
      if (typeof props.value === "string") {
        if (props.value == "") {
          setValue(props.value * 1);
        } else {
          setValue(props.value);
        }
      } else {
        setValue(props.value);
      }

      setValue(props.value);
    }, [props.value]);

    useEffect(() => {
      // 禁用滚轮事件
      var scrollFunc = function (e: any) {
        let ev = e || window.event;
        if (ev.target.nodeName == "INPUT") {
          ev.preventDefault();
        }
      };
      window.addEventListener("mousewheel", scrollFunc, { passive: false });
    }, []);

    return (
      <WrapperComponent
        allowClear
        {...props}
        onChange={onNumberChange}
        value={value}
        type="number"
      />
    );
  };

export default memo(forwardRef(YinputNumber(Input)), () => false);
