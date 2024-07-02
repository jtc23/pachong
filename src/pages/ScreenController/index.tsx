/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-22 10:37:20
 * @LastEditTime: 2024-04-10 15:48:47
 */
import MangerFrame from "@/components/MangerFrame/MangerInfo";
import ProFromInputNumber from "@/components/ProFromInputNumber";
import { RESPONSECODE } from "@/enums/global";
import useResultRequest from "@/hooks/useResultRequest";
import {
  getEnergyMonitorDetail,
  saveEnergyMonitorDetail
} from "@/service/energy";
import { EditableProTable, ProForm, ProFormInstance } from "@ant-design/pro-components";
import { Button, Col, Row, Space, Spin, message } from "antd";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSourceType, columns, listOptionsRender, numList } from "./constat";
import styles from "./index.module.less";


const HeaderContentRender = () => {
  const navigate = useNavigate();
  const formRef = useRef<ProFormInstance>();
  const [editableKeys, setEditableKeys] = useState<any>([]);
  const uuidRef = useRef<any>()

  const { loading } = useResultRequest(getEnergyMonitorDetail, {
    onSuccess: (result) => {
      if (result?.code === RESPONSECODE.SUCCESS) {
        const data = result.data;
        data.table = data.table?.map?.((el, index) => {
          return {
            ...el,
            id: index + 10086,
          }
        })
        setEditableKeys(data.table?.map?.(el => el.id) || [])
        formRef.current?.setFieldsValue(data)
      }
    }
  })

  const { loading: submitLoading, run } = useResultRequest(saveEnergyMonitorDetail, {
    manual: true,
    onSuccess: (result) => {
      if (result?.code === RESPONSECODE.SUCCESS) {
        message.success("保存成功");
      }
    }
  })

  const onSubmit = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      run(values);
    }).catch((errorInfo) => {
      message.error('请填写完整信息');
    })
    // .catch((errorInfo) => {
    //   console.log(errorInfo);
    //   const list = [...document.querySelectorAll('.table .ant-form-item-has-error')];
    //   list.forEach((el) => {
    //     el?.classList.add('error');
    //   });
    // })
  }

  const onValuesChange = (values: any) => {
    // setTimeout(() => {
    //   const list = [...document.querySelectorAll('.table .ant-form-item-has-error')];
    //   console.log(list);
    //   list.forEach((el) => {
    //     el?.classList.remove('error');
    //   });
    // }, 0)
  }
  const uuid = Date.now();
  return (
    <div className={styles.headers}>
      <Spin spinning={loading}>
        <MangerFrame title={"大屏控制器"}>
          <ProForm
            formRef={formRef}
            submitter={false}
            requiredMark={false}
            layout="horizontal"
            onValuesChange={onValuesChange}
          >
            <div className={classNames([styles.form_contianer, styles.contianer])}>
              <Row gutter={[20, 0]}>
                {
                  listOptionsRender.map((el, index) => {
                    return <React.Fragment key={index + '_id'}>
                      {
                        el.title ? <Col span={12}>
                          <ProFromInputNumber
                            label={<div className={styles.label_title}>
                              {el.title}
                            </div>}
                            name={el.name}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                            // labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8 }}
                            placeholder={`请输入阈值`}
                            max={Infinity}
                            min={-Infinity}
                            automaticMax={Infinity}
                            automaticMin={-Infinity}
                            placesNumber={2}
                          />
                        </Col> : el?.render?.()
                      }
                    </React.Fragment>
                  })
                }
              </Row>
            </div>
            <div className={classNames([styles.title, styles.title_tables])}>
              能源消耗与碳排放 - 单位工业增加值（万元）
            </div>
            <div className={classNames([styles.edit_table, 'table'])}>
              <EditableProTable<DataSourceType>
                columns={columns}
                rowKey="id"
                bordered
                scroll={{
                  x: 960,
                }}
                name={'table'}
                recordCreatorProps={{
                  newRecordType: 'dataSource',
                  record: (index) => {
                    const uuid = index + 10086;
                    uuidRef.current = uuid;
                    const data: any = { id: uuid };
                    numList.forEach((key) => {
                      data[key] = 0;
                    });
                    return data
                  },
                  creatorButtonText: '增加年份',
                  onClick: () => {
                    setEditableKeys([...editableKeys, uuidRef.current])
                    uuidRef.current = null;
                  }
                }}
                toolBarRender={() => {
                  return [];
                }}
                editable={{
                  type: 'multiple',
                  editableKeys,
                }}
              />
            </div>
          </ProForm>
          <div className={styles.btns}>
            <Space size={12} >
              <Button onClick={() => {
                navigate("/admin/screencontroller")
              }}>
                关闭
              </Button>
              <Button
                onClick={onSubmit}
                type="primary"
                loading={submitLoading}
              >
                保存
              </Button>
            </Space>
          </div>

        </MangerFrame>
      </Spin>
    </div>
  );
};
export default HeaderContentRender;
