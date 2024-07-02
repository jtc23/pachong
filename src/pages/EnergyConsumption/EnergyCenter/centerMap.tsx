/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-04-11 16:05:13
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-11 16:20:06
 * @FilePath: \Project_AoGangLian-Web\src\pages\EnergyConsumption\EnergyCenter\centerMap.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";
import { data, ALPHA } from "../EnergyRight/constat";
import { useState } from "react";
import classNames from "classnames";
import Index from "@/components/SeamlessScroll";
import { isNumber } from "lodash";
const CenterMap = () => {
  const [current, setCurrent] = useState<number | undefined>(undefined);
  return (
    <div className={styles.map_container}>
      <div className={styles.inner_map}>
        <div className={styles.top_choose}>
          {data?.slice(0, 5).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
                [styles.choose_item_active]: current == index,
              })}
              onClick={() => {
                if (current == index) {
                  setCurrent(undefined);
                } else {
                  setCurrent(index);
                }
              }}
            >
              {ALPHA[index]}: <span>{el?.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.bottom_choose}>
          {data?.slice(5, 10).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
                [styles.choose_item_active]: current == index + 5,
              })}
              onClick={() => {
                if (current == index + 5) {
                  setCurrent(undefined);
                } else {
                  setCurrent(index + 5);
                }
              }}
            >
              {ALPHA[index + 5]}: <span>{el?.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.right_choose}>
          {data?.slice(10, 15).map((el, index) => (
            <div
              className={classNames({
                [styles.choose_item]: true,
                [styles.choose_item_active]: current == index + 10,
              })}
              onClick={() => {
                if (current == index + 10) {
                  setCurrent(undefined);
                } else {
                  setCurrent(index + 10);
                }
              }}
            >
              {ALPHA[index + 10]}: <span>{el?.title}</span>
            </div>
          ))}
        </div>
        {isNumber(current) ? (
          <div className={styles.right_top}>
            <div className={styles.title}>
              {ALPHA[current]}: <span> {data[current]?.title}</span>
            </div>
            <div className={styles.content}>
              <b> 电力:</b> <span> {data[current]?.value}万千瓦时</span>
            </div>
            <div className={styles.content}>
              <b>采集时间:</b> <span> 2024/4/10 10:15</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CenterMap;
