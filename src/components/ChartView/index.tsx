/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-08-18 15:29:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-10 18:09:04
 * @FilePath: \caculator\src\components\ChartView\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 *@description:
 * @author wayne
 * @date 2022-07-01 10:20
 */

import React, { useImperativeHandle } from "react";
import * as echarts from "echarts/core";
import classNames from "classnames";
import "./index.moudule.less";

type PropsType = {
  option: any;
  title?: string;
  rootClass?: string;
  titleClass?: string;
  echartsRef?: any;
  style?: React.CSSProperties;
  onLoaded?: (chart: any) => void;
};

const ChartView: React.FC<PropsType> = (props) => {
  const { option, title, rootClass, titleClass, echartsRef, onLoaded, style } =
    props;
  const bodyRef = React.useRef<any>(null);
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (bodyRef.current && option) {
      const myChart = chartRef.current
        ? chartRef.current
        : echarts.init(bodyRef.current);
      myChart.setOption(option, true);
      if (!chartRef.current) {
        chartRef.current = myChart;
        onLoaded && onLoaded(myChart);
      }
    }
  }, [option, chartRef.current]);

  React.useEffect(() => {
    window.onresize = () => {
      chartRef.current?.resize();
    };
  }, []);

  useImperativeHandle(echartsRef, () => chartRef.current);

  return (
    <div
      style={{ ...style }}
      ref={bodyRef}
      className={classNames(rootClass || "")}
    ></div>
  );
};

export default ChartView;
