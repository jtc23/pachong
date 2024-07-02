/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-04-10 09:04:50
 */
/*
 *@description:
 * @author wayne
 * @date 2022-07-01 10:20
*/

import React, { useImperativeHandle } from "react";
import * as echarts from 'echarts';

import classNames from "classnames";
import './index.less';

type PropsType = {
  option: any,
  title?: string,
  rootClass?: string,
  titleClass?: string
  echartsRef?: any
}

const ChartView: React.FC<PropsType> = (props) => {
  const { option, title, rootClass, titleClass, echartsRef } = props;
  const bodyRef = React.useRef<any>(null);
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (bodyRef.current && option) {
      const myChart = chartRef.current ? chartRef.current : echarts.init(bodyRef.current);
      myChart.setOption(option);
      if (!chartRef.current) chartRef.current = myChart;
    }
  }, [option, chartRef.current])


  React.useEffect(() => {
    window.onresize = () => {
      chartRef.current?.resize();
    };
  }, [])

  useImperativeHandle(
    echartsRef,
    () => chartRef.current
  )



  return (
    <div className={classNames('chart-wrap', rootClass || '')}>
      {title && <div className={classNames('chart-title', titleClass || '')}>{title}</div>}
      {/*@ts-ignore*/}
      <div className='chart' ref={bodyRef} />
    </div>
  )
};

export default ChartView;
