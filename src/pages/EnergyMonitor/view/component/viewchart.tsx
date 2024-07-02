/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-04 16:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-10 18:10:54
 * @FilePath: \companyApplication\src\pages\EnergyMonitor\view\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "../../index.module.less";

import ChartView from "@/components/EchartView";
import { RESPONSECODE } from "@/enums/global";
import { getEnergyMointorDetail } from "@/service/energy";
import { monitorStore } from "@/store";
import { useRequest } from "ahooks";
import * as echarts from "echarts/core";
import { parse } from "query-string";
interface echartProps {
  leftOption: string;
  rightOption: string;
  setData?: any;
}
const index = (props: echartProps) => {
  const { pointAddress } = monitorStore();
  const echartsRef = useRef<any>();
  const { rightOption, setData: setListData } = props;
  const [options, setOption] = useState<any | undefined>(undefined);
  const [data, setData] = useState<any | undefined>(undefined);
  const { id } = parse(location.search) || {};
  const { loading, run } = useRequest(getEnergyMointorDetail, {
    manual: true,
    onSuccess: (result) => {
      if (result?.code === RESPONSECODE.SUCCESS) {
        // message.success("保存成功");
        // navigate(`/admin/dataupload`);
        setData(result?.data);
        setListData(result?.data);
        setOption({
          xAxis: {
            type: "category",
            data: result?.data?.names,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          yAxis: {
            type: "value",
          },
          tooltip: {
            trigger: "axis",
            //   position: ["100%", "50%"],
            axisPointer: {
              type: "shadow",
            },
          },
          series: [
            {
              data: result?.data?.values,
              type: "line",
              smooth: true,
              showAllSymbol: true,
              symbolSize: 0,
              lineStyle: {
                normal: {
                  width: 3,
                  color: "rgba(25,163,223,1)", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(25,163,223,.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(25,163,223, 0)"
                  }
                  ], false),
                  shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                  shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
            },
          ],
        });
      } else {
        message.error(result?.msg);
      }
    },
  });
  useEffect(() => {
    if (rightOption && id) {
      run({
        id,
        // pointAddress,
        type: rightOption,
      });
    } else {
      message.error("信息不完整");
    }
  }, [pointAddress, rightOption, id]);

  return (
    <div className={styles.charts}>
      <Spin spinning={loading}>
        <div className={styles.map}>
          <ChartView echartsRef={echartsRef} rootClass={styles.chart} option={options} />
        </div>
      </Spin>
    </div>
  );
};
export default index;
