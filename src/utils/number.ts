import { PLACEHLOADSTYLE } from "@/constat";
import { find, set } from "lodash-es";


type Unit = '' | '万' | '亿';

type handleNumberUnitReturn = {
    value: number,
    unit: Unit
}

/**
 * @description: 处理数值单位 例如：1000 = 1000 10000 = 1万 100000 = 10万
 * @param {number} value
 * @return {*} {value: number, unit: string}
 */
export const handleNumberUnit = (value: number): handleNumberUnitReturn => {
    if (!value) return {
        value: 0,
        unit: ''
    };
    if (value < 10000) return {
        value,
        unit: ''
    };
    // 单位
    const units: Unit[] = ['', '万', '亿'];
    // 以10000为单位，向下取整
    const unit: number = Math.floor(Math.log10(Math.floor(value)) / 4);
    // 除以10000的n次方
    const num: number = value / Math.pow(10, unit * 4);

    return {
        value: num.toFixed(2),
        unit: units[unit]
    }
}


/**
 * 计算所占据的百分比
 * @param data 数据
 * @param name 名称
 * @return 百分比
 */
export const getPercent = (data: any[], name: string) => {
    let num = data?.reduce((prev, cur) => prev + (cur.value * 1), 0)
    let value = data?.find(el => el.name === name)?.value!
    // 计算百分比
    let percent = ((value / num) * 100).toFixed(2)

    return Number(percent) ?? 0
}

/**
 * 计算总量的百分比
 */
export const getPercentTotal = (data: any[], percent: number) => {
    // 计算总量的
    const clearance = data?.reduce((prev, cur) => prev + (cur.value * 1), 0) * percent ?? 0.01

    return clearance
}


/**
 * 计算总量
 */
export const getTotal = (data: any[], key: string = 'value') => {
    // 计算总量的
    const clearance = data?.reduce((prev, cur) => prev + (((cur[key] ?? 0) * 1)), 0)
    return clearance
}

/**
 * 设置echarts的title
 */
export const getChartTitle = (data: any) => {

    const {
        text = '',
        subtext = '',
    } = data

    return {
        text: `${text}%`,
        subtext: `${subtext}`,
        left: '19%',
        top: '34%',
        textAlign: 'center',
        textStyle: {
            color: '#43A9F6',
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: '优设标题黑',
        },
        subtextStyle: {
            color: '#fff',
            fontSize: 12,
            fontFamily: '优设标题黑',
        }
    }
}

/**
 * 多圈环形图配置方案
 * @param options {data: [], getValue: (name: string) => number, getTitle: (data: any) => any}
 * @param setValueObj
 */
export const getRingOption = (options: any, setValueObj?: any) => {

    let color = [
        "#43A9F6",
        "#0466FB",
        "#EDD380",
        "#07C9C6",
        "#E77E52"
    ];

    const {
        data,
        getValue,
        getTitle,
        getPercent,
    } = options;

    if (data?.filter((el: any) => el.value).length <= 0) {
        return {
            title: {
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: 'bold',
                    fontFamily: '优设标题黑',
                }
            }
        }
    }


    let option = {
        legend: {
            orient: 'horizontal',
            left: '36%',
            top: 'center',
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            selectedMode: false,
            formatter: function (name: string,) {
                return `${name} \n{total|${getValue(name)}% }`;
            },
            textStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [8, 0, 0, 0],
                width: 60,
                backgroundColor: 'transparent',
                rich: {
                    total: {
                        fontSize: 14,
                        textShadowColor: '#00E0FF',
                        textShadowBlur: 12,
                        textShadowOffsetX: -2,
                        textShadowOffsetY: 4,
                        padding: [4, 0, 0, 0],
                    }
                },
            },
            data: data?.map((el: any) => el.name),
        },
        color: color,
        tooltip: {
            show: true,
        },
        title: getTitle(),
        series: [
            {
                type: 'pie',
                radius: ['90%', '100%'],
                center: ['20%', '50%'],
                hoverAnimation: false,
                z: 10,
                label: {
                    show: false,
                },
                data: [
                    ...data?.map((el: any) => {
                        if (data?.length == 1) {
                            return [
                                {
                                    value: el.value,
                                    name: el.name,
                                }
                            ]
                        } else {
                            return [
                                {
                                    value: el.value,
                                    name: el.name,
                                },
                                {
                                    value: getPercent(),
                                    name: '',
                                    itemStyle: PLACEHLOADSTYLE,
                                    tooltip: {
                                        show: false,
                                    }
                                }
                            ]
                        }
                    }).flat(),
                ],
                labelLine: {
                    show: false,
                },
            },
            {
                type: 'pie',
                radius: ['80%', '90%'],
                center: ['20%', '50%'],
                hoverAnimation: false,
                label: {
                    show: false,
                },
                z: 10,
                data: [
                    ...data?.map((el: any) => {
                        if (data?.length == 1) {
                            return [
                                {
                                    value: el.value,
                                    name: el.name,
                                    itemStyle: {
                                        opacity: 0.4,
                                    },
                                }
                            ]
                        } else {
                            return [
                                {
                                    value: el.value,
                                    name: el.name,
                                },
                                {
                                    value: getPercent(),
                                    name: '',
                                    itemStyle: PLACEHLOADSTYLE,
                                    tooltip: {
                                        show: false,
                                    }
                                }
                            ]
                        }
                    }).flat(),
                ],
                labelLine: {
                    show: false,
                },
            }
        ],
    }

    for (let v in setValueObj) {
        set(option, v, setValueObj[v])
    }

    return option
}

