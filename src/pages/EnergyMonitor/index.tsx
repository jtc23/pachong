/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-22 10:37:20
 * @LastEditTime: 2024-05-24 16:07:02
 */
import SearchBoxComponent from "@/components/SearchBoxComponent";
import { RESPONSECODE } from "@/enums/global";
import Ytable from "@/Hoc/Ytable";

import { monitorStore } from "@/store";
import moment from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
interface pointType {
  label: String;
  value: String;
  title: String;
}

const HeaderContentRender = () => {
  const { setRecoverValues } = monitorStore();
  const [params, setParams] = useState({});
  const navigate = useNavigate();
  const formRef = useRef<any>();
  const [pointName, setPointName] = useState([]);
  const [pointAddress, setPointAddress] = useState([]);
  // const [dataSource, setData] = useState([]);

  return <div className={styles.headers}>1111</div>;
};
export default HeaderContentRender;
