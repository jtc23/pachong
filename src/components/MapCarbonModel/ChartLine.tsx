import { useEffect, useState } from "react";
import ChartView from "../ChartView"
import { defaultEcahrtsOptionFn, hexToRgba } from "../ChartView/constat"
import * as echarts from 'echarts/core';
import { isEmpty } from "lodash-es";
type ChartLinePorps = {
    data: any;
    type: number
}

const ChartLine = (porps: ChartLinePorps) => {
    const { data, type } = porps
    const [option, setOption] = useState<any>({})
    useEffect(() => {
        if (!isEmpty(data)) {
            setOption(defaultEcahrtsOptionFn({
                xData: data?.time,
                legendData: [],
                seriesData: [
                    {
                        name: '总量',
                        type: 'line',
                        data: type === 1 ? data?.list : data?.list1,
                        barWidth: 15,
                        smooth: true,
                        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbolSize: 0,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [{
                                    offset: 0,
                                    color: hexToRgba('#23F2FF', 1)
                                },
                                {
                                    offset: 1,
                                    color: hexToRgba('#10C6FD', 0.5)
                                }]
                            )
                        }
                    }
                ]
            }, {
                'grid.top': '10%',
                'grid.left': '0%',
                'grid.right': '10%',
                'grid.bottom': '10%',
                'xAxis.axisLabel.textStyle.fontSize': 10,
            }))
        }
    }, [data])

    return <ChartView style={{ width: '100%', height: '100%' }} option={option} />
}
export default ChartLine