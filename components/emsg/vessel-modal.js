import Button from 'components/common/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import StaticTable from 'src/base-components/datatable/static-table'
import Widget from 'src/base-components/role/widget'

const VesselsModal = ({ onCancel, data }) => {
  const dispatch = useDispatch()

  const columns = [
    /*{ Header: 'ID', accessor: 'vesselId'},*/
    { Header: 'Type', accessor: 'type' },
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'TEU', accessor: 'teu' }
  ]

  return (
    <>
      <Widget>
        <StaticTable
          columns={columns}
          data={data}
        />
      </Widget>
    </>
  )
}

export default VesselsModal
