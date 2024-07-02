/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-22 10:37:20
 * @LastEditTime: 2024-04-10 18:34:59
 */
import SearchBoxComponent from "@/components/SearchBoxComponent";
import Ytable from "@/Hoc/Ytable";
import {
  getCarbonMonitorList
} from "@/service/energy";
import { monitorStore } from "@/store";
import moment from "dayjs";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
interface pointType {
  label: String;
  value: String;
  title: String;
}

const HeaderContentRender = () => {
  const [params, setParams] = useState({});
  const { setRecoverValues } = monitorStore();
  const navigate = useNavigate();
  const formRef = useRef<any>();
  const [pointName, setPointName] = useState([]);
  const [pointAddress, setPointAddress] = useState([]);
  const [total, setToal] = useState("0");
  // const [dataSource, setData] = useState([]);
  const disabledDate = (current: any) => {
    return current >= moment() || current < moment("2024-02-25");
  };
  const options = [
    {
      placeholder: ["开始日期", "结束日期"],
      value: "date",
      type: "rangePicker",
      disabledDate: disabledDate,
    },
  ];

  // useEffect(() => {
  //   if (pointName?.length > 0 && pointAddress?.length > 0) {
  //     formRef.current?.setFields([
  //       {
  //         name: ["pointAddress"],
  //         value: pointAddress[0]?.value,
  //       },
  //     ]);
  //     formRef.current?.setFields([
  //       {
  //         name: ["pointName"],
  //         value: pointName[0]?.value,
  //       },
  //     ]);
  //   }
  // }, [pointName, pointAddress]);
  const columns = [
    {
      title: "日期",
      dataIndex: "time",
      renderText: (e) => (e ? moment(e).format("YYYY-MM-DD") : null),
      width: 180,
      align: "left",
    },
    {
      title: "电能（kwh)",
      dataIndex: "value",
      width: 180,
      align: "left",
    },
    {
      title: "碳排放量（吨CO₂）",
      dataIndex: "carbonValue",
      width: 180,
      align: "left",
    },

    {
      title: "操作",
      width: 100,
      align: "left",
      render: (_, data) => {
        return (
          <span
            className={styles.pointor}
            onClick={() => {
              setRecoverValues({
                carbonDate: moment(data?.time).format("YYYY-MM-DD"),
              });
              navigate(`/admin/carbonmonitor/view`);
            }}
          >
            查看
          </span>
        );
      },
    },
  ];
  return (
    <div className={styles.headers}>
      <div className={styles.search}>
        <SearchBoxComponent
          options={options}
          formRef={formRef}
          onSearch={(e) => {
            console.log(e);

            setParams((old) => {
              return {
                // ...old,
                startTime: e?.date ? (e?.date[0]).format("YYYY/MM/DD") : null,
                endTime: e?.date ? (e?.date[1]).format("YYYY/MM/DD") : null,
                a: Math.random(),
              };
            });
          }}
          show={false}
          // onToolbar={AddjoinOrder}
          toolbarProps={{
            text: `+  新增反馈`,
          }}
        />
      </div>

      <div className={styles.table}>
        <div className={styles.total}>
          碳排放量累计&nbsp;: &nbsp;&nbsp;{total} {"吨CO₂"}
        </div>
        <Ytable
          columns={columns}
          params={params}
          //   onDetails={onDetails}
          //   onEdits={onEdits}
          //   onDeletes={onDeletes}
          // onMenus={onMenus}
          // total={total}
          bordered
          // dataSource={dataSource}
          request={async (params, sorter, filter) => {
            try {
              let datas = {
                ...params,
              };

              const res = await getCarbonMonitorList(datas);

              const items = res?.data?.table;
              setToal(res?.data?.total);
              // setTotal(total);
              return {
                data: items,
                success: true,
                // total: total,
              };
            } catch (e) {
              return {
                data: [],
                total: 0,
              };
            }
          }}
          tableClassName={"cursor_table"}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
        //   scroll={{ x: scrollX }}
        />
      </div>
    </div>
  );
};
export default HeaderContentRender;
