/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-09-05 09:50:29
 * @LastEditTime: 2023-12-20 19:21:03
 */
import styles from "./index.module.less";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { Col } from "antd";

export interface ButtonProps {
  title?: string | React.ReactNode;
  data?: any;
  span?: number | undefined;
  style?: any;
  filterData?: any[];
  isLink?: boolean;
  isOriginl?: boolean;
}
const MangerListComponent = ({
  title,
  data,
  span,
  style,
  filterData = [],
  isLink = false,
  isOriginl = false,
}: ButtonProps) => {
  const [Item, setItem] = useState<string>("");
  useEffect(() => {
    if (!data || !data.length) {
      setItem("");
    }
    if (!filterData.length) {
      setItem(data);
    } else {
      const list = filterData.filter((el) => data?.indexOf(el.value) >= 0);
      setItem(list.map((el) => el.title).join("、"));
    }
  }, [data, filterData]);
  const getClassname = (index: number | undefined) => {
    switch (index) {
      case 24:
        return "col-md24";
      case 12:
        return "col-md12";
      case 8:
        return "col-md8";
      default:
        return "col-md24";
    }
  };

  return (
    <div
      className={classNames({
        [styles.MangerListComponent]: !isOriginl,
        [styles.OriginalMangerListComponent]: isOriginl,
      })}
      style={style}
    >
      <b>{title}:</b>
      {isLink ? (
        <a href={Item} target={"_blank"}>
          {Item}
        </a>
      ) : (
        <p>{Item}</p>
      )}
    </div>
  );
};

export default MangerListComponent;
