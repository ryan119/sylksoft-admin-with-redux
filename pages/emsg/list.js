import { getActions } from 'components/common/action-helper'
import Ellipsis from 'components/common/ellipsis'
import { addEmsgMatch, deleteEmsg, resetEmsgCriteria, searchEmsg, setEmsgCriteria } from 'components/emsg/action'
import EmsgSearchForm from 'components/emsg/emsg-search-form'
import MatchVesselModal from 'components/emsg/match-vessel'
import VesselsModal from 'components/emsg/vessel-modal'
import { removeData, resetVesselCriteria, setVesselCriteria } from 'components/ship/action'
import EmailForm from 'components/ship/emsg/email-form'
import { head, map } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getEmsgMatchStatuses } from 'src/actions/common'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import Modal from 'src/base-components/modal/index2'
import Datatable from 'src/base-components/react-table'
import { getSortBy, updateCriteria } from 'src/base-components/react-table/constant'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import { formatDatetimePatternDash, getLastMonthFormat } from 'src/functions/date-format'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'

const List = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()
  //批次媒合
  const [openMatch, setOpenMatch] = useState(false)
  const showMatch = () => {
    if (selectedIds?.length > 0) {
      setOpenMatch(true)
    } else {
      alertWarningMessage('您尚未勾選電文')
    }
  }
  const hideMatch = () => {
    resetSelectedData()
    setOpenMatch(false)
    dispatch(removeData('vessels'))
  }
  const _onSubmit = (values) => {
    const vesselIds = map(values, v => v.vesselId)
    const emsgIds = map(selectedIds, (i) => i.emsgId)
    const postData = { emsgIds, vesselIds }
    const cb = () => {
      dispatch(searchEmsg())
      hideMatch()
    }
    dispatch(addEmsgMatch(postData, cb))
  }

  //電文內容
  const [openEmsg, setOpenEmsg] = useState(false)
  const [emsgInfo, setEmsgInfo] = useState()
  const showEmsg = (values) => {
    setEmsgInfo(values)
    setOpenEmsg(true)
  }
  const hideEmsg = () => {
    setEmsgInfo(null)
    setOpenEmsg(false)
  }
  //檢視媒合船舶
  const [openVessels, setOpenVessels] = useState(false)
  const [vessels, setVessels] = useState([])
  const showVessels = (values) => {
    setVessels(values)
    setOpenVessels(true)
  }
  const hideVessels = () => {
    setVessels(null)
    setOpenVessels(false)
  }

  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.emsgMgmt.get('searchResult')?.toJS(),
      criteria: state.emsgMgmt.get('criteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)


  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchEmsg())
    }
    dispatch(getEmsgMatchStatuses())
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setEmsgCriteria)
      dispatch(searchEmsg())
      resetSelectedData()
    }
  }, [])

  //記錄datatable裡的選取
  const [rowSelectIds, setRowSelectIds] = useState([])
  //prepared delete ids
  const [selectedIds, setSelectedIds] = useState([])

  /**
   * 選取Data時需做的動作，找出真實資料
   * @param ids
   */
  const setRowSelect = (ids) => {
    //console.log('rowIds: ', ids)
    const items = searchResult?.content?.filter((item, index) =>
      Object.keys(ids)
        .map((i) => parseInt(i, 10))
        .includes(index)
    )
    setRowSelectIds(ids)
    setSelectedIds(items)
  }

  const resetSelectedData = () => {
    setRowSelectIds([])
    setSelectedIds([])
  }

  const deleteSelectedIds = (url) => {
    if (selectedIds?.length > 0) {
      confirmDelete(() => {
        const cb = () => {
          resetSelectedData()
          dispatch(searchEmsg())
        }
        const ids = selectedIds.map((i) => i.emsgId)
        dispatch(deleteEmsg({ ids }, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }

  const handleAdd = (url) => {
    router.push(url)
  }

  const columns = [
    //{ Header: '功能', accessor: 'actions' },
    { Header: 'ID', accessor: 'emsgId', width: 100, fixed: true },
    {
      Header: '電文主旨', accessor: 'subject', width: 400, fixed: true, Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-72 w-48'>
            <span
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
              title={v.value}
              onClick={() => router.push(`/emsg/view/${v.row.original.emsgId}`)}
            >
              {v.value}</span>
          </Ellipsis>
        )
      },
    },
    { Header: '寄件者', accessor: 'sender', Cell: (v) => {
      return (
        <Ellipsis variants='lg:w-64 w-32'><span title={v.value}>{v.value}</span></Ellipsis>
      )
      }},
    { Header: '收件者', accessor: 'receiver' },
    { Header: '收件時間', accessor: 'receiveTime', Cell: (v) => formatDatetimePatternDash(v.value) },
    { Header: '配對結果', accessor: 'matchStatus', disableSortBy: true},
    {
      Header: '關聯船舶', accessor: 'viewVessel',disableSortBy: true, Cell: (v) => {
        return (
          <a
            href='#'
            className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
            onClick={() => showVessels(v.row.original.vessels)}
          >檢視</a>
        )
      }
    }
  ]

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]

  const _onEdit = (data) => {
    router.push(`/emsg/view/${data?.emsgId}`)
  }

  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='emsg_mgmt_match'
        onClick={showMatch}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />
      <ActionButton
        funcId='emsg_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )
  console.log('getLastMonth: ', getLastMonthFormat())
  return (
    <>
      <SectionTitle subtitle='電文記錄列表' />
      <Widget right={right} searchForm={<EmsgSearchForm />}>
        {/*<div className='flex flex-col w-full'>*/}
          <div className='pt-2 overflow-x-scroll'>
            <Datatable
              actionsOfList={actionsOfList}
              isLoading={loading}
              columns={columns}
              data={searchResult?.content ?? []}
              pageCount={searchResult?.totalPages}
              pageIndex={criteria?.page}
              pageSize={criteria?.size}
              fetchData={fetchData}
              indexId='emsgId'
              hiddenColumns={['emsgId']}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
              sortBy={getSortBy(criteria)}
              disableFunc={true}
            >
              <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <FiEdit size={18} />
              </div>
            </Datatable>
          </div>
        {/*</div>*/}
      </Widget>
      <Modal
        title='批次媒合船舶'
        body={<MatchVesselModal onCancel={hideMatch} onSubmit={_onSubmit} />}
        open={openMatch}
        setOpen={hideMatch}
        withFooter={false}
        width='w-3/4'
        height='h-full'
      />
      <Modal
        height='h-full'
        title='檢視船舶'
        body={<VesselsModal onCancel={hideVessels} data={vessels ?? []} />}
        open={openVessels}
        setOpen={setOpenVessels}
        withFooter={true}
        width='w-3/4'
      />
      <Modal
        title='電文內容'
        height={'h-full'}
        body={
          <EmailForm
            onCancel={hideEmsg}
            emsgId={emsgInfo?.emsgId}
          />
        }
        open={openEmsg}
        setOpen={setOpenEmsg}
        width='w-3/4'
      />
    </>
  )
}

export default List
