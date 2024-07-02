import { Space } from "antd";
import ChartLine from "./ChartLine";
import ChartView from "./ChartView";
import styles from "./index.module.less";
import cs from "classnames";
import { useEffect, useState } from "react";
import { isEmpty, set } from "lodash-es";
import enums from "@/enums";
//import { getEnterpriseCarbonDetail } from "@/api/energy";
import { getTotal, handleNumber } from "@/utils/number";
// import { getEnterpriseCarbon } from "@/api/fleet";

type MapClickRenderProps = {
  name?: string;
  close: (e: any) => void;
  type: number;
  enterpriseId: string;
};

const MapCarbonModel = (props: MapClickRenderProps) => {
  const { name, close, type = 1 } = props;
  const [data, setData] = useState<any>({});
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);

  useEffect(() => {
    if (!isEmpty(props)) {
      if (type == 2) {
        getEnergyData();
      } else {
        getCarbonData();
      }
    }
  }, [props]);

  // 获取能耗的数据
  const getEnergyData = () => {
    // getEnterpriseCarbonDetail(props.enterpriseId).then((res) => {
    //   if (res?.code == enums.ResultCodeEnums.SUCCESS) {
    //     const list: P.GetEnterpriseCarbonDetail[] = res?.data;
    //     const data: P.GetEnterpriseCarbonDetail | undefined = list?.at(-1);
    //     let ratio = 100;
    //     if (list?.at(-2)?.comprehensiveConsumption) {
    //       ratio =
    //         (((data?.comprehensiveConsumption ?? 0) -
    //           (list?.at(-2)?.comprehensiveConsumption! ?? 0)) /
    //           (list?.at(-2)?.comprehensiveConsumption! ?? 1)) *
    //         100;
    //     }
    //     const obj = {
    //       comprehensiveConsumption: data?.comprehensiveConsumption,
    //       ratio: Number(Math.abs(ratio).toFixed(1)),
    //       decline: ratio < 0 ? true : false,
    //       list: list?.map((item) => item?.comprehensiveConsumption ?? 0),
    //       time: list?.map((item) => item?.dataYear),
    //       list1: list?.map((item) => item?.consumptionPerAdded ?? 0),
    //     };
    //     setData(obj);
    //     const arr = [
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "电力",
    //         dataIndex: "electricityConsumption",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "热力",
    //         dataIndex: "heatConsumption",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "燃气",
    //         dataIndex: "gasConsumption",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "煤炭",
    //         dataIndex: "coalConsumption",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "油品",
    //         dataIndex: "oilConsumption",
    //       },
    //     ]?.map((item) => {
    //       return {
    //         ...item,
    //         unit: "吨标煤",
    //         value: data?.[item.dataIndex],
    //       };
    //     });
    //     const total = getTotal(arr, "value");
    //     setList(arr);
    //     setTotal(total);
    //   }
    // });
  };

  // 获取碳排放的数据
  const getCarbonData = () => {
    // getEnterpriseCarbon(props.enterpriseId).then((res) => {
    //   if (res.code === enums.ResultCodeEnums.SUCCESS) {
    //     const list: P.GetCarbonDetail[] = res?.data;
    //     const data: P.GetCarbonDetail | undefined = list?.at(-1);
    //     let ratio = 100;
    //     if (list?.at(-2)?.emissionTotal) {
    //       ratio =
    //         (((data?.emissionTotal ?? 0) -
    //           (list?.at(-2)?.emissionTotal! ?? 0)) /
    //           (list?.at(-2)?.emissionTotal! ?? 1)) *
    //         100;
    //     }
    //     const obj = {
    //       comprehensiveConsumption: data?.emissionTotal,
    //       ratio: Number(Math.abs(ratio).toFixed(1)),
    //       decline: ratio < 0 ? true : false,
    //       list: list?.map((item) => item?.emissionTotal ?? 0),
    //       time: list?.map((item) => item?.dataYear),
    //       list1: list?.map((item) => item?.emissionIntensityPerAdded ?? 0),
    //     };
    //     setData(obj);
    //     const arr = [
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "电力",
    //         dataIndex: "electricityEmission",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "热力",
    //         dataIndex: "heatEmission",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "燃气",
    //         dataIndex: "gasEmission",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "煤炭",
    //         dataIndex: "coalEmission",
    //       },
    //       {
    //         value: "0",
    //         unit: "吨CO₂",
    //         name: "油品",
    //         dataIndex: "oilEmission",
    //       },
    //     ]?.map((item) => {
    //       return {
    //         ...item,
    //         value: handleNumber(data?.[item.dataIndex]),
    //       };
    //     });
    //     const total = getTotal(arr, "value");
    //     setList(arr);
    //     setTotal(total);
    //     // console.log(obj, '......obj', list?.at(-2)?.comprehensiveConsumption)
    //   }
    // });
  };

  return (
    <>
      <div className={styles.font_decorate}>
        <div className={styles.quantity}>
          <div className={styles.quantity_name}>
            {type == 1 ? "年度碳排放总量" : "年度综合能耗"}
          </div>
          <div className={styles.quantity_value}>
            <div className={styles.value}>
              <div className={styles.value_unit}>
                {type == 1 ? "吨CO₂" : "吨标煤"}
              </div>
              <div className={styles.value_number}>
                {handleNumber(data?.comprehensiveConsumption)}
              </div>
            </div>
            <div className={styles.quantity_b}>
              <div className={styles.quantity_b_item}>同比</div>
              <div className={styles.quantity_b_value}>{data?.ratio ?? 0}%</div>
            </div>

            <div
              className={cs({
                [styles.isDecline]: true,
                [styles.isDecline_show]: !data?.decline,
                [styles.isDecline_hide]: data?.decline,
              })}
            ></div>
          </div>
        </div>
        <div className={styles.font_decorate_item}>
          <Space>
            {list.map((item, index) => {
              return (
                <ChartView
                  key={index}
                  total={total}
                  name={item.name}
                  unit={item.unit}
                  value={item.value}
                />
              );
            })}
          </Space>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.info_item}>
          <div className={styles.item_name}>
            {type == 1 ? "碳排放量情况" : "综合能耗情况"}
          </div>
          <ChartLine data={data} type={1} />
        </div>
        <div className={styles.info_item}>
          <div className={styles.item_name}>
            {type == 1 ? "单位工业增加值碳排放情况" : "单位工业增加值综合能耗"}
          </div>
          <ChartLine data={data} type={2} />
        </div>
      </div>
    </>
  );
};
export default MapCarbonModel;
