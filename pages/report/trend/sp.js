import { exportSpData, updateRptSpDatasets } from 'components/report/action'
import { defaultZoom, getDefaultScales } from 'components/report/chart-options'
import { convertDatasets } from 'components/report/helper'
import HistoryRecord from 'components/report/history-records'
import MemoLineChart from 'components/report/memo-line-chart'
import SpReportSearch from 'components/report/search/sp-search'
import TableRecord from 'components/report/table-record'
import { saveAs } from 'file-saver'
import { omit } from 'lodash'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import Spinner from 'src/base-components/spinner'
import { formatDatetimePatternDash } from 'src/functions/date-format'

const SpReport = () => {
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
        text: '成交價趨勢圖',
        font: { size: '20px' }
      },
      zoom: defaultZoom
    },
    scales: getDefaultScales(datasets.labels.length)
  }

  const { spDataset, loading } = useSelector((state) => {
    return {
      spDataset: state.reportMgmt.get('spDataset').toJS(),
      loading: state.common.get('loading')
    }
  },shallowEqual)

  useEffect(() => {
    if (spDataset.length === 0) {
      setDatasets({ labels: [], datasets: [] })
    }

    if (spDataset.length > 0) {
      const data = convertDatasets(spDataset)
      setDatasets(data)
    }
  }, [spDataset.length])

  //console.log('spDataset: ', spDataset)

  const exportData = (idx) => {
    const criteria = spDataset[idx].criteria
    console.log('criteria: ', idx, criteria)
    const cb = (data) => {
      saveAs(data, `成交價趨勢報表-${formatDatetimePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportSpData(criteria, cb))
  }

  return (
    <>
      <SectionTitle subtitle='成交價趨勢圖' />
      <Spinner isLoading={loading} />
      <Widget searchForm={<SpReportSearch />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll items-center'>
            <HistoryRecord kind='spDataset' updateDataset={updateRptSpDatasets} exportData={exportData} />
            {spDataset?.length > 0 ? (
              /*<Line options={options} data={datasets}/>*/
              <div className='pl-8 pr-8'>
                <MemoLineChart options={options} data={datasets} />
                {/*<LineChart options={options} data={datasets}/>*/}
              </div>
            ) : undefined}
            <TableRecord data={spDataset} />
          </div>
        </div>
      </Widget>
    </>
  )
}

export default SpReport

