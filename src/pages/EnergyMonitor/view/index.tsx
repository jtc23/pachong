/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-04 16:46:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-10 10:10:41
 * @FilePath: \companyApplication\src\pages\EnergyMonitor\view\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MangerInfoTitle from "@/components/MangerFrame/MangerInfoTitle";
import styles from "../index.module.less";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { section, energyTtype } from "../constant";
import Viewchart from "./component/viewchart";
import classNames from "classnames";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
const index = () => {
  const navigate = useNavigate();
  const [leftOption, setLeft] = useState("electric");
  const [rightOption, setRight] = useState("year");
  const [data, setData] = useState<any | undefined>(undefined);
  return (
    <div className={styles.view}>
      <Button
        type="default"
        className={styles.back_button}
        onClick={() => {
          navigate("/admin/energymonitor");
        }}
      >
        返回
      </Button>
      <MangerInfoTitle title={"企业用能分析"} />
      <div className={styles.viewcontent}>
        <Row>
          <Col span={6}>
            <div className={styles.title_sub}>电力</div>
            <div className={styles.right}>
              {section.map((el) => (
                <div
                  className={classNames({
                    [styles.choose_button]: true,
                    [styles.choose_button_active]: el?.value == rightOption,
                  })}
                  onClick={() => {
                    setRight(el?.value);
                  }}
                >
                  {el?.name}
                </div>
              ))}
            </div>
          </Col>
          <Col span={18}>
            <div className={styles.view_datas}>
              <div className={styles.view_datas_card}>
                <h4>{section?.find((el) => el?.value == rightOption)?.label}</h4>
                <div className={styles.view_datas_item}>
                  <span
                    title={data?.timeValue}
                    className={styles.view_datas_span_first}
                  >
                    {data?.timeValue}
                  </span>
                  <span>千瓦时</span>
                </div>
              </div>
              <div className={styles.view_datas_card}>
                <h4>{section?.find((el) => el?.value == rightOption)?.last}</h4>
                <div className={styles.view_datas_item}>
                  <span
                    title={data?.lastTimeValue}
                    className={styles.view_datas_span_first}
                  >
                    {data?.lastTimeValue}
                  </span>
                  <span>千瓦时</span>
                </div>
              </div>
              <div className={styles.view_datas_card}>
                <h4>
                  趋势
                  {Number(data?.timeValue) > Number(data?.lastTimeValue) ? (
                    <RiseOutlined className={styles.trend_icon_rise} />
                  ) : Number(data?.timeValue) < Number(data?.lastTimeValue) ? (
                    <FallOutlined className={styles.trend_icon_down} />
                  ) : null}
                </h4>

                <div className={styles.view_datas_item}>
                  <span
                    title={data?.trendValue}
                    className={styles.view_datas_span_first}
                  >
                    {data?.trendValue}
                  </span>
                  <span className={styles.view_datas_span_first}> {data?.trend}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.content}>
          <Viewchart setData={setData} leftOption={leftOption} rightOption={rightOption} />
        </div>
      </div>
    </div>
  );
};
export default index;
