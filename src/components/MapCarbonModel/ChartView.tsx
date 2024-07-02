import ChartView from "../ChartView";
import * as echarts from 'echarts/core';
type ChartViewProps = {
    total: number;
    name: string;
    unit: string;
    value: any;
}

const ChartView1 = (props: ChartViewProps) => {
    const { total, name, unit, value } = props;

    let rate = Number(((value / total) * 100).toFixed(1)) || 0;


    const option = {
        title: [
            {
                text: `{a|${name}}`,
                show: true,
                x: 'center',
                y: '10%',
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 10,
                            color: '#BFD1FB',
                            fontFamily: '优设标题黑',
                        },
                    },
                },
            },
            {
                text: `{b|${(rate ?? 0) + '%'}}`,
                show: true,
                x: 'center',
                y: '24%',
                textStyle: {
                    rich: {
                        b: {
                            fontSize: 14,
                            color: '#BFD1FB',
                            fontFamily: '优设标题黑',
                        },
                    },
                },
            },
            {
                text: `{b|${value ?? 0}}`,
                show: true,
                x: 'center',
                y: '55%',
                textStyle: {
                    rich: {
                        b: {
                            fontSize: 16,
                            color: '#BFD1FB',
                            fontFamily: '优设标题黑',
                            textShadowColor: '#3076FF',
                            textShadowBlur: 10,
                            textShadowOffsetX: 0,
                            textShadowOffsetY: 3,
                        },
                    },
                },
            },
            {
                text: `{b|${unit}}`,
                show: true,
                x: 'center',
                y: '70%',
                textStyle: {
                    rich: {
                        b: {
                            fontSize: 12,
                            color: '#BFD1FB',
                            fontFamily: '优设标题黑',
                            textShadowColor: '#3076FF',
                            textShadowBlur: 10,
                            textShadowOffsetX: 0,
                            textShadowOffsetY: 3,
                        },
                    },
                },
            },
        ],
        polar: {
            center: ['50%', '35%'],
            radius: ['55%', '70%'],
        },
        grid: {
            top: 0,
            left: 0,
        },
        angleAxis: {
            max: total,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                name: '',
                type: 'bar',
                roundCap: true,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(19, 84, 146, .4)',
                },
                data: [value],
                coordinateSystem: 'polar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#005DCF',
                            },
                            {
                                offset: 1,
                                color: '#00CCFF',
                            },
                        ]),
                    },
                },
            },

        ],
    };

    return <ChartView style={{ width: 60, height: 77 }} option={option} />
}
export default ChartView1