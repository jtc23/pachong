import { Col } from "antd"
import styles from "./index.module.less"
import { ProColumns } from "@ant-design/pro-components";
import SelectOptions from "./SelectOptions";
import InputTableColumns from "./InputTableColumns";
/*
 * @description: 大屏控制器数据
 * @author: Yoke
 * @Date: 2024-04-10 09:45:27
 */

type listOptionsRenderType = {
    title?: string;
    name?: string;
    render?: () => JSX.Element;
}

export const listOptionsRender: listOptionsRenderType[] = [
    {
        render: () => {
            return <Col span={24}>
                <div className={styles.title}>
                    电力消耗总量趋势（千瓦时）
                </div>
            </Col>
        }
    },
    {
        title: '2024年1月份',
        name: 'oneMonthValue'
    },
    {
        title: '2024年2月份',
        name: 'twoMonthValue'
    },
    {
        title: '2023年四季度',
        name: 'fourQuarterValue'
    },
    {
        title: '2023年三季度',
        name: 'threeQuarterValue'
    },
    {
        title: '2023年二季度',
        name: 'twoQuarterValue'
    },
    {
        title: '2023年一季度',
        name: 'oneQuarterValue'
    },
    {
        title: '2022年度数据',
        name: 'twoYearValue'
    },
    {
        title: '2021年度数据',
        name: 'oneYearValue'
    },
    {
        render: () => {
            return <Col span={24}>
                <div className={styles.title}>
                    当日设备异常（千瓦时）
                </div>
            </Col>
        }
    },
    {
        title: '三期自动化',
        name: 'oneValue'
    },
    {
        title: '三期冷却水',
        name: 'twoValue'
    },
    {
        title: '三期压机',
        name: 'threeValue'
    },
    {
        title: '三期A炉',
        name: 'fourValue'
    },
    {
        title: '三期B炉',
        name: 'fiveValue'
    },
    {
        title: '四期B炉',
        name: 'sixValue'
    },
    {
        title: '四期压机',
        name: 'sevenValue'
    },
    {
        title: '四期自动化',
        name: 'eigValue'
    },
    {
        title: '四期冷却水',
        name: 'nineValue'
    },
    {
        title: '四期A炉',
        name: 'tenValue'
    },
    {
        title: '五期冷却水',
        name: 'elevenValue'
    },
    {
        title: '五期B炉',
        name: 'twelve'
    },
    {
        title: '五期A炉',
        name: 'thirteenValue'
    },
    {
        title: '五期压机',
        name: 'fourteenValue'
    },
    {
        title: '五期自动化',
        name: 'fifteenValue'
    }
]

export type DataSourceType = {
    [key: string]: number;
};

export const numList = [
    "oneValue",
    "twoValue",
    "threeValue",
    "fourValue",
    "fiveValue",
    "sixValue",
    "sevenValue",
    "eightValue",
    "nineValue",
    "tenValue",
    "elevenValue",
    "twelveValue",
]

const list: ProColumns<DataSourceType>[] = numList?.map((key, index) => {
    return {
        title: `${index + 1}月份`,
        dataIndex: key,
        align: 'center',
        formItemProps: {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '此项是必填项',
                },
            ],
        },
        renderFormItem: (...rest) => {
            return <InputTableColumns {...rest} />
        },
        render: (dom, entity) => {
            return entity?.[key]! || '0'
        }
    };
});

export const columns: ProColumns<DataSourceType>[] = [
    {
        title: '年份',
        dataIndex: 'year',
        align: 'center',
        formItemProps: {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '此项是必填项',
                },
            ],
        },
        renderFormItem: (...rest) => {
            return <SelectOptions {...rest} />
        },
        render: (dom, entity) => {
            return entity?.year! + '年';
        }
    },
    ...list,
];