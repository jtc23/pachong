import ChartView from "@/components/ChartView";
import { defaultEcahrtsOptionFn } from "@/components/ChartView/constat";
import IconList from "@/components/IconList";
import { SelectModify } from "@/components/ModifyAntd";
import TitleModule from "@/components/TitleModule";
import { TIME_TYPE } from "@/constat";
import { useEnergyData } from "@/store";
import { handleNumberUnitArray } from "@/utils/number";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
// import { getEnergyTrend, getIntensityTrend } from "@/api/energy";
import { TimeEnums } from "@/enums/TimeEnum";
import { calMax, getValue } from "@/utils/utils";
// import { total_energy, total_electric } from "@/constat/instant";
let color = ["#10C6FD"];
const EnergyLeft = () => {
  //const energyData: any = useEnergyData();
  const { data, leftList, total_energy, total_electric } = useEnergyData();
  const [listData, setListData] = useState([]);
  //   const { run, data: optionData } = useResultRequest<
  //     P.GetEnergyTrend,
  //     TimeEnums[]
  //   >(getEnergyTrend, {
  //     defaultParams: [TimeEnums.YEAR],
  //   });
  //   const { run: run1, data: option1Data } = useResultRequest<
  //     P.GetEnergyTrend,
  //     TimeEnums[]
  //   >(getIntensityTrend, {
  //     defaultParams: [TimeEnums.YEAR],
  //   });
  const [optionData, setOptionData] = useState<any[]>([]);
  const [option1Data, setoption1Data] = useState<any[]>([]);
  const [option, setOption] = useState({});
  const [option1, setOption1] = useState({});
  // useEffect(() => {
  //   console.log(leftList);

  //   setListData(leftList);
  // }, [leftList]);
  // useEffect(() => {
  //   console.log(data);

  //   setListData((listData: any) =>
  //     listData.map((item: any) => {
  //       const units = handleNumberUnit(data?.[item.dataIndex]);
  //       return {
  //         ...item,
  //         units: units?.unit,
  //         value: units?.value,
  //       };
  //     })
  //   );
  // }, [data]);
  useEffect(() => {
    setOptionData(total_energy);
    setoption1Data(total_electric);
  }, [total_energy, total_electric]);

  useEffect(() => {
    // energyData.getDataEnergy();
  }, []);

  useEffect(() => {
    const xs = ["一季度", "二季度", "三季度", "四季度"];
    const newData = [545.544, 182.5515333, 0, 0].map((el) => getValue(el));
    const newData1 = [500, 500, 500, 500];
    // console.log(optionData);

    // const xs = optionData.map((item: any) => item.key);
    // const { unit, data: newData } = handleNumberUnitArray(
    //   optionData.map((item: any) => item.value ?? 0)
    // );

    setOption(
      defaultEcahrtsOptionFn(
        {
          xData: xs,
          legendData: [],
          seriesData: [
            {
              name: "本年度",
              type: "line",
              data: newData,

              itemStyle: {
                normal: {
                  color: "#43A9F6",
                },
              },
              smooth: true,
            },
            {
              name: "上年度",
              type: "line",
              data: newData1,

              itemStyle: {
                color: "#07F8C0",
              },
              smooth: true,
            },
          ],
          unit: "万千万时",
        },
        {
          "xAxis.axisLabel": {
            interval: 0,
            color: "#fff",
          },
          "legend.icon": "roundRect",
          "legend.itemWidth": 15,
          "legend.itemHeight": 15,
          "legend.top": -4,
          "legend.right": 10,
        }
      )
    );
  }, []);

  useEffect(() => {
    if (option1Data) {
      const xs = [
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      ];
      const newData1 = [
        2197.936, 53002.03, 54003.04, 55004.05, 56005.06, 57006.07, 58007.08,
        59008.09, 60009.1, 61010.11, 62011.12, 63012.13, 64013.14, 65014.15,
        66015.16, 67016.17, 68017.18, 69018.19, 70019.2, 71020.21, 72021.22,
        73022.23, 55004.05, 75024.25, 76025.26, 56005.06, 78027.28, 79028.29,
        55004.05, 53002.03, 2028.576,
      ].map((el) => getValue(el));
      const newData2 = newData1
        .map((el) => el * 0.091)
        .map((el) => getValue(el));
      // const { unit, data: newData } = handleNumberUnitArray(
      //   option1Data.map((item: any) => item.value ?? 0)
      // );
      // const newData1 = newData.map((el) => el?.value);
      // const newData2 = newData1.map(
      //   (el) => el * 2 - 1000 + Math.random() * 1000
      // );
      const data1 = newData1;
      const data2 = newData2;
      const max1 = calMax(data1);
      const min1 = 0;
      const max2 = calMax(data2, 1000);
      const min2 = 0;
      setOption1({
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },

          formatter:
            "日期:&nbsp;  2024-04-{b}<br /><span class='yellow'>{a}：</span>&nbsp;{c0}<br /><span class='green'>{a1}：</span>&nbsp; {c1}",
        },
        legend: {
          data: ["电力消耗", "碳排放量"],
          textStyle: {
            color: "#fff",
          },
          // data: data.legendData,
          icon: "roundRect",
          itemWidth: 15,
          itemHeight: 15,
        },
        xAxis: {
          type: "category",
          data: xs,
          axisLabel: {
            //展示角度
            // rotate: 45,
            interval: 0,
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          top: 45,
          bottom: 30,
          left: 30,
          right: 0,
          containLabel: true,
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
            type: "line",
            data: data1,
            yAxisIndex: 0,
            itemStyle: {
              color: "#DFEE34",
            },
            smooth: true,
            showAllSymbol: false,
            symbolSize: 0,
          },
          {
            name: "碳排放量",
            type: "line",
            yAxisIndex: 1,
            data: data2,
            smooth: true,
            showAllSymbol: false,
            symbolSize: 0,
            itemStyle: {
              color: "#00D709",
            },
          },
        ],
      });
    }
  }, [option1Data]);

  return (
    <div className={styles.energyLeft}>
      <TitleModule title="能耗概况" className={styles.energyLeftTop} />
      <IconList className={styles.list} list={leftList} />
      <TitleModule
        title="电力消耗总量趋势"
        rightRender={
          <SelectModify
            // onChange={(e) => {
            //   onChange(e, "total");
            // }}
            style={{ width: 60, marginRight: "60px" }}
            defaultValue={TimeEnums.QUARTER}
            options={TIME_TYPE.filter((el) => el?.label !== "月度")}
          />
        }
      />
      <div className={styles.chart}>
        <ChartView option={option} style={{ height: 280, width: "100%" }} />
      </div>
      <TitleModule
        title="近30日电力消耗与碳排放量趋势"
        // rightRender={
        //   <SelectModify
        //     onChange={(e) => {
        //       onChange(e, "strength");
        //     }}
        //     style={{ width: 60 }}
        //     defaultValue={TimeEnums.YEAR}
        //     options={TIME_TYPE}
        //   />
        // }
      />
      <div className={styles.chart}>
        <ChartView option={option1} style={{ height: 330 }} />
      </div>
    </div>
  );
};
export default EnergyLeft;
