import Button from 'components/common/Button'
import {
  createEstValuation,
  deleteEstValuation,
  getVesselEstValuationRecords,
  updateEstValuation
} from 'components/ship/action'
import ValuationForm from 'components/ship/estimate/valuation-form'
import ShipInfo from 'components/ship/ship-info'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import Modal from 'src/base-components/modal/index2'
import Datatable from 'src/base-components/react-table'
import Widget from 'src/base-components/role/widget'
import { formatDatePatternDash, formatDatetimePatternDash } from 'src/functions/date-format'
import { formatNumber } from 'src/functions/numbers'
import { confirmDelete } from 'src/functions/page-alert'

const EstimateList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const vesselId = router.query.vesselId
  const { loading } = useSelector((state) => {
    return {
      loading: state.common.get('loading')
    }
  }, shallowEqual)

  const columns = [
    //{ Header: '功能', accessor: 'actions' },
    { Header: 'Est. Valuation(US $M)', accessor: 'estValue', Cell: (v) => formatNumber(v.value) },
    { Header: 'Date', accessor: 'estDate', Cell: (v) => formatDatePatternDash(v.value) },
    { Header: '新增人', accessor: 'creator' },
    { Header: '新增時間', accessor: 'createTime', Cell: (v) => formatDatetimePatternDash(v.value) },
    { Header: 'ID', accessor: 'evId' }
  ]

  const _onDelete = (value) => {
    const postData = { ids: [value.evId] }
    confirmDelete(() => {
      dispatch(deleteEstValuation(postData, vesselId))
    })
  }

  const actionsOfList = [
    {
      index: 'delete',
      func: _onDelete
    },
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]
  const [openModal, setOpenModal] = useState(false)
  const [mode, setMode] = useState('add')
  const [editData, setEditData] = useState()

  const _onEdit = (editData) => {
    console.log('editData: ', editData)
    setMode('edit')
    setEditData(editData)
    show()
  }

  const handleCreate = (values) => {
    const postData = { ...values, vesselId }
    const cb = () => {
      hide()
      toast.success(COMMON_MSG_MAP['createSuccess'])
    }
    dispatch(createEstValuation(postData, cb))
  }

  const handleUpdate = (values) => {
    const postData = { ...values, vesselId }
    const cb = () => {
      hide()
      toast.success('更新成功')
    }
    dispatch(updateEstValuation(postData, cb))
  }


  const hide = () => {
    setEditData(null)
    setOpenModal(false)
  }

  const show = () => {
    setOpenModal(true)
  }

  const add = () => {
    setMode('add')
    show()
  }

  const renderBackToList = () => {
    return (
      <Button color='gray' label='回列表' onClick={() => {
        if (isNaN(router.query.tab)) {
          router.push('/ship/list')
        } else {
          router.back()
        }
      }} />
    )
  }

  const right = (
    <>
      <Button color='primary' label='新增' onClick={() => add()} />
      <Modal
        body={
          <ValuationForm
            mode={mode}
            data={editData}
            onSubmit={mode === 'add' ? handleCreate : handleUpdate}
            onCancel={hide}
          />
        }
        title={mode === 'add' ? '新增預估價' : '編輯預估價'}
        open={openModal}
        setOpen={setOpenModal}
        withFooter={false}
      />
    </>
  )

  const evRecords = useSelector((state) => state.ship.get('evRecords')?.toJS(), shallowEqual)
  useEffect(() => {
    dispatch(getVesselEstValuationRecords(vesselId))
  }, [vesselId])

  return (
    <>
      <ShipInfo data={omit(evRecords, ['list'])}/>

      <Widget title='' description='' right={right}>
        <div className='flex flex-col w-full p-4'>
          <div className='overflow-x-scroll lg:overflow-hidden'>
            <Datatable
              isLoading={loading}
              columns={columns}
              actionsOfList={actionsOfList}
              data={evRecords?.list ?? []}
              indexId='evId'
              hiddenColumns={['evId']}
              //setRowSelect={setRowSelect}
              //selectedRowIds={rowSelectIds}
            >
              <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <FiEdit size={18} />
              </div>
              <div id='delete' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <FiTrash2 size={18} />
              </div>
            </Datatable>
          </div>

          <div className='flex justify-center mt-6'>
            {renderBackToList()}
          </div>

        </div>
      </Widget>
    </>
  )
}

export default EstimateList
