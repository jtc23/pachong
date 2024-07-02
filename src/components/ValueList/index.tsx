/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:19:07
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-10 10:59:02
 * @FilePath: \companyApplication\src\components\ValueList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FlipNumber from "../FlipNumber";
import styles from "./index.module.less";
import cs from "classnames";
type ValueListProps = {
  list: {
    name: string;
    value: string | number;
    unit: string;
    icon?: string;
  }[];
  isDanger?: boolean;
};

const ValueList = (props: ValueListProps) => {
  const { list, isDanger = false } = props;

  return (
    <div className={styles.list}>
      {list.map((item, index) => {
        return (
          <div
            className={cs({
              [styles.list_item]: true,
              list_item: true,
            })}
            key={index}
          >
            <div className={styles.item_i_t}>
              <div className={styles.icon}>
                <img src={item?.icon ?? `/icon/look.webp`} alt="" />
              </div>
              <div
                className={cs({
                  [styles.item_name]: true,
                  item_name: true,
                })}
              >
                {item.name}
              </div>
            </div>

            <div className={styles.item_values}>
              <div className={styles.item_value}>
                <FlipNumber value={Number(item?.value)} isDanger />
              </div>
              <div className={styles.item_unit}>{item.unit}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ValueList;
