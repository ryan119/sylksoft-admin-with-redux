import React from 'react'

import StaticTable from 'src/base-components/datatable/static-table'
import { formatNumber } from 'src/functions/numbers'

const ShipInfo = ({ data }) => {
  const basic = [
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'TEU', accessor: 'teu' }
  ]

  return (
    <StaticTable
      columns={basic}
      data={[{ ...data, dwt: formatNumber(data?.dwt) }]}
    />
  )
}

export default ShipInfo
