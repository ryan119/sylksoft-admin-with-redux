import { exportEvData, updateRptEvDatasets } from 'components/report/action'
import HistoryRecord from 'components/report/history-records'
import MemoLineChart from 'components/report/memo-line-chart'
import EvReportSearch from 'components/report/search/ev-search'
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

const EvReport = () => {
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
        text: '預估價趨勢圖',
        font: { size: '20px' }
      },
      zoom: defaultZoom
    },
    scales: getDefaultScales(datasets.labels.length)
  }

  const { evDataset, loading } = useSelector((state) => {
    return {
      evDataset: state.reportMgmt.get('evDataset').toJS(),
      loading: state.common.get('loading')
    }
  })

  //const chartRef = React.useRef(null);

  useEffect(() => {
    if (evDataset.length === 0) {
      setDatasets({ labels: [], datasets: [] })
    }

    if (evDataset.length > 0) {
      const data = convertDatasets(evDataset)
      setDatasets(data)
    }

  }, [evDataset.length])

  //console.log('evDataset: ', evDataset)

  const exportData = (idx) => {
    const criteria = evDataset[idx].criteria
    const cb = (data) => {
      saveAs(data, `預估價趨勢報表-${formatDatetimePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportEvData(criteria, cb))
  }
  const LineChart = dynamic(() => import('components/report/line-chart'), {ssr: false})
  return (
    <>
      <SectionTitle subtitle='預估價趨勢圖' />
      <Spinner isLoading={loading} />
      <Widget searchForm={<EvReportSearch />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <HistoryRecord kind='evDataset' updateDataset={updateRptEvDatasets} exportData={exportData} />
            {evDataset?.length > 0 ? (
              /*<LineChart options={options} data={datasets} />*/
              <MemoLineChart options={options} data={datasets} />
            ) : undefined}

            <TableRecord data={evDataset} />
          </div>
        </div>
      </Widget>
    </>
  )
}

export default EvReport
