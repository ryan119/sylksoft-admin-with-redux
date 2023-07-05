import { exportDemolitionData, updateRptDemolitionDatasets } from 'components/report/action'
import { convertDatasets } from 'components/report/helper'
import HistoryRecord from 'components/report/history-records'
import MemoLineChart from 'components/report/memo-line-chart'
import DemolitionSearch from 'components/report/search/demolition-search'
import TableRecord from 'components/report/table-record'
import { defaultZoom, getDefaultScales } from 'components/report/chart-options'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import Spinner from 'src/base-components/spinner'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { saveAs } from 'file-saver'

const DemolitionReport = () => {
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
        text: '拆船價趨勢圖',
        font: { size: '20px' }
      },
      zoom: defaultZoom
    },
    scales: getDefaultScales(datasets.labels.length)
  }

  const { demolitionDataset, loading } = useSelector((state) => {
    return {
      demolitionDataset: state.reportMgmt.get('demolitionDataset').toJS(),
      loading: state.common.get('loading')
    }
  })

  //const chartRef = React.useRef(null);

  useEffect(() => {
    if (demolitionDataset.length === 0) {
      setDatasets({ labels: [], datasets: [] })
    }

    if (demolitionDataset.length > 0) {
      const data = convertDatasets(demolitionDataset)
      setDatasets(data)
    }

  }, [demolitionDataset.length])

//  console.log('demolitionDataset: ', demolitionDataset)
  const exportData = (idx) => {
    const criteria = demolitionDataset[idx].criteria
    const cb = (data) => {
      saveAs(data, `拆船價趨勢報表-${formatDatetimePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportDemolitionData(criteria, cb))
  }

  const LineChart = dynamic(() => import('components/report/line-chart'), {ssr: false})

  return (
    <>
      <SectionTitle subtitle='拆船價趨勢圖' />
      <Spinner isLoading={loading} />
      <Widget searchForm={<DemolitionSearch />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <HistoryRecord kind='demolitionDataset' updateDataset={updateRptDemolitionDatasets} exportData={exportData}/>
            {demolitionDataset?.length > 0 ? (
              /*<LineChart options={options} data={datasets} />*/
              <MemoLineChart options={options} data={datasets} />
            ) : undefined}

            <TableRecord data={demolitionDataset} />
          </div>
        </div>
      </Widget>
    </>
  )
}

export default DemolitionReport
