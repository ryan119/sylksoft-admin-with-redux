import Button from 'components/common/Button'
import Ellipsis from 'components/common/ellipsis'
import { addEmsgMatch } from 'components/emsg/action'
import SearchVesselModal from 'components/enquiry/search-vessel-modal'
import { getVesselEmsgs, removeData, removeVesselEmsg, updateVesselEmsg } from 'components/ship/action'
import EmailForm from 'components/ship/emsg/email-form'
import MsgForm from 'components/ship/emsg/mesForm'
import ShipInfo from 'components/ship/ship-info'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Modal from 'src/base-components/modal/index2'
import Datatable from 'src/base-components/react-table'
import { Paginated } from 'src/base-components/react-table/paginated'
import Spinner from 'src/base-components/spinner'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { confirmDelete } from 'src/functions/page-alert'

const Index = () => {
  const router = useRouter()

  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const dispatch = useDispatch()
  const vesselId = router.query.vesselId

  const { loading, emsgInfo, vessels } = useSelector((state) => {
    return {
      loading: state.common.get('loading'),
      emsgInfo: state.ship.get('emsgInfo')?.toJS(),
      vessels: state.ship.get('vessels')?.toJS(),
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getVesselEmsgs(vesselId))
  }, [vesselId])

  const columns = [
    //{ Header: '功能', accessor: 'actions' },
    {
      Header: '電文主旨', accessor: 'subject', Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-[600px] w-48'>
            <span
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
              title={v.value}
              onClick={() => showMsgModal(v.row.values)}
            >{v.value}</span>
          </Ellipsis>
        )
      }
    },
    { Header: '寄件者', accessor: 'sender', Cell: (v) => <Ellipsis variants='lg:w-[500px] w-48'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: '收件時間', accessor: 'receiveTime', Cell: (v) => formatDatetimePatternDash(v.value) },
    { Header: 'id', accessor: 'id', isVisible: false }
  ]


  const [openMsgModal, setOpenMsgModal] = useState(false)
  const [emsgId, setEmsgId] = useState()

  const showMsgModal = (item) => {
    setEmsgId(item?.id)
    setOpenMsgModal(true)
  }

  const closeMsgModal = () => {
    setOpenMsgModal(false)
  }

  const _onDelete = (value) => {
    const postData = {
      vesselId,
      emsgId: value.id
    }
    console.log('postData: ', postData)
    const remove = () => {
      const cb = () => { dispatch(getVesselEmsgs(vesselId)) }
      dispatch(removeVesselEmsg(postData, cb))
    }
    confirmDelete(remove, '確定移除關聯?', '移除該筆資料與船舶之關聯')
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
    setMode('edit')
    setEditData(editData)
    show()
  }

  const hide = () => {
    setEditData(null)
    setOpenModal(false)
    dispatch(removeData('vessels'))
  }

  const show = (mode) => {
    setMode(mode)
    setOpenModal(true)
  }

  const onSubmit = (vessel) => {
    const postData = {
      emsgIds: [editData.id],
      vesselIds: [vessel.vesselId]
    }

    const removeData = {
      emsgId: editData.id,
      vesselId
    }

    const cb = () => {
      dispatch(getVesselEmsgs(vesselId))
      hide()
    }

    dispatch(updateVesselEmsg(postData, removeData , cb))
  }

  const right = (
    <>
      <Modal
        height={ vessels?.length > 10 ? 'h-full' : 'h-hit'}
        title='選擇船舶'
        body={<SearchVesselModal onCancel={hide} onSelected={onSubmit} />}
        open={openModal}
        setOpen={hide}
        withFooter={false}
        width='w-3/4'
      />
    </>
  )

  return (
    <>
      <ShipInfo data={omit(emsgInfo, ['emsgs'])} />
      {right}
      <div className='flex flex-col w-full'>
        <div className='overflow-x-scroll pb-2'>
          <Paginated
            isLoading={loading}
            data={emsgInfo?.emsgs ?? []}
            columns={columns}
            hiddenColumns={['id']}
            indexId='id'
            actionsOfList={actionsOfList}
          >
            <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiEdit size={18} />
            </div>
            <div id='delete' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiTrash2 size={18} />
            </div>
          </Paginated>
          {/*<Datatable
            pageIndex={0}
            pageSize={25}
            isLoading={loading}
            columns={columns}
            actionsOfList={actionsOfList}
            data={emsgInfo?.emsgs ?? []}
            indexId='id'
            hiddenColumns={['id']}
            //fixed={true}
          >
            <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiEdit size={18} />
            </div>
            <div id='delete' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiTrash2 size={18} />
            </div>
          </Datatable>*/}
        </div>

        <div className='flex justify-center mt-6'>
          <Button color='gray' label='回列表' onClick={() => router.push('/ship/list')} />
        </div>

        <Modal
          height={'h-full'}
          body={
            <EmailForm
              onCancel={closeMsgModal}
              emsgId={emsgId}
            />
          }
          title='電文紀錄內容'
          open={openMsgModal}
          setOpen={setOpenMsgModal}
          width='w-3/4'
        />
      </div>
    </>
  )
}

export default Index
