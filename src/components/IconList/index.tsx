/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:13:34
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-18 10:50:00
 * @FilePath: \companyApplication\src\components\IconList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";
import cs from "classnames";
import { Col, Row } from "antd";
import FlipNumber from "../FlipNumber";

type ListItem = {
  [p in string]: string | number | boolean;
};

type IconListProps = {
  list: ListItem[];
  className?: string;
  color?: string;
  span?: number;
};

const IconList = (props: IconListProps) => {
  const { list, className, color } = props;

  return (
    <div className={cs(className, styles.list)}>
      {list?.length > 0 ? (
        <Row gutter={list[0].span ? [0, 0] : [20, 32]}>
          {list?.map((item, index) => {
            return (
              <Col span={item.span ?? 12} key={index}>
                <div className={styles.list_item}>
                  <div
                    className={styles.item_icon}
                    style={{ background: `url(/icon/${item.icon}.webp)` }}
                  ></div>
                  <div className={styles.item_content}>
                    <div className={styles.item_title}>{item.name}</div>
                    <div className={styles.item_desc}>
                      {!isNaN(Number(item?.value)) ? (
                        <>
                          <FlipNumber
                            color={color}
                            value={Number(item?.value)}
                          />
                          <span className={cs([styles.prod, "countup"])}>
                            {item.units}
                          </span>
                        </>
                      ) : (
                        <span className={cs([styles.prod, "countup"])}>
                          {item?.value}
                        </span>
                      )}
                    </div>
                    <div className={styles.item_unit}>{item.unit}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : null}
    </div>
  );
};
export default IconList;