/**
 * 监听echarts加载完成
 */
export const setChartTitle = (chart: any, data?: any) => {
    const option = data?.option!
    const getTitle = data?.getTitle!

    chart.on('mouseover', (params: any) => {
        if (params.data.name) {
            const { data } = chart.getOption()
            const obj = {
                ...chart.getOption(),
                ...option,
            }

            chart.setOption({
                ...obj,
                title: {
                    ...getTitle?.(params.data.name) ?? getChartTitle({
                        text: getPercent(data, params.data?.name),
                        subtext: params.data.name,
                    }),
                    top: obj.title?.[0]?.top,
                },
            }, true)
        }
    })
}

/**
 * 转换数值中的值并加上单位返回
 */

export const handleNumberUnitArray = (data: any[]) => {
    const newData = data?.map((el: any) => {
        const { value, unit } = handleNumberUnit(el)
        return {
            ...el,
            value: el,
            unit: unit,
        }
    })

    if (find(newData, (el: any) => el.unit)) {
        const unit = newData?.find((el: any) => el.unit)?.unit
        const arr = newData?.map((el: any) => handleNumberUnit1(el.value, unit))

        return {
            data: arr,
            unit: newData?.find((el: any) => el.unit)?.unit
        }
    }

    return {
        data: newData,
        unit: ''
    }
}

/**
 * @description: 处理数值单位 例如：1000 = 1000 10000 = 1万 100000 = 10万
 * @param {number} value
 * @return {*} {value: number, unit: string}
 */
export const handleNumberUnit1 = (value: number, unita: string) => {
    if (!value) return {
        value: 0,
        unit: ''
    };
    // 单位
    const units: any = {
        "万": Math.pow(10, 4),
        "亿": Math.pow(10, 8),
    };

    if (units[unita]) {
        const value1 = (value / units[unita]).toFixed(2)
        return {
            value: value1,
            unit: unita
        }
    }

    return {
        value: value,
        unit: unita
    }
}



const list = [
    {
        name: ">4000tce",
        color: "#FB532E",
    },
    {
        name: "≥2000tce≤4000tce",
        color: "#FEBC2F",
    },
    {
        name: "<2000tce",
        color: "#00FF0A",
    }
]

/**
 * 处理一个数组的区间值并返回值
 */
export const handleArraySection = (data: number[], key = 'tce') => {
    if (!data?.length) return [];
    const arr = data?.sort();
    const len = arr.length;
    const secondThird: number[] = arr.slice(Math.floor(len / 3), Math.floor(len * 2 / 3)).sort((a, b) => a - b);
    if (arr.length == 1) {
        const start = Math.floor(arr[0]);
        const startStr = start.toString().split('')[0];
        const num = (Number(startStr) + 1) * Math.pow(10, start.toString().length - 1)
        return [
            {
                name: `<${num}${key}`,
                color: "#00FF0A",
                min: num
            }
        ]
    }

    if (arr.length == 2) {
        const start = Math.floor(arr[0]);
        const end = Math.floor(arr?.at(-1)!);
        const startStr = start.toString().split('')[0];
        const endStr = end.toString().split('')[0];
        const startNum = (Number(startStr) + 1) * Math.pow(10, start.toString().length - 1)
        const endNum = (Number(endStr) + 1) * Math.pow(10, end.toString().length - 1)
        return [
            {
                name: `>${endNum}${key}`,
                color: "#FB532E",
                max: endNum
            },
            {
                name: `≥${startNum}${key}≤${endNum}${key}`,
                color: "#FEBC2F",
                min: startNum,
                max: endNum
            },
            {
                name: `<${startNum}${key}`,
                color: "#00FF0A",
                min: startNum
            }
        ]
    }

    if (secondThird.length >= 2) {
        const start = Math.floor(secondThird[0]);
        const end = Math.floor(secondThird?.at(-1)!);
        const startStr = start.toString().split('')[0];
        const endStr = end.toString().split('')[0];
        const startNum = (Number(startStr) + 1) * Math.pow(10, start.toString().length - 1)
        const endNum = (Number(endStr) + 1) * Math.pow(10, end.toString().length - 1);

        if (startNum == endNum) {
            return [
                {
                    name: `<${endNum}${key}`,
                    color: "#00FF0A",
                    min: endNum
                }
            ]
        }
        return [
            {
                name: `>${endNum}${key}`,
                color: "#FB532E",
                max: endNum
            },
            {
                name: `≥${startNum}${key}≤${endNum}${key}`,
                color: "#FEBC2F",
                min: startNum,
                max: endNum
            },
            {
                name: `<${startNum}${key}`,
                color: "#00FF0A",
                min: startNum
            }
        ]
    }

    return []
}

// 判断是否在一个区间之内
export const isBetWeenArr = (data: any[], key: string, arr: any[]) => {
    return data?.map(el => {
        const findItem = arr?.find((item: any) => {
            if (item.min && item.max) {
                return item.min <= el[key] && el[key] <= item.max
            } else if (item.min) {
                return item.min > el[key]
            } else if (item.max) {
                return el[key] > item.max
            }
        })

        return {
            ...el,
            color: findItem?.color
        }
    })
}

// 去掉小数点
export const handleNumber = (value: any) => {
    if (value > 0) {
        return Number(value).toFixed(0)
    }
    return value
}