/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-04-10 18:33:38
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-11 16:25:26
 * @FilePath: \companyApplication\src\pages\EnergyConsumption\EnergyRight\currentData.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Col, Row, Tooltip } from "antd";
import styles from "./index.module.less";
import FlipNumber from "@/components/FlipNumber";
import { InfoCircleFilled } from "@ant-design/icons";
import { ALPHA, data } from "./constat";
import classNames from "classnames";
import FlipNumberinner from "./FlipNumber";

const CenterMap = () => {
  return (
    <div className={styles.datas}>
      <Row style={{ width: "100%" }} className={styles.dataslist}>
        <Col span={8} style={{ paddingLeft: "43px 15px" }}>
          <div className={styles.title}>
            <span className={styles.light}></span> <span>一期高压</span>
          </div>
          <div className={styles.numbers}>
            <FlipNumber value={53000}  />
          </div>
        </Col>
        <Col span={16} style={{ paddingLeft: "43px" }}>
          <div className={styles.title}>
            <span className={styles.clock}></span>
            <span>
              总表与分表数据差值
              <Tooltip title="未采集点位消耗情况">
                <InfoCircleFilled className={styles.info} />
              </Tooltip>
            </span>
          </div>
          <div className={styles.numbers}>
            <FlipNumber value={1803.9}  />
          </div>
        </Col>
      </Row>
      <div className={styles.list}>
        <div className={styles.list_content}>
          {data?.slice(0, 5).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
              })}
            >
              <span className={styles.title}>{el?.title}</span>
              <FlipNumberinner value={el?.value} />
            </div>
          ))}
        </div>
        <div className={styles.list_content}>
          {data?.slice(5, 10).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
              })}
            >
              <span className={styles.title}>{el?.title}</span>
              <FlipNumberinner value={el?.value} />
            </div>
          ))}
        </div>
        <div className={styles.list_content}>
          {data?.slice(10, 15).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
              })}
            >
              <span className={styles.title}>{el?.title}</span>
              <FlipNumberinner value={el?.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CenterMap;
