import dynamic from 'next/dynamic'
import React, { memo } from 'react'



const MemoLineChart = memo(function({ options, data }) {
    const LineChart = dynamic(() => import('components/report/line-chart'), { ssr: false })
    return (
      <LineChart options={options} data={data} />
    )
  }, (prevProps, nextProps) => {
    return prevProps.data.datasets.length === nextProps.data.datasets.length
  }
)
export default MemoLineChart