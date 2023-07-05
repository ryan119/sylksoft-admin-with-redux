import Button from 'components/common/Button'
import { searchVesselByName } from 'components/ship/action'
import { remove, some } from 'lodash'
import React, { useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import StaticTable from 'src/base-components/datatable/static-table'
import Widget from 'src/base-components/role/widget'
import Spinner from 'src/base-components/spinner'

const MatchVesselModal = ({ onCancel, onSubmit }) => {
  const dispatch = useDispatch()
  const columns = [
    { Header: 'Type', accessor: 'type' },
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: '操作', accessor: 'actions' }
  ]

  const [selectedVessel, setSelectedVessel] = useState([])


  const _onSelectedVessel = (item) => {
    if (!some(selectedVessel, item)) {
      const newVessels = selectedVessel.concat(item)
      setSelectedVessel(newVessels)
    }
  }

  console.log('selectedVessel: ', selectedVessel)
  const actionsOfList = [
    {
      index: 'select',
      func: (values) => _onSelectedVessel(values),
      checkDisable: (values) => _isDisabled(values)
    },
    {
      index: 'remove',
      func: (values) => _onRemoveVessel(values)
    }]

  const _onRemoveVessel = (item) => {
    const sVessel = [...selectedVessel]
    const vessels = remove(sVessel, (v) => v.vesselId === item.vesselId)
    setSelectedVessel(sVessel)
  }

  const _isDisabled = (item) => {
    return some(selectedVessel, item)
  }

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

  const handleAdd = () => {
    onSubmit(selectedVessel)
  }

  const doSearch = (e) => {
    if(e.keyCode === 13) {
      searchVessel()
    }
  }

  return (
    <>
      {/*<div className='flex flex-row items-center justify-center mb-4'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold'></div>
        </div>
      </div>*/}
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
              onKeyUp={doSearch}
            />
            <div className='form-hint'>
              <Button color='primary' label='查詢' onClick={() => searchVessel()}/>
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


          <div className='mb-1 mt-6 text-base font-bold'>已選取船舶：</div>
          <StaticTable
            columns={columns}
            data={selectedVessel ?? []}
            actionsOfList={actionsOfList}
          >
            <button
              id='remove'
              type='button'
              className='btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded'>
              移除
            </button>
          </StaticTable>

          <div className='flex justify-center pt-2'>
            <Button color='primary' label='確定新增' onClick={handleAdd}></Button>
            <Button color='gray' label='關閉' onClick={() => onCancel()} />
          </div>
      </Widget>
    </>
  )
}

export default MatchVesselModal
