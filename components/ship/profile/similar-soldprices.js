import Button from 'components/common/Button'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import StaticTable from 'src/base-components/datatable/static-table'
import { formatDatePatternDash } from 'src/functions/date-format'

const SimilarSoldPrices = ({ onCancel }) => {
  const vesselProfile = useSelector(state => state.ship.get('vessel')?.toJS(), shallowEqual)
  const basic = [
    { Header: 'Type', accessor: 'type' },
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: 'Sold Price (US$ M)', accessor: 'soldPrice' },
    { Header: 'Date', accessor: 'soldDate' }
  ]

  const similarSoldPrices = vesselProfile?.similarSoldPrices?.map((c) => {
    return {
      ...c,
      soldDate: formatDatePatternDash(c.soldDate)
    }
  })
  return (
    <>
      <StaticTable columns={basic} data={similarSoldPrices} />
      {/*<div className='flex justify-center'>
        <Button color='gray' label='關閉' onClick={() => onCancel()} />
      </div>*/}
    </>
  )
}

export default SimilarSoldPrices
