/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-04 16:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-11 14:43:28
 * @FilePath: \companyApplication\src\pages\EnergyMonitor\view\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChartView from "@/components/EchartView";
import { RESPONSECODE } from "@/enums/global";
import { getCarbonMointorDetail, getCarbonMonitorNav } from "@/service/energy";
import { calMax, calMin } from "@/utils/utils";
import { useRequest } from "ahooks";
import { Button, Col, DatePicker, Row, Spin, message } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { treeHandler } from "yoke_tools";
import styles from "../index.module.less";
import { monitorStore } from "@/store";
const dateFormat = "YYYY-MM-DD";
const dateFormatGET = "YYYY/MM/DD";
const index = () => {
  const navigate = useNavigate();
  const echartsRef = useRef<any>();
  const { carbonDate } = monitorStore();
  const [options, setOption] = useState<any | undefined>(undefined);
  const [date, setDate] = useState<any>(carbonDate);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const disabledDate = (current: any) => {
    return current >= dayjs() || current < dayjs("2024-02-25");
  };
  const { loading, run } = useRequest(getCarbonMointorDetail, {
    manual: true,
    onSuccess: (result) => {
      if (result?.code === RESPONSECODE.SUCCESS) {
        const data1 = result?.data?.value?.map((el: string) => el == '0' ? null : el);
        const data2 = result?.data?.carbonValue?.map((el: string) => el == '0' ? null : el);;
        const max1 = calMax(data1);
        const min1 = calMin(data1);
        const max2 = calMax(data2);
        const min2 = calMin(data2);

        const title = treeHandler.findNode(structuredClone(treeData), (el) => el.code == selectedKeys[0])?.name

        setOption({
          title: {
            text: title,
            left: 'center',
            top: '8%',
            textStyle: {
              fontSize: 28,
              fontWeight: "bold",
            }
          },
          grid: {
            top: "30%",
            bottom: "4%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["电能", "碳排放"],
            top: "20%",
          },
          xAxis: [
            {
              type: "category",
              data: result?.data?.name?.map((el: string) => el + ":00"),
              axisLabel: {
                //展示角度
                // rotate: 45,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "单位：千瓦时",
              min: min1,
              max: max1,
              splitNumber: 5,
              interval: (max1 - min1) / 5,
              // axisLabel: {
              //     formatter: '{value} ml'
              // }
            },
            {
              type: "value",
              name: "单位：吨CO₂",
              min: min2,
              max: max2,
              splitNumber: 5,
              interval: (max2 - min2) / 5,
              // axisLabel: {
              //     formatter: '{value} °C'
              // }
            },
          ],
          series: [
            {
              name: "电能",
              type: "bar",
              data: data1,
              barWidth: 25,
              itemStyle: {
                borderRadius: [15, 15, 0, 0], // 重点
              },
            },
            {
              name: "碳排放",
              type: "line",
              yAxisIndex: 1,
              data: data2,
              smooth: true,
              lineStyle: {
                normal: {
                  width: 3,
                },
                borderColor: 'rgba(0,0,0,.4)',
              },
            },
          ],
        });
      } else {
        message.error(result?.msg);
      }
    },
  });

  const { loading: loadingTree, run: runTree } = useRequest(getCarbonMonitorNav, {
    onSuccess: (result) => {
      if (result?.code === RESPONSECODE.SUCCESS) {
        const treeList = treeHandler.fromList(result?.data, {
          id: "code",
          pid: "parentCode",
          children: "children",
        })
        const list = treeHandler.findNodeAll(structuredClone(treeList), (el) => el.children?.length > 0);

        setExpandedKeys(list?.map((el: any) => el.code) || [])

        setTreeData(treeList);
        setSelectedKeys([treeList[0]?.code])
      } else {
        message.error(result?.msg);
      }
    },
  })

  useEffect(() => {
    if (date && selectedKeys.length > 0) {
      run({ time: dayjs(date).format(dateFormatGET), code: selectedKeys[0] });
    }
  }, [date, selectedKeys]);

  const onSelect = (keys: any) => {
    setSelectedKeys(keys);
  }

  const onExpand = (keys: any) => {
    setExpandedKeys(keys);
  }

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <Button
          type="default"
          className={styles.back_button}
          onClick={() => {
            navigate("/admin/carbonmonitor");
          }}
        >
          返回
        </Button>
        <DatePicker
          value={dayjs(date, dateFormat)}
          format={dateFormat}
          style={{ float: "right" }}
          disabledDate={disabledDate}
          onChange={(e) => {
            setDate(e?.format(dateFormat));
          }}
        />
      </div>

      <Row gutter={[20, 20]}>
        <Col span={6}>
          <Spin spinning={loadingTree}>
            <div className={styles.tree}>
              <DirectoryTree
                onSelect={onSelect}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                treeData={treeData}
                fieldNames={{
                  title: "name",
                  key: "code",
                  children: "children",
                }}
                showIcon={false}
                expandAction={false}
              />
            </div>
          </Spin>
        </Col>
        <Col span={18}>
          <Spin spinning={loading}>
            <div className={styles.mix}>
              <ChartView option={options} echartsRef={echartsRef} />
            </div>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};
export default index;
