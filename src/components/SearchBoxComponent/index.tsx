/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-29 09:33:42
 */

import { ECOInput } from "@/Hoc/TooltipInput";
import { ECOSelect } from "@/Hoc/TooltipSelect";
import Ybutton from "@/Hoc/Ybutton";
import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ProForm, { ProFormDateRangePicker } from "@ant-design/pro-form";
import { DatePicker, Space } from "antd";
import classNames from "classnames";
import React, {
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./index.module.less";
import { useEventListener } from "ahooks";
import { Row, Checkbox } from "antd";
import { find } from "lodash-es";
import { ProFormDatePicker } from "@ant-design/pro-components";
const items = [{ title: "1111", key: 1 }];
export type optionsType = {
  type: string;
  option?: {
    label: string;
    title?: string;
    value: string | number;
  }[];
  value?: string;
  placeholder?: string | string[];
  fieldProps?: any;
  tooltip?: boolean;
  style?: any;
  disabledDate?: any;
};

interface SearchBoxComponentPorps {
  options?: (() => optionsType[]) | optionsType[];
  onSearch?: (e: any) => void;
  searchProps?: {
    text: string;
    style?: any;
  };
  toolbar?: (ref: any, e: any, a: any) => any[];
  toolbarProps?: {
    text: string;
    icon?: any;
    style?: any;
  };
  onToolbar?: () => void;
  searchDomList?: (e: any) => any[];
  formRef?: any;
  size?: number;
  rootClass?: any;
  colomn?: any[];
  colomnKey?: any[];
  title?: any[];
  onFilterChange?: (type: boolean, key: string) => void;
  useFilter?: boolean;
  onValuesChange?: (changedvalue: any, values: any) => void;
  disabledDate?: (e: any) => void;
  show?: boolean;
}

const SearchBoxComponent: React.FC<SearchBoxComponentPorps> = (props) => {
  const ref = useRef<any>(null);
  const {
    options,
    searchProps,
    onSearch,
    toolbar,
    toolbarProps,
    onToolbar,
    searchDomList,
    size = 16,
    colomn,
    colomnKey,
    title,
    onFilterChange,
    useFilter = false,
    onValuesChange,
    disabledDate,
    show = true,
  } = props;
  let { formRef } = props;
  const [isload, setIsLoad] = useState(false);
  const [flag, setFlag] = useState(false);
  const [labels, setLabel] = useState<any[]>([]);
  // 查询
  const onClick = () => {
    // console.log(ref?.current?.getFieldsValue());

    onSearch?.(ref?.current?.getFieldsValue());
  };

  //按下enter键时查询
  useEventListener("keydown", (ev) => {
    if (ev.code === "Enter") {
      onClick();
    }
  });

  // 默认按钮状态
  const onClickEdit = () => {
    onToolbar?.();
  };

  /**
   * 默认按钮
   */
  const toolbarDom = useMemo(
    () => [
      <Ybutton
        type="primary"
        onClick={onClickEdit}
        icon={toolbarProps?.icon ?? ""}
      >
        {toolbarProps?.text || ""}
      </Ybutton>,
    ],
    [onToolbar]
  );

  /**
   * 查询
   */
  const searchDom = useMemo(
    () => [
      <Ybutton
        type="primary"
        onClick={onClick}
      //   icon={<SearchOutlined />}
      >
        {searchProps?.text || "查询"}
      </Ybutton>,
    ],
    [onSearch]
  );

  useImperativeHandle(formRef, () => {
    return ref.current;
  });

  useEffect(() => {
    setIsLoad(!isload);
  }, [options]);

  useEffect(() => {
    if (title && title?.length > 0) {
      setLabel(title);
    }
  }, [title]);
  return (
    <div
      className={classNames([styles.search, "search", props.rootClass ?? ""])}
    >
      <ProForm
        formRef={ref}
        layout="inline"
        submitter={false}
        onValuesChange={onValuesChange}
      >
        <Space size={size} className={styles.search_space}>
          <Space size={size}>
            {options?.map((el: optionsType, index: any) => (
              <React.Fragment key={index + "_id" + el.type}>
                {(() => {
                  switch (el?.type) {
                    case "input":
                      return (
                        <div>
                          <span className={styles.label}>
                            {el?.placeholder}:
                          </span>
                          <ProForm.Item name={el.value}>
                            <ECOInput
                              tooltip={el.tooltip}
                              fieldProps={{
                                style: {
                                  ...el.fieldProps,
                                  ...el.style,
                                },
                                ...el.fieldProps,
                              }}
                              placeholder={el.placeholder}
                            />
                          </ProForm.Item>
                        </div>
                      );

                    case "select":
                      return (
                        <div>
                          <span className={styles.label}>
                            {el?.placeholder}:
                          </span>
                          <ProForm.Item name={el.value}>
                            <ECOSelect
                              tooltip={el.tooltip}
                              options={el.option?.map((el) => ({
                                ...el,
                                label: el.title || el.label,
                              }))}
                              name={el.value}
                              fieldProps={{
                                style: {
                                  width: "200px",
                                  ...el.fieldProps,
                                  ...el.style,
                                },
                                ...el.fieldProps,
                              }}
                              placeholder={el.placeholder}
                            />
                          </ProForm.Item>
                        </div>
                      );

                    case "rangePicker":
                      return (
                        <div>
                          <span className={styles.label}>
                            {el?.placeholder}:
                          </span>
                          <ProFormDateRangePicker
                            name={el.value}
                            fieldProps={{
                              style: {
                                width: "350px",
                                ...el.fieldProps,
                                ...el.style,
                              },
                              disabledDate: el?.disabledDate,
                              ...el.fieldProps,
                            }}
                            placeholder={el.placeholder}
                          // placeholder={["开始时间", "结束时间"]}
                          />
                        </div>
                      );
                    case "datePicker":
                      return (
                        <div>
                          <span className={styles.label}>
                            {el?.placeholder}:
                          </span>
                          <ProFormDatePicker
                            // label={el.label}
                            name={el.value}
                            fieldProps={{
                              style: {
                                width: "200px",
                                ...el.fieldProps,
                                ...el.style,
                              },
                              disabledDate: el?.disabledDate,
                              ...el.fieldProps,
                            }}
                            placeholder={el.placeholder}
                          // onChange={(e) => {
                          //   onChangeState(e, el.value);
                          // }}
                          />
                        </div>
                      );
                    case "yearpicker":
                      return (
                        <div>
                          <span className={styles.label}>
                            {el?.placeholder}:
                          </span>
                          <ProForm.Item name={el.value}>
                            <DatePicker
                              // rules={[{ required: true, message: "请输入类型名称" }]}
                              {...el.fieldProps}
                              placeholder={el.placeholder}
                            // disabled={!!id}
                            />
                          </ProForm.Item>
                        </div>
                      );

                    default:
                      return <div />;
                  }
                })()}
              </React.Fragment>
            ))}
          </Space>
          <Space size={size}>
            {searchDomList?.(searchDom)?.map((el) => el) ||
              searchDom?.map((el, index) => (
                <React.Fragment key={index}>{el}</React.Fragment>
              ))}
          </Space>
        </Space>
      </ProForm>
      <Space
        size={size}
        style={{ marginLeft: "24px", position: "relative" }}
        className={styles.nogap}
      >
        {useFilter ? (
          <a
            onClick={(e) => {
              setFlag(!flag);
            }}
            style={{ marginLeft: 80, fontSize: 25, marginRight: "16px" }}
          >
            <SettingOutlined />
          </a>
        ) : null}

        {flag && (
          <div className={styles.setting}>
            {colomn?.map((item) => {
              // if (find(labels, els => els.key == item?.key)) {
              //     console.log(1111);

              //     return (
              //         <Row key={`NAME ${item.key}`}>
              //             <span>{find(labels, els => els.key == item?.key)?.label}</span>
              //         </Row>
              //     );
              // }
              if (!item?.setting) {
                if (find(labels, (els) => els.key == item?.key)) {
                  return (
                    <>
                      <Row key={`NAME_${item.key}`}>
                        <span>
                          {find(labels, (els) => els.key == item?.key)?.label}
                        </span>
                      </Row>
                      <Row key={`SELECT_${item.key}`}>
                        <Checkbox
                          checked={colomnKey?.indexOf(item.key) >= 0}
                          onChange={(e) => {
                            onFilterChange?.(e.target.checked, item?.key);
                          }}
                        >
                          {item.title}
                        </Checkbox>
                      </Row>
                    </>
                  );
                } else {
                  return (
                    <Row key={`SELECT_${item.key}`}>
                      <Checkbox
                        checked={colomnKey?.indexOf(item.key) >= 0}
                        onChange={(e) => {
                          onFilterChange?.(e.target.checked, item?.key);

                          // onChange(e, item);
                        }}
                      >
                        {item.title}
                      </Checkbox>
                    </Row>
                  );
                }
              }
            })}
          </div>
        )}
        {show ? (
          <Space>
            {toolbar?.(
              ref?.current?.getFieldFormatValue(),
              toolbarDom,
              ref?.current
            )?.map((el, index) => (
              <React.Fragment key={index}>{el}</React.Fragment>
            )) ||
              toolbarDom?.map((el, index) => (
                <React.Fragment key={index}>{el}</React.Fragment>
              ))}
          </Space>
        ) : null}
      </Space>
    </div>
  );
};
export default SearchBoxComponent;
