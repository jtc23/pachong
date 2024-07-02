import { calMax, calMin } from "@/utils/utils"
import { log } from "console"
import { set } from "lodash-es"

export const defaultEcahrtsOption = {
    grid: {
        top: 30,
        bottom: 20,
        left: 30,
        right: 0
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        show: true,
        textStyle: {
            color: '#fff'
        },
        top: -4,
        right: 0
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: "rgba(217, 217, 217, 0.2)",
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        name: '吨co2',
        nameTextStyle: {
            color: '#fff'
        }
    },
}

type EchartsOption = {
    xData?: string[],
    yData?: any[][],
    legendData?: any[],
    seriesData?: any[],
    unit?: string,
    extraYaxis?: boolean,
}
/**
 * 返回默认Echarts配置
 * @param data 
 * @returns 
 */
export const defaultEcahrtsOptionFn = (data: EchartsOption, setValueObj?: any) => {
    let options = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 30,
            bottom: 20,
            left: 30,
            right: 0,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            data: data.xData,
            axisLabel: {
                interval: 0,
                color: '#fff',
                textStyle: {
                    color: '#fff'
                },
                rotate:0,
                formatter: function (params: string) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 5; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }
                    } else {
                        newParamsName = params;
                    }
                    if (!data?.isFold) return params
                    return newParamsName;
                }
            },
        },
        legend: {
            show: true,
            textStyle: {
                color: '#fff'
            },
            // data: data.legendData,
            // top: -4,
            // left: "45%",
        },
        yAxis: [{
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: "rgba(217, 217, 217, 0.2)",
                }
            },
            data: data.yData,
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            name: data.unit,
            nameTextStyle: {
                color: '#fff'
            },


        },

        ],
        series: data.seriesData
    }
    for (let v in setValueObj) {
        set(options, v, setValueObj[v])
    }

    return options
}

/**
 * 返回默认Echarts配置
 * @param data 
 * @returns 
 */
export const renderEcahrtsDoubleYaxis = (data: EchartsOption, setValueObj?: any) => {
    const data1 = data?.yData[0];
    const data2 = data?.yData[1];
    const max1 = calMax(data1);
    const min1 = 0;
    const max2 = calMax(data2);
    const min2 = 0;

    let options = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 30,
            bottom: 20,
            left: 30,
            right: 0,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            data: data.xData,
            axisLabel: {
                interval: 0,
                color: '#fff',
                textStyle: {
                    color: '#fff'
                },
                formatter: function (params: string) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 5; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }
                    } else {
                        newParamsName = params;
                    }
                    if (!data?.isFold) return params
                    return newParamsName;
                }
            },
        },
        legend: {
            show: true,
            textStyle: {
                color: '#fff'
            },
            // data: data.legendData,
            top: -4,
            left: "45%",
        },
        yAxis: [{
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: "rgba(217, 217, 217, 0.2)",
                }
            },
            data: data.yData,
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            name: data.unit,
            nameTextStyle: {
                color: '#fff'
            },
            min: min1,
            max: max1,
            splitNumber: 5,
            interval: (max1 - min1) / 5,
        },
        {
            type: 'value',
            // splitLine: {
            //     lineStyle: {
            //         color: "rgba(217, 217, 217, 0.2)",
            //     }
            // },
            data: data.yData,
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            name: data.unit,
            nameTextStyle: {
                color: '#fff'
            },
            min: min2,
            max: max2,
            splitNumber: 5,
            interval: (max2 - min2) / 5,
        },
        ],
        series: data.seriesData
    }
    for (let v in setValueObj) {
        set(options, v, setValueObj[v])
    }

    return options
}

export const hexToRgba = (hex: string, opacity: any) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
            "0x" + hex.slice(3, 5)
        )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
}