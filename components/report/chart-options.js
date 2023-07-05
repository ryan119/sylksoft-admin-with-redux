export function getDefaultScales(maxTicksLimit){
  return {
    x: {
        ticks: {
          //maxTicksLimit: maxTicksLimit,
          autoSkip: true,
          //padding:3
          //display:false
        },
      },
    y: {
      type: 'logarithmic',
      beginAtZero: true,
      ticks: {
        min: 0, // 最小刻度值
        max: 1000, // 最大刻度值
        callback: function(value, index, values) {
          //console.log('value, index, values: ', value, index, values)
          return value; // 刻度显示格式
        },
      },
      title: {
        display: true,
        text: 'US$ Million',
        color: '#0d9488',
        font: {
          //family: 'Times',
          size: 16,
          //style: 'normal',
          lineHeight: 1.2
        },
        min:5,
        padding: {top: 30, left: 0, right: 0, bottom: 0}
      }
    }
  }
}

export const defaultZoom = {
  limits: {
    x: {minRange:20},
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: 'x',
  },
  pan: {
    enabled: true,
    mode: 'x',
  }
}


