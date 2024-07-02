/*
 * @Descripttion: 高阶表格组件
 * @Author: yoke
 * @Date: 2021-10-29 14:06:26
 */

import { getObjectisNull, tableKey } from "@/utils/utils";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import type { ProTableProps } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { ConfigProvider, Menu, Space, Typography, Button, Tooltip } from "antd";
import classNames from "classnames";
import { Item } from "rc-menu";
import styles from "./index.module.less";
import {
  forwardRef,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Ybutton from "../Ybutton";

const { Text } = Typography;

interface YtableProps<T> extends ProTableProps<T, any, any> {
  renderEmpty?: ReactNode[];
  onDetails?: (item: T) => void;
  onDeletes?: (item: T) => void;
  onEdits?: (item: T) => void;
  onStatus?: (item: T) => void;
  onDownloads?: (item: T) => void;
  rowSelection?: (item: T) => void | Boolean;
  params?: T;
  total?: number;
  summaryOption?: any[];
  summaryData?: any[];
  summary?: any;
}

export const customizeRenderEmptynull = () => (
  <div className={styles.empty}>
    <div className={styles.noresult}></div>
    <span>暂无数据</span>
  </div>
);

export const customizeRenderEmptySearch = () => (
  <div className={styles.empty}>
    <div className={styles.noresult}></div>
    <span>搜索的内容无结果，请更换搜索内容</span>
  </div>
);

const Ytable =
  (WrapperComponent: any) => (props: YtableProps<any>, ref: any) => {
    const {
      params = {},
      renderEmpty,
      columns,
      pagination = {},
      total = 0,
      summaryOption,
      summaryData,
      summary,
      onDetails,
      onDeletes,
      onRow,
      onEdits,
      onStatus,
      onDownloads,
      rowSelection = false,
    } = props;
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    // 为了设置序号
    const actionRef = useRef();
    // useEffect(() => {}, [total]);
    // 修改columns
    const columnsUpdate = columns?.map((el: any) => {
      if (el.dataIndex === "operAtion---yoke") {
        return {
          align: "center",
          className: "operation",
          render: (_: any, item: any) => {
            return (
              <div className={styles.class}>
                {
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    onClick={() => {
                      onDetail(item);
                    }}
                  >
                    查看
                  </Ybutton>
                }
                {/***
                 * 后续添加了编辑和 下载按钮 edit=ture为不显示编辑
                 *  download=ture 为显示下载按钮
                 */}
                {!el.edit && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    onClick={() => {
                      onEdit(item);
                    }}
                  >
                    编辑
                  </Ybutton>
                )}
                {el.download && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    onClick={() => {
                      onDownload(item);
                    }}
                  >
                    下载
                  </Ybutton>
                )}
                {el.status && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    onClick={() => {
                      onstatus(item);
                    }}
                  >
                    状态
                  </Ybutton>
                )}
                {!el.delete && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    onClick={() => {
                      onDelete(item);
                    }}
                  >
                    删除
                  </Ybutton>
                )}

                {/* {el?.option?.length ? (
                  <Dropdown
                    overlay={Menu}
                    destroyPopupOnHide={true}
                    placement="bottomRight"
                    overlayStyle={{ minWidth: 100, padding: '0 10px' }}
                  >
                    <EllipsisOutlined className={styles.icon} rotate={90} />
                  </Dropdown>
                ) : null} */}
              </div>
            );
          },
          ...el,
        };
      }
      if (el.dataIndex === "operAtion---sort") {
        return {
          align: "center",
          className: "operation",
          render: (_: any, item: any, index: any) => {
            return (
              <div className={styles.class}>
                {!el.isDetail && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    disabled={item.orderIndex === 1}
                    onClick={() => {
                      onDetail(item);
                    }}
                  >
                    <ArrowUpOutlined />
                  </Ybutton>
                )}
                {!el.isDetail && (
                  <Ybutton
                    className={styles.see}
                    type="y-edit"
                    disabled={item.orderIndex === total}
                    onClick={() => {
                      onDetail(item);
                    }}
                  >
                    <ArrowDownOutlined />
                  </Ybutton>
                )}
              </div>
            );
          },
          ...el,
        };
      }
      return {
        align: "center",
        ellipsis: false,
        ...el,
        className: classNames([el.className, "operation"]),
        render: Object(el).hasOwnProperty("render")
          ? (e, list, index, page) => el?.render?.(e, list, index, page, data)
          : (e, list, index, page) => (
              <Tooltip title={e}>
                <span>{e}</span>
              </Tooltip>
            ),
      };
    });

    /**
     * 点击自定义菜单触发
     * @param index
     * @param item
     */
    const onDelete = (item: any) => {
      onDeletes?.(item);
    };
    const onstatus = (item: any) => {
      onStatus?.(item);
    };

    /**
     * 点击查看触发
     */
    const onDetail = (item: any) => {
      onDetails?.(item);
    };
    /**
     * 点击查看触发
     */
    const onEdit = (item: any) => {
      onEdits?.(item);
    };
    const onDownload = (item: any) => {
      onDownloads?.(item);
    };

    const renderSummary = () => {
      if (!summaryOption) {
        return false;
      } else {
        return (
          <WrapperComponent.Summary fixed>
            {summaryOption.map((el, index) => {
              return (
                <WrapperComponent.Summary.Row
                  className={
                    (index + data.length) % 2 == 0 ? styles.even : styles.odd
                  }
                >
                  {el.map((item, i) => {
                    if (i === 0) {
                      return (
                        <WrapperComponent.Summary.Cell
                          index={0}
                          colSpan={2}
                          className={styles.text_align_left}
                        >
                          {item.title}
                        </WrapperComponent.Summary.Cell>
                      );
                    } else {
                      return (
                        <WrapperComponent.Summary.Cell
                          index={i + 1}
                          className={styles.text_align_center}
                        >
                          {summaryData[index][item.dataIndex]}
                        </WrapperComponent.Summary.Cell>
                      );
                    }
                  })}
                </WrapperComponent.Summary.Row>
              );
            })}
          </WrapperComponent.Summary>
          // <WrapperComponent.Summary.Row>
          //     <WrapperComponent.Summary.Cell index={0} colSpan={2}>
          //         Summary
          //     </WrapperComponent.Summary.Cell>
          //     <WrapperComponent.Summary.Cell index={2}>This is a summary content</WrapperComponent.Summary.Cell>
          // </WrapperComponent.Summary.Row>
        );
      }
    };
    /**
     * 监听params的值使页面分页为第一页
     */
    useEffect(() => {
      if (Object?.keys(params)?.length) {
        actionRef?.current?.setPageInfo({
          current: 1,
        });
      }
    }, [params]);
    const onShowSizeChange = (current, pageSize) => {
      setPageSize(pageSize);
      actionRef?.current?.setPageInfo({
        pageSize: pageSize,
      });
    };
    return (
      <div className={styles.table}>
        <ConfigProvider
          renderEmpty={
            renderEmpty
              ? renderEmpty[!getObjectisNull(params) ? 0 : 1]
              : !getObjectisNull(params)
              ? customizeRenderEmptynull
              : customizeRenderEmptySearch
          }
        >
          <WrapperComponent
            rowSelection={rowSelection}
            actionRef={actionRef}
            ref={ref}
            search={false}
            options={false}
            {...props}
            columns={columnsUpdate}
            postData={(data) => {
              // 为表格添加key值

              const { current, pageSize } = actionRef?.current?.pageInfo ?? {
                current: 1,
                pageSize: 10,
              };
              tableKey(data, current, pageSize);
              setData(data);
              return data;
            }}
            onRow={(record, index) => onRow?.(record, index, data)}
            defaultSize="large"
            pagination={
              pagination == false
                ? false
                : {
                    showQuickJumper: {
                      goButton: (
                        <Button type="primary" style={{ marginLeft: "20px" }}>
                          确定
                        </Button>
                      ),
                    },
                    showSizeChanger: true,
                    hideOnSinglePage: !!(
                      data?.length <= 10 &&
                      actionRef?.current?.pageInfo?.current === 1
                    ),
                    responsive: true,
                    position: ["bottomCenter"],
                    showTotal: (total, range) => `共  ${total} 条`,
                    onShowSizeChange: onShowSizeChange,
                    ...pagination,
                    pageSize: pageSize,
                  }
            }
            summary={summary}
            // summary={() => (
            //     <WrapperComponent.Summary fixed>
            //         <WrapperComponent.Summary.Row>
            //             <WrapperComponent.Summary.Cell index={0} colSpan={2}>
            //                 Summary
            //             </WrapperComponent.Summary.Cell>
            //             <WrapperComponent.Summary.Cell index={2}>This is a summary content</WrapperComponent.Summary.Cell>
            //         </WrapperComponent.Summary.Row>
            //     </WrapperComponent.Summary>
            // )}
            // rowClassName={(record, index) => (index % 2 == 0 ? styles.even : styles.odd)}
            rowClassName={(record, index) => styles.even}
          />
        </ConfigProvider>
      </div>
    );
  };
export default memo(forwardRef(Ytable(ProTable)), () => false);
