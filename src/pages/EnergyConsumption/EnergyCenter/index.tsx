/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2023-03-17 15:27:47
 */
import styles from "./index.module.less";
import cs from "classnames";
import ClassificationValueList from "@/components/ClassificationValueList";
import { CATEGORY_LIST, dangerList, datas, pointers, machine } from "./constat";
import MapView from "@/components/MapView";
import TitleModule from "@/components/TitleModule";
import SeamlessScrollList from "@/components/SeamlessScrollList";
import MapClickRender from "@/components/MapClickRender";
import MapCarbonModel from "@/components/MapCarbonModel";
import { useEffect, useState } from "react";
import { useEnergyData } from "@/store";
import {
  handleArraySection,
  handleNumberUnit,
  isBetWeenArr,
} from "@/utils/number";
import useResultRequest from "@/hooks/useResultRequest";
import { cloneDeep } from "lodash-es";
import ChartView from "@/components/ChartView";
import { calMax, calMin, getValue } from "@/utils/utils";
import { SelectModify, DatePickerModify } from "@/components/ModifyAntd";

// import { getEnergyList } from "@/api/energy";
import CenterMap from "./centerMap";
import { log } from "console";
import dayjs from "dayjs";

const EnergyCenter = () => {
  //   const { data } = useResultRequest<any, any>(getEnergyList)
  const [listData, setListData] = useState(CATEGORY_LIST);
  const { data, topList } = useEnergyData();
  const [dangerData, setDangerData] = useState<any>([]);
  const [markerList, setMarkerList] = useState<any>();
  const [mapList, setMapList] = useState<any>();
  const [option1, setOption1] = useState({});
  useEffect(() => {
    const newData1 = [
      18972, 1988, 1966, 1417, 10, 3286, 9065, 2768, 2640, 707.5, 2464, 2895,
      376, 1049, 390,
    ].map((el) => getValue(el));
    const newData2 = [
      1726.452, 180.908, 178.906, 128.947, 0.91, 299.026, 824.915, 251.888,
      240.24, 64.3825, 224.224, 263.445, 34.216, 95.459, 35.49,
    ].map((el) => getValue(el));
    const xs = [
      "三期A炉",
      "三期B炉",
      "三期压机",
      "三期自动化",
      "三期冷却水",
      "四期A炉",
      "四期B炉",
      "四期压机",
      "四期自动化",
      "四期冷却水",
      "五期A炉",
      "五期B炉",
      "五期压机",
      "五期自动化",
      "五期冷却水",
    ];
    // const newData1 = newData.map((el) => el?.value);

    const data1 = newData1;
    const data2 = newData2;
    const max1 = calMax(data1);
    const min1 = calMin(data1);
    const max2 = calMax(data2);
    const min2 = calMin(data2);
    setOption1({
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        // data: ["电力消耗", "碳排放量"],
        textStyle: {
          color: "#fff",
        },
        icon: "roundRect",
        itemWidth: 15,
        itemHeight: 15,
        // // data: data.legendData,
        // top: 0,
        // left: "35%",
      },
      grid: {
        top: 45,
        bottom: 30,
        left: 30,
        right: 0,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xs,
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: "#fff",
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: 11,
          },
          interval: 0,
          formatter: function (value) {
            let res = ""; // 拼接加\n返回的类目项
            let maxLength = 2; // 每项显示文字个数  数字设置几，就一行显示几个文字
            let valLength = value.length; // X轴上的文字个数
            let rowN = Math.ceil(valLength / maxLength); // 需要换行的行数
            // 换行的行数大于1,
            if (rowN > 1) {
              for (let i = 0; i < rowN; i++) {
                let temp = ""; //每次截取的字符串
                let start = i * maxLength; //开始截取的位置
                let end = start + maxLength; //结束截取的位置
                temp = value.substring(start, end) + "\n";
                res += temp; //拼接字符串
              }

              return res;
            } else {
              return value;
            }
          },
        },

        // axisLabel: {
        //   //展示角度
        //   rotate: 45,
        // },
      },
      yAxis: [
        {
          type: "value",
          name: "万千瓦时",
          min: min1,
          max: max1,
          splitNumber: 5,
          interval: (max1 - min1) / 5,
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(217, 217, 217, 0.2)",
            },
          },
          nameTextStyle: {
            color: "#fff",
          },
        },
        {
          type: "value",
          name: "吨CO₂",
          min: min2,
          max: max2,
          splitNumber: 5,
          interval: (max2 - min2) / 5,
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(217, 217, 217, 0.2)",
            },
          },
          nameTextStyle: {
            color: "#fff",
          },
        },
      ],
      series: [
        {
          name: "电力消耗",
          type: "bar",
          data: data1,
          // itemStyle: {
          //   color: "#DFEE34",
          // },
          barWidth: 18,
          itemStyle: {
            color: "#DFEE34",
          },
          smooth: true,
        },
        // {
        //   data: data1,
        //   type: "pictorialBar",
        //   barMaxWidth: 8,
        //   symbolPosition: "end",
        //   symbol: "diamond",
        //   symbolOffset: [0, "-50%"],
        //   symbolSize: [18, 12],
        //   zlevel: 2,
        //   itemStyle: {
        //     color: "#DFEE34",
        //   },
        //   tooltip: {
        //     show: false,
        //   },
        // },
        {
          name: "碳排放量",
          type: "line",
          zlevel: 3,
          yAxisIndex: 1,
          data: data2,
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "#00D709",
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    if (datas) {
      const list = handleArraySection(
        datas?.map((el) => el.comprehensiveConsumption)
      );

      const newList = isBetWeenArr(datas, "comprehensiveConsumption", list);

      setMapList(list);
      const newListMap = newList.map((el: any, index: number) => {
        return {
          ...el,
          name: el.enterpriseName,
          value: el.comprehensiveConsumption,
          lat: el.latDdBmap,
          lng: el.lngDdBmap,
          key: index + 1,
          icons: {
            url: "/icon/l.png",
            w: 25,
            h: 36,
          },
        };
      });
      setMarkerList(newListMap);
      //setDangerData(newListMap.slice(0, 10));
    }
    // if (machine) {
    //   const newListMap = machine.map((el: any, index: number) => {
    //     return {
    //       ...el,
    //       key: index + 1,
    //     };
    //   });
    //   setDangerData(newListMap.slice(0, 10));
    // }
  }, []);

  useEffect(() => {
    if (topList?.length > 0) {
      setDangerData(
        topList.slice(0, 10).map((el, index) => {
          return {
            ...el,
            key: index + 1,
          };
        })
      );
    }
  }, [topList]);
  useEffect(() => {
    // console.log(data);

    if (data?.electricityConsumption) {
      let list = listData;
      // list[0]["value"] = String(Number(data?.electricityConsumption));

      const values = list.map((item: any) => {
        const datas = handleNumberUnit(data?.[item.dataIndex]);
        // console.log(datas, data, data?.[item.dataIndex]);
        return {
          ...item,
          value: data?.[item.dataIndex],
          units: datas?.unit,
        };
      });
      // console.log(values);
      setListData(values);
    }

    // setListData((list: any) =>
    //   list.map((item: any) => {
    //     const datas = handleNumberUnit(data?.[item.dataIndex]);
    //     console.log(datas, data);
    //     return {
    //       ...item,
    //       value: datas?.value,
    //       units: datas?.unit,
    //     };
    //   })
    // );
  }, [data?.electricityConsumption]);
  const disabledDate = (current: any) => {
    return (
      dayjs(current.format("YYYY-MM")) >= dayjs(dayjs().format("YYYY-MM")) ||
      current < dayjs("2024-01")
    );
  };
  const disabledDate1 = (current: any) => {
    return current >= dayjs() || current < dayjs("2024");
  };

  return (
    <div className={cs(styles.center)}>
      <div className={styles.center_title}>
        <span>能源消耗与碳排放</span>
        {/* <SelectModify
          // onChange={(e) => {
          //   onChange(e, "total");
          // }}
          style={{ width: 120, marginRight: "0px" }}
          defaultValue={"2024"}
          options={[
            { value: "2024", label: "2024年3月" },
            { value: "2023", label: "2024年2月" },
            { value: "2022", label: "2024年1月" },
            { value: "2021", label: "2023年12月" },
          ]}
        /> */}
        <DatePickerModify
          picker="month"
          format={"YYYY年MM月"}
          defaultValue={dayjs("2024-03")}
          disabledDate={disabledDate}
        />
      </div>
      <ClassificationValueList list={listData} />
      {/* <MapView
        markerList={markerList}
        mapExtraRender={() => {
          return <div className={styles.mapExtra}>安装位置</div>;
        }}
        // mapExtraRender={() => {
        //   return (
        //     <div className={styles.listMarker}>
        //       <div className={styles.title}>综合能耗</div>
        //       <div className={styles.list}>
        //         {mapList?.map((item: any) => {
        //           return (
        //             <div className={styles.item} key={item.name}>
        //               <div
        //                 className={styles.color}
        //                 style={{
        //                   background: `url(${
        //                     pointers?.find((el) => el?.color == item?.color)
        //                       ?.url
        //                   }) no-repeat`,
        //                   backgroundSize: "100% 100%",
        //                 }}
        //               ></div>
        //               <div
        //                 className={styles.name}
        //                 style={{ color: item.color }}
        //               >
        //                 {item.name}
        //               </div>
        //             </div>
        //           );
        //         })}
        //       </div>
        //     </div>
        //   );
        // }}
        // mapClickWindow={(e, close) => {
        //   return (
        //     <MapClickRender {...e} close={close}>
        //       <MapCarbonModel {...e} close={close} type={2} />
        //     </MapClickRender>
        //   );
        // }}
        isCustomMarker={false}
      /> */}
      <CenterMap />
      <div className={styles.bottom}>
        <TitleModule
          title="设备电力消耗与碳排放"
          rightRender={
            <DatePickerModify
              picker="year"
              format={"YYYY年"}
              defaultValue={dayjs("2024")}
              disabledDate={disabledDate1}
              style={{ width: 100, marginRight: "80px" }}
            />
            // <SelectModify
            //   // onChange={(e) => {
            //   //   onChange(e, "total");
            //   // }}
            //   style={{ width: 100, marginRight: "80px" }}
            //   defaultValue={"2024"}
            //   options={[
            //     { value: "2024", label: "2024年" },
            //     { value: "2023", label: "2023年" },
            //     { value: "2022", label: "2022年" },
            //     { value: "2021", label: "2021年" },
            //   ]}
            // />
          }
        />
        <div className={styles.chart}>
          <ChartView option={option1} style={{ height: 330 }} />
        </div>
      </div>
    </div>
  );
};
export default EnergyCenter;
