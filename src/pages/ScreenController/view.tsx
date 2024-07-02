/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-22 10:37:20
 * @LastEditTime: 2024-04-10 16:28:34
 */
import MangerFrame from "@/components/MangerFrame/MangerInfo";
import useResultRequest from "@/hooks/useResultRequest";
import {
  getEnergyMonitorDetail
} from "@/service/energy";
import ProTable from "@ant-design/pro-table";
import { Button, Col, Row, Spin } from "antd";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import { columns, listOptionsRender } from "./constat";
import styles from "./index.module.less";

const View = () => {
  const navigate = useNavigate();
  const { loading, data } = useResultRequest(getEnergyMonitorDetail)

  return (
    <div className={classNames([styles.headers, styles.view])}>
      <Spin spinning={loading}>
        <MangerFrame title={"大屏控制器"}>
          <div className={styles.form_contianer}>
            <Row gutter={[20, 20]}>
              {
                listOptionsRender.map((el, index) => {
                  return <React.Fragment key={index + 1 + "_idx"}>
                    {
                      el.title ? <Col span={12}>
                        <span className={styles.name}>{el.title}：</span>
                        <span>{
                          data?.[el.name!] || ""
                        }</span>
                      </Col> : el?.render?.()
                    }
                  </React.Fragment>
                })
              }
            </Row>
          </div>
          <div className={[styles.title, styles.title_table].join(" ")}>
            能源消耗与碳排放 - 单位工业增加值（万元）
          </div>
          <ProTable
            columns={columns}
            rowKey="id"
            bordered
            scroll={{
              x: 960,
            }}
            dataSource={data?.table?.map?.((el: any, index: number) => {
              return {
                ...el,
                id: index + 10086,
              }
            })}
            search={false}
            options={false}
            pagination={false}
          />
          <div className={styles.btns}>
            <Button
              onClick={() => {
                navigate("/admin/screencontroller/edit")
              }}
            >
              编辑
            </Button>
          </div>

        </MangerFrame>
      </Spin>
    </div>
  );
};
export default View;
