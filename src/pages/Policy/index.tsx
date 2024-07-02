/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-04-17 15:14:49
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 17:36:43
 * @FilePath: \carb-enterprise-web\src\pages\Third\Policy\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";
import LearningList from "./component/LearningList";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRequest } from "ahooks";
import { getLatestPolicyList, getLatestPolicyDropNew } from "./service";
import useSetState from "@/hooks/useSetState";
import classNames from "classnames";
import treeTool from "@/utils/js-tree-tool";
import { Input } from "antd";
import { values } from "lodash-es";
const { Search } = Input;

const Policy: React.FC = (props: any) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [firstLevel, setFirstLevel] = useState(0);
  const [secondLevel, setSecondLevel] = useState(0);

  const shareRef = useRef();
  useEffect(() => {
    console.log(import.meta.env.MODE);
  }, []);
  const { loading, run } = useRequest(getLatestPolicyList, {
    manual: true,
    onSuccess: (result) => {
      setData(
        result?.data?.contents?.map((item) => ({
          title: (
            <div
              className={styles.item_container}
              onClick={() => {
                window.open(item?.url);
              }}
            >
              <div className={styles.fixation}>
                <div className={styles.triangle} />
                <div className={styles.main_title}>{item?.name}</div>
              </div>
              {item?.policyInterpretation > 0 && (
                <div className={styles.interpretation}>解读</div>
              )}
            </div>
          ),
          content: (
            <div className={styles.item_content}>
              <div className={styles.main_content}>
                {item?.releaseTime && `${item?.releaseTime}发布`}
              </div>
              <div className={styles.standardnumber}>
                {item?.dispatchNumber}
              </div>
              <div
                className={styles.keyword}
                style={{
                  textAlign: "left",
                  lineHeight: "21px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {item?.keyWord && "关键词:"}
                <span
                  style={{
                    color: "#328A38",
                    lineHeight: "21px",
                    height: "21px",
                    overflow: "hidden",
                    display: "inline-block",
                    width: "160px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item?.keyWord}
                </span>
              </div>
            </div>
          ),
        }))
      );

      setTotal(result?.data?.total);
    },
  });
  const [params, setParams] = useSetState({
    name: "",
    typeId: "",
    pageNum: 1,
    pageSize: "10",
    fieldId: null,
  });
  useEffect(() => {
    run(params);
  }, []);
  const onChange = (page: number, pageSize: number) => {
    setParams({ ...params, pageNum: page, pageSize: pageSize }, (params) => {
      run(params);
    });
  };
  useEffect(() => {
    getLatestPolicyDropNew({ onlineId: "policy_type" }).then((res) => {
      if (res?.code === 0) {
        const menus = treeTool.fromList(res?.data, {
          pid: "parentId",
        });
        menus.unshift({
          id: null,
          value: "全部",
        });

        setMenuList(menus);
      }
    });
    getLatestPolicyDropNew({ onlineId: "file_field" }).then((res) => {
      if (res?.code === 0) {
        const menus = treeTool.fromList(res?.data, {
          pid: "parentId",
        });
        menus.unshift({
          id: null,
          value: "全部",
        });
        setAreaList(menus);
      }
    });
  }, []);

  const onSearch = (value: string) => {
    setParams(
      { ...params, name: value, pageNum: 1, pageSize: 10 },
      (params) => {
        run(params);
        shareRef!.current?.handleSetDefaultPage();
      }
    );
    // run({ ...params, name: value });
  };
  return (
    <div className={styles.policies_main_right}>
      <div className={styles.policies_search}>
        <Search
          className={styles.input_region}
          placeholder={"请输入名称关键字、标准号"}
          allowClear
          enterButton={
            <div className={styles.search}>
              <img
                className={styles["search-icon"]}
                src="/home/search1.png"
                alt=""
              />
              <span className={styles["search-text"]}>检索</span>
            </div>
          }
          size="large"
          onSearch={onSearch}
        />
      </div>

      <div className={styles.policies_main_right_top}>
        <div className={styles.list}>
          <h3>类型</h3>
          <ul id="switchType">
            {menuList.map((item, index) => (
              <li
                className={classNames({
                  [`${styles.select_policies_li}`]: index === firstLevel,
                })}
                key={item?.value}
                datatype={item?.value}
                onClick={() => {
                  setFirstLevel(index);
                  setParams({ ...params, typeId: item?.id }, (params) => {
                    run(params);
                  });
                }}
              >
                {item?.value}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.list}>
          <h3>领域</h3>

          <ul id="switchType">
            {areaList.map((item, index) => (
              <li
                className={classNames({
                  [`${styles.select_policies_li}`]: index === secondLevel,
                })}
                key={item?.value}
                datatype={item?.value}
                onClick={() => {
                  setSecondLevel(index);
                  setParams({ ...params, fieldId: item?.id }, (params) => {
                    run(params);
                  });
                }}
              >
                {item?.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.policies_main_right_main}>
        <LearningList
          data={data}
          total={total}
          loading={loading}
          onPageChange={onChange}
          ref={shareRef}
        />
      </div>
    </div>
  );
};

export default Policy;
