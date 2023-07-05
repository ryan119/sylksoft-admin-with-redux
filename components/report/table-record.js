
import MemoRecord from 'components/report/memo-record'
import React from 'react'
import Datatable from 'src/base-components/react-table'
import { DefaultTabs } from 'src/base-components/tabs'
import { formatDatePatternDash } from 'src/functions/date-format'
import { map, remove } from 'lodash'
import { formatNumber } from 'src/functions/numbers'

export const Record = ({ data = [] }) => {

  const columns = [
    { Header: 'TYPE', accessor: 'type' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: 'Date', accessor: 'date'},
    { Header: 'Average Price', accessor: 'price', Cell: v => formatNumber(v.value) }
  ]

  return (
    <Datatable
      disableFunc={true}
      columns={columns}
      data={data}
    >
    </Datatable>
  )
}

const TableRecord = ({data}) => {
  const tabs = map(data, (d, idx) => {
    return { index: idx, title: `查詢結果0${idx+1}`, active: true, content: <MemoRecord data={d.data} totalSize={data.length}/> }
  })

  return (
    <div className='flex flex-wrap mt-10 overflow-x-scroll'>
      <div className='w-full'>
        <DefaultTabs tabs={tabs} />
      </div>
    </div>
  )
}

export default TableRecord
