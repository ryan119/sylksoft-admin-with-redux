import Button from 'components/common/Button'
import { searchVesselByName } from 'components/ship/action'
import { some } from 'lodash'
import React, { useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import StaticTable from 'src/base-components/datatable/static-table'
import Widget from 'src/base-components/role/widget'
import Spinner from 'src/base-components/spinner'

const SearchVesselModal = ({ onCancel, onSelected }) => {
  const dispatch = useDispatch()
  const columns = [
    { Header: 'Type', accessor: 'type' },
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: '操作', accessor: 'actions' }
  ]

  const actionsOfList = [
    {
      index: 'select',
      func: (item) => onSelected(item)
    }
  ]

  const vesselNameRef = useRef('')

  const { vessels, loading } = useSelector((state) => {
    return {
      vessels: state.ship.get('vessels')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)

  const searchVessel = () => {
    console.log('ref: ', vesselNameRef.current.value)
    const vesselName = vesselNameRef.current.value
    dispatch(searchVesselByName({ vesselName }))
  }

  return (
    <>
      <Widget>
        <Spinner isLoading={loading} />


        <div className='form-element form-element-inline'>
          <div className='form-label text-base'>Vessel Name</div>
          <input
            ref={vesselNameRef}
            name='name'
            type='text'
            className='form-input'
            placeholder='Enter something...'
          />
          <div className='form-hint'>
            <Button color='primary' label='查詢' onClick={() => searchVessel()} />
          </div>
        </div>

        <div className='mb-1 mt-6 text-base font-bold'>查詢結果：</div>

        <StaticTable
          columns={columns}
          data={vessels}
          actionsOfList={actionsOfList}
        >
          <button
            id='select'
            type='button'
            className='btn btn-default bg-teal-500 hover:bg-teal-600 text-white btn-rounded'>
            選取
          </button>
        </StaticTable>


        <div className='flex justify-center pt-2'>
          <Button color='gray' label='關閉' onClick={() => onCancel()} />
        </div>
      </Widget>
    </>
  )
}

export default SearchVesselModal
