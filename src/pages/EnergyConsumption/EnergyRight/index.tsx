import ChartView from "@/components/ChartView";
import { defaultEcahrtsOptionFn } from "@/components/ChartView/constat";
import TitleModule from "@/components/TitleModule";
import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.less";
import ValueList from "@/components/ValueList";
import {
  getChartTitle,
  getPercent,
  getPercentTotal,
  getRingOption,
  handleNumberUnitArray,
  setChartTitle,
} from "@/utils/number";
import { useEnergyData } from "@/store";
import useResultRequest from "@/hooks/useResultRequest";
// import { getEnergyRank } from "@/api/energy";
import { total_energy } from "@/constat/instant";
import { DatePickerModify, SelectModify } from "@/components/ModifyAntd";
import CurrentData from "./currentData";
import dayjs from "dayjs";

const CarbonLeft = () => {
  const [listData, setListData] = useState<any>([]);
  const { data, topList, typeName, typeValue } = useEnergyData();
  const [option, setOption] = useState({});
  const [option1, setOption1] = useState({});
  const [listTop, setTop] = useState([]);
  // Time Object
  const [dateObj, setDateObj] = useState<any>({
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm:ss"),
  });
  // set time
  useEffect(() => {
    setInterval(() => {
      const date: string = dayjs().format("YYYY-MM-DD");
      const time: string = dayjs().format("HH:mm:ss");

      setDateObj({
        date,
        time,
      });
    }, 1000);
  }, []);

  // set time render use useMemo
  const timeRender = useMemo(() => {
    return (
      <div className={styles.time}>
        <div className={styles.time_date}>{dateObj.date}</div>
        <div className={styles.time_set}>{dateObj.time}</div>
      </div>
    );
  }, [dateObj]);
  //   const { data } = useResultRequest<P.GetEnergyTrend, any[]>(getEnergyRank);
  // const data: any[] = [
  //   {
  //     key: "化学原料和化学制品制造业",
  //     value: 721214.624,
  //   },
  //   {
  //     key: "计算机、通信和其他电子设备制造业",
  //     value: 549370.9,
  //   },
  //   {
  //     key: "汽车制造业",
  //     value: 473572.164,
  //   },
  //   {
  //     key: "电力、热力生产和供应业",
  //     value: 273740.506,
  //   },
  //   {
  //     key: "农副食品加工业",
  //     value: 177357.7,
  //   },
  // ];

  useEffect(() => {
    if (topList?.length > 0) {
      setTop(
        topList.slice(0, 5).map((el) => ({
          ...el,
          key: el?.name,
          value: el?.kwhValue,
        }))
      );
    }
  }, [topList]);
  useEffect(() => {
    const xs = ["自动化", "压机", "循环冷却水", "生产炉"];
    const newData = ["5106", "5110", "1107.5", "38670"];
    // const { unit, data: newData } = handleNumberUnitArray(
    //   listTop.map((item: any) => item.value ?? 0)
    // );
    setOption1(
      defaultEcahrtsOptionFn(
        {
          xData: xs,
          seriesData: [
            {
              data: newData,
              type: "bar",
              barMaxWidth: "auto",
              barWidth: 18,
              itemStyle: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#0FFEC5",
                    },
                    {
                      offset: 1,
                      color: "#2AAFCC",
                    },
                  ],
                },
              },
              label: {
                show: true,
                position: "top",
                distance: 15,
                color: "#fff",
              },
            },
            {
              data: newData,
              type: "pictorialBar",
              barMaxWidth: 8,
              symbolPosition: "end",
              symbol: "diamond",
              symbolOffset: [0, "-50%"],
              symbolSize: [18, 12],
              zlevel: 2,
              itemStyle: {
                color: "#0FFEC5",
              },
              tooltip: {
                show: false,
              },
            },
          ],
          unit: "万千瓦时",
        },
        {
          // 'grid.top': 10,
          // 'yAxis.axisLine.show': false,
          // 'yAxis.axisLabel.show': false,
          "xAxis.axisLabel": {
            interval: 0,
            // rotate: 10,
            color: "#fff",
          },
        }
      )
    );
  }, []);

  useEffect(() => {
    setListData([
      {
        name: "电力消耗超出预警值设备",
        value: 0,
        unit: "台",
        icon: "/icon/value.webp",
      },
      {
        name: "电力消耗超出预警值",
        value: "0",
        unit: "万千瓦时",
        icon: "/icon/machine.webp",
      },
    ]);
  }, []);
  useEffect(() => {
    getEchartsOption(data);
  }, [data?.electricityConsumption]);

  const getEchartsOption = (obj: P.GetParkEnergy) => {
    console.log(obj);

    const data = [
      {
        value: obj?.electricityConsumption,
        name: "电力",
      },
      // {
      //   value: obj?.heatConsumption,
      //   name: "热力",
      // },
      // {
      //   value: obj?.coalConsumption,
      //   name: "煤炭",
      // },
      {
        value: obj?.gasConsumption,
        name: "天燃气",
      },
      // {
      //   value: obj?.oilConsumption,
      //   name: "油品",
      // },
    ];

    setOption({
      ...getRingOption(
        {
          data,
          getValue: (name: any) => getPercent(data, name),
          getTitle: () =>
            getChartTitle({
              text: getPercent(data, "电力"),
              subtext: "电力",
            }),
          getPercent: () => getPercentTotal(data, 0.01),
        },
        {
          "series[0].radius": ["60%", "70%"],
          "series[1].radius": ["50%", "60%"],
          data: data,
        }
      ),
    });
  };

  const onLoaded = (chart: any) => {
    setChartTitle(chart);
  };
  const disabledDate1 = (current: any) => {
    return current >= dayjs() || current < dayjs("2024");
  };

  return (
    <div className={styles.carbonRight}>
      {timeRender}
      <TitleModule
        title="当日设备电力实时数据"
        className={styles.carbonRightTop}
        rightRender={
          <span style={{ fontSize: "14px", marginRight: "100px" }}>
            单位：万千瓦时
          </span>
        }
      />
      <div className={styles.chart}>
        <CurrentData />
        {/* <ChartView
          onLoaded={onLoaded}
          option={option}
          style={{ height: 200 }}
        /> */}
      </div>

      <TitleModule
        title="各设备类型电力消耗"
        extraNode={<div className={styles.icons}></div>}
        rightRender={
          <DatePickerModify
            picker="year"
            format={"YYYY年"}
            defaultValue={dayjs("2024")}
            disabledDate={disabledDate1}
            style={{ width: 100, marginRight: "100px" }}
          />
        }
      />
      <div className={styles.chart}>
        <ChartView option={option1} style={{ height: 200 }} />
      </div>

      <TitleModule title="当日设备异常" />
      <ValueList list={listData} isDanger />
    </div>
  );
};
export default CarbonLeft;
