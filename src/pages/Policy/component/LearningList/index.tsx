/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-10-20 15:50:04
 * @LastEditTime: 2024-05-24 16:31:08
 */

import {
  useEffect,
  useState,
  ReactNode,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { history, useLocation } from "umi";
import { Button } from "antd";
import { getLatestStandardsList } from "@/services/client/learningPolicy";
import styles from "./index.module.less";
import { ProList } from "@ant-design/pro-components";
import { ConfigProvider, Menu, Space, Typography, Input } from "antd";
import { useRequest } from "ahooks";
import { getObjectisNull, tableKey } from "@/utils/utils";
import classNames from "classnames";
import CustomPagination from "@/components/CustomPagination";
import { useNavigate } from "react-router-dom";
interface PoliyOrStandardsItemProps {
  params?: any;
  data: any[] | undefined;
  total: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  renderEmpty?: ReactNode[];
}
export const customizeRenderEmptynull = () => (
  <div className={classNames([styles.Empty, "empty"])}>
    <img src="/fileImage/add.png" alt="" />
    <p>找不到您要查询的内容信息</p>
    <p>建议:</p>
    <p>1、请尝试更换其他关键词</p>
    <p>2、使用系统分类查询</p>
  </div>
);

export const customizeRenderEmptySearch = () => (
  <div className={classNames([styles.Empty, "empty"])}>
    <img src="/fileImage/add.png" alt="" />
    <p>搜索无结果</p>
  </div>
);
const LearningList = forwardRef((props: PoliyOrStandardsItemProps, ref) => {
  const {
    params,
    data,
    total,
    loading = true,
    onPageChange,
    renderEmpty,
  } = props;
  const navigate = useNavigate();

  const [inputvalue, setInputvalue] = useState("");
  const actionRef = useRef();
  const paginationref = useRef();
  // const [searchValue, setSearchValue] = useState<string>("");

  // const setSearchValue = (value: string) => {
  //     setParams({ ...params, name: value });
  //     run({ ...params, name: value });
  // };
  const onChange = (page: number, pageSize: number) => {
    onPageChange(page, pageSize);
    // setParams({ ...params, pageNum: page, pageSize: pageSize });
    // run({ ...params, pageNum: page, pageSize: pageSize });
  };

  useImperativeHandle(ref, () => ({
    handleSetDefaultPage: () => {
      handleSetDefaultPage();
    },
  }));
  const handleSetDefaultPage = () => {
    paginationref!.current?.handleSetDefaultPage();
  };

  return (
    <div style={{ position: "relative" }}>
      <ConfigProvider
        renderEmpty={
          renderEmpty
            ? renderEmpty[!getObjectisNull(params) ? 0 : 1]
            : !getObjectisNull(params)
            ? customizeRenderEmptynull
            : customizeRenderEmptySearch
        }
      >
        <ProList
          itemLayout="vertical"
          split={true}
          loading={loading}
          actionRef={actionRef}
          // pagination={{
          //     total: total,
          //     defaultPageSize: 10,
          //     showSizeChanger: true,
          //     hideOnSinglePage: total <= 10,
          //     showQuickJumper: {
          //         goButton: (
          //             <Button type="primary" style={{ marginLeft: "20px" }}>
          //                 确定
          //             </Button>
          //         ),
          //     },
          //     showTotal: () => null,
          //     responsive: true,
          //     onChange: onChange,
          //     style: { marginLeft: "-300px" },
          // }}
          metas={{
            title: {},
            content: {},
          }}
          size={"large"}
          dataSource={data}
        />
      </ConfigProvider>
      {total > 10 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomPagination
            total={total}
            onChange={onChange}
            ref={paginationref}
          />
        </div>

        // <div className={styles.quickjumper}>
        //     调至
        //     <Input
        //         style={{ width: "50px", marginLeft: "10px" }}
        //         onKeyUp={handleKeyDown}
        //         value={inputvalue}
        //         onChange={e => {
        //             setInputvalue(e?.target?.value);
        //         }}
        //     />
        //     <span style={{ marginRight: "20px", marginLeft: "10px" }}>页</span>
        //     <Button type="primary">确定</Button>
        // </div>
      )}
    </div>
  );
});

export default LearningList;
