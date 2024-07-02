/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 14:23:26
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-10 11:08:55
 * @FilePath: \companyApplication\src\components\FlipNumber\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import cs from "classnames";
import styles from "./index.module.less";

type FlipNumberProps = {
  value: number;
  color?: string;
  delay?: number;
  isDanger?: boolean;
};

const FlipNumber = (props: FlipNumberProps) => {
  const [decimals, setDecimals] = useState(0);
  // 延迟加载
  const [isShow, setIsShow] = useState(true);
  const { value, color, delay = 3500, isDanger = false } = props;

  useEffect(() => {
    if (value) {
      const decimalPlaces = value.toString().split(".")[1]?.length || 0;
      if (decimalPlaces > 2) {
        setDecimals(2);
        return;
      }
      setDecimals(decimalPlaces);
    }
  }, [value]);

  // 延迟加载
  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        setIsShow(false);
      }, delay);
    }
  }, [delay]);

  if (isShow) {
    return (
      <span
        className={cs([
          isDanger ? styles.CountWarn : styles.CountUp,
          isDanger ? "countupwarn" : "countup",
        ])}
      >
        {value?.toFixed?.(decimals) * 1}
      </span>
    );
  }

  return (
    <CountUp
      className={cs([
        isDanger ? styles.CountWarn : styles.CountUp,
        isDanger ? "countupwarn" : "countup",
      ])}
      style={{ color }}
      start={0}
      decimals={decimals}
      end={value}
      duration={3}
    />
  );
};

export default FlipNumber;
