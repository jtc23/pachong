/*
 *@description:
 * @author wayne
 * @date 2022-07-05 11:19
*/
import { forEach, cloneDeep, isEqual, findIndex, map } from 'lodash-es';


type BarAndLneOptionType = {
  titleConfig?: { show: boolean, text: string }, //title的配置
  toolTipsConfig?: { show: boolean, formatter: (seriesItem: any) => string }, //tips的配置
  xField: string, //第一维度的字段
  yField: string, //度量的字段
  colorField?: string, //第二维度的字段
  data: { xField: string | number, yField: string | number, colorField?: string | number }, //数据
  stack?: boolean, // 是否堆叠 柱状图和线图有
  color?: string[], //主题色的配置,
}



const COLORS = ['#5087EC', '#B0E9A9', '#6FABF8', '#6DC3B4', '#FCBA6F'];

export const ShowType = {
  histogramChart: 'HISTORGRAM_CHART', //柱状图
  lineChart: 'LINE_CHART', //线图
  barChart: 'BAR_CHART', //条形图
  pieChart: 'PIE_CHART', //饼图
}


const createHistogramAndLineOption = (showType: string, option: BarAndLneOptionType) => {

  const { titleConfig, toolTipsConfig, xField, yField, colorField, data, stack, color } = option

  const InitialOption = {
    grid: {
      left: '3%',
      right: '3%',
      top: '12%',
      bottom: '10%',
      containLabel: true
    },
    title: {
      show: titleConfig?.show || false,
      text: titleConfig?.text,
      textStyle: {
        color: 'rgba(16, 16, 16, .3)',
        fontSize: 12,
      },
      padding: [0, 10],
    },
    color: color ? color : COLORS,
    legend: {
      top: 0,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const target = params[0];
        const str = map(params, item => `<div>${item.marker}数据:<span>${item.value}</span></div>`).join('');
        return (
          `<div>
                <div>${target.axisValueLabel}</div>
                ${str}
           </div>`
        )
      }
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        fontSize: 12,
        color: `rgba(16, 16, 16, .3)`,
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: `rgba(16, 16, 16, .3)`,
      }
    },
    series: []
  };

  const InitSeriesItem = {
    data: [],
    // eslint-disable-next-line
    type: isEqual(showType, ShowType.lineChart) ? 'line' : 'bar',
    smooth: true
  };

  // @ts-ignore
  const dimensions = [], measures = [], secondDimensions = [], series = [];
  if (xField && yField && !colorField) { //一维度一度量
    forEach(data, item => {
      const dimensionValue = item?.[xField], measureValue = item?.[yField];
      // eslint-disable-next-line
      dimensionValue && dimensions.push(dimensionValue);
      // eslint-disable-next-line
      measureValue && measures.push(measureValue);
    })
    // @ts-ignore
    InitSeriesItem.data = measures;
    // @ts-ignore
    series.push(InitSeriesItem);
  } else if (xField && yField && colorField) {
    forEach(data, item => {
      const colorValue = item?.[colorField];
      if (colorValue && secondDimensions.indexOf(colorValue) === -1) {
        secondDimensions.push(colorValue);
      }
    })

    forEach(secondDimensions, item => {
      series.push({
        ...cloneDeep(InitSeriesItem),
        name: item,
        stack: stack ? 1 : 0
      })
    })

    forEach(data, item => {
      const dimensionValue = item?.[xField], measureValue = item?.[yField], secondDimensionValue = item?.[colorField];

      if (dimensionValue && dimensions.indexOf(dimensionValue) === -1) {
        dimensions.push(dimensionValue);
      }

      const seriesIndex = findIndex(series, l => isEqual(l.name, secondDimensionValue));
      series?.[seriesIndex]?.data?.push(measureValue);
    })

  }


  // @ts-ignore
  InitialOption.xAxis.data = dimensions;
  // @ts-ignore
  InitialOption.series = series;

  return InitialOption;

};



type PieOption = {
  color?: string[],
  data: { name: string, value: number }[]
}

const createPieOption = (option: PieOption): object => {

  const { color, data } = option;

  const InitialOption = {
    tooltip: {
      show: true
    },
    color: color ? color : COLORS,
    legend: {
      top: 0,
      left: 'center'
    },
    label: {
      show: true,
      color: '#101010',
      // fontSize: 14,
      formatter: (info: any) => {
        return `${info.name}: ${info.percent}%`
      }
    },
    labelLine: {
      length: '2%', //第一段线长
      length2: '2%', //第二段线长
      maxSurfaceAngle: 90, //最大倾斜角度
      minTurnAngle: 90,
      smooth: 0.03,
      lineStyle: {
        width: 1,
        opacity: 0.6,
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 2,
          borderColor: '#fff',
          // borderWidth: 2
        },
        data: data
      }
    ]
  };

  return InitialOption;
}


export const getChartOption = (showType: string, option: any): any => {

  switch (showType) {
    case ShowType.lineChart:
    case ShowType.histogramChart:
      return createHistogramAndLineOption(showType, option);
    case ShowType.pieChart:
      return createPieOption(option);
    default:
      return null;
  }
}
