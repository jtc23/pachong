/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:05:23
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-19 10:02:35
 * @FilePath: \companyApplication\src\components\ClassificationValueList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";
import cs from "classnames";
import { Space } from "antd";
import FlipNumber from "../FlipNumber";

type ClassificationValueListProps = {
  list: {
    name: string;
    value: string;
    unit: string;
    units?: string;
  }[];
  className?: string;
};

const ClassificationValueList = (props: ClassificationValueListProps) => {
  const { list, className } = props;

  return (
    <div className={cs(styles.list, className)}>
      <div className={styles.container}>
        {list.map((item, index) => {
          return (
            <div className={styles.list_item} key={index}>
              <div className={styles.item_value}>
                {item?.value == "-" ? (
                  <span className={styles.CountUp}>-</span>
                ) : (
                  <FlipNumber value={Number(item?.value)} />
                )}
                <span className={styles.units}>{item?.units}</span>
              </div>
              <div className={styles.item_unit}>{item.unit}</div>
              <div className={styles.item_name}>{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.font_decorate}></div>
    </div>
  );
};
export default ClassificationValueList;
