import { exportEstData, updateRptEstDatasets } from 'components/report/action'
import HistoryRecord from 'components/report/history-records'
import MemoLineChart from 'components/report/memo-line-chart'
import EstReportSearch from 'components/report/search/est-search'
import TableRecord from 'components/report/table-record'
import { convertDatasets } from 'components/report/helper'
import { defaultZoom, getDefaultScales } from 'components/report/chart-options'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import Spinner from 'src/base-components/spinner'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { saveAs } from 'file-saver'

const EstReport = () => {
  const dispatch = useDispatch()
  const [datasets, setDatasets] = useState({ labels: [], datasets: [] })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: '船價推算趨勢圖',
        font: { size: '20px' }
      },
      zoom: defaultZoom
    },
    scales: getDefaultScales(datasets.labels.length)
  }

  const { estDataset, loading } = useSelector((state) => {
    return {
      estDataset: state.reportMgmt.get('estDataset').toJS(),
      loading: state.common.get('loading')
    }
  })

  //const chartRef = React.useRef(null);

  useEffect(() => {
    if (estDataset.length === 0) {
      setDatasets({ labels: [], datasets: [] })
    }

    if (estDataset.length > 0) {
      const data = convertDatasets(estDataset)
      setDatasets(data)
    }

  }, [estDataset.length])

//  console.log('estDataset: ', estDataset)
  const exportData = (idx) => {
    const criteria = estDataset[idx].criteria
    const cb = (data) => {
      saveAs(data, `船價推估趨勢報表-${formatDatetimePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportEstData(criteria, cb))
  }
  const LineChart = dynamic(() => import('components/report/line-chart'), {ssr: false})

  return (
    <>
      <SectionTitle subtitle='船價推算趨勢圖' />
      <Spinner isLoading={loading} />
      <Widget searchForm={<EstReportSearch />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <HistoryRecord kind='estDataset' updateDataset={updateRptEstDatasets} exportData={exportData}/>
            {estDataset?.length > 0 ? (
              /*<LineChart options={options} data={datasets} />*/
              <MemoLineChart options={options} data={datasets} />
            ) : undefined}

            <TableRecord data={estDataset} />
          </div>
        </div>
      </Widget>
    </>
  )
}

export default EstReport
