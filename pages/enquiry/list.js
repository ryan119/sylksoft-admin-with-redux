import { getActions } from 'components/common/action-helper'
import Button from 'components/common/Button'
import Ellipsis from 'components/common/ellipsis'
import { sendEmail } from 'components/emsg/action'
import SendMailModal from 'components/emsg/send-mail-modal'
import VesselsModal from 'components/emsg/vessel-modal'
import {
  deleteEnquiry,
  resetEnquiryListCriteria,
  searchEnquiryList,
  setEnquiryListCriteria,
  updateEnquiry
} from 'components/enquiry/action'
import EnquiryFomModal from 'components/enquiry/enquiry-fom-modal'
import EnquirySearchForm from 'components/enquiry/enquiry-search-form'
import { resetVesselCriteria, setVesselCriteria } from 'components/ship/action'
import { head } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import { validFilesTotalSize } from 'src/base-components/form/upload/validation'
import Modal from 'src/base-components/modal/index2'
import Datatable from 'src/base-components/react-table'
import { getSortBy, updateCriteria } from 'src/base-components/react-table/constant'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'

const EquiryList = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()
  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.enquiryMgmt.get('searchResult')?.toJS(),
      criteria: state.enquiryMgmt.get('criteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)


  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchEnquiryList())
    }
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setEnquiryListCriteria)
      dispatch(searchEnquiryList())
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
          dispatch(searchEnquiryList())
        }
        const ids = selectedIds.map((i) => i.enquiryId)
        dispatch(deleteEnquiry({ ids }, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
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

  const columns = [
    { Header: 'ID', accessor: 'enquiryId', width: 100, fixed: true },
    {
      Header: '電文主旨', accessor: 'subject',width:400, fixed: true, Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-80 w-48'>
            <span
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
              title={v.value}
              onClick={() => {
                router.push(`/emsg/view/${v.row.original.emsgId}?redirect`)
              }}
            >{v.value}</span>
          </Ellipsis>
        )
      }
    },
    { Header: '寄件者', accessor: 'sender', Cell: (v) => <Ellipsis variants='lg:w-80 w-48'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: '收件者', accessor: 'receiver' },
    { Header: '收件時間', accessor: 'receiveTime', Cell: (v) => formatDatetimePatternDash(v.value) },
    {
      Header: '船舶需求', accessor: 'viewEnquiry', Cell: (v) => {
        return (
          <a
            href='#'
            className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
            onClick={() => showEnquiry(v.row.original.enquiryId)}
          >修改/檢視</a>
        )
      }
    },
    {
      Header: '符合需求船船', accessor: 'viewVessel', Cell: (v) => {
        return (
          <a
            href='#'
            className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
            onClick={() => showVessels(v.row.original.vessels)}
          >查詢船舶清單</a>
        )
      }
    },

  ]

  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='enquiry_mgmt_send_email'
        onClick={showSendMail}
        buttonColor='bg-blue-800'
        hoverColor='bg-blue-900'
      />
      <ActionButton
        funcId='enquiry_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  //寄送作業
  const [openSendMail, setOpenSendMail] = useState(false)
  const _onSendMail = (values) => {
    const cb = () => {
      resetSelectedData()
      setOpenSendMail(false)
    }
    validFilesTotalSize(values.attaches).then((r) => {
      if (r) {
        dispatch(sendEmail(values, cb))
      }
    })
  }

  function showSendMail() {
    setOpenSendMail(true)
  }

  //修改檢視船舶需求
  const [openEnquiry, setOpenEnquiry] = useState(false)
  const [enquiryId, setEnquiryId] = useState()
  function onSubmitEnquiry(values) {
    const cb = () => { hideEnquiry() }
    dispatch(updateEnquiry(values, cb))
  }

  function hideEnquiry() {
    setOpenEnquiry(false)
  }

  function showEnquiry(enquiryId) {
    setEnquiryId(enquiryId)
    setOpenEnquiry(true)
  }

  return (
    <>
      <SectionTitle subtitle='船舶需求列表' />
      <Widget right={right} searchForm={<EnquirySearchForm />}>
        <div className='pt-2 overflow-x-scroll'>
          <Datatable
            isLoading={loading}
            columns={columns}
            data={searchResult?.content ?? []}
            pageCount={searchResult?.totalPages}
            pageIndex={criteria?.page}
            pageSize={criteria?.size}
            fetchData={fetchData}
            indexId='enquiryId'
            hiddenColumns={['enquiryId']}
            setRowSelect={setRowSelect}
            selectedRowIds={rowSelectIds}
            disableFunc={true}
            /*fixed={true}*/
            sortBy={getSortBy(criteria)}
          />
        </div>
      </Widget>

      <Modal
        title='修改/檢視船舶需求'
        body={<EnquiryFomModal mode='update' onCancel={hideEnquiry} enquiryId={enquiryId} onSubmit={onSubmitEnquiry}/>}
        open={openEnquiry}
        setOpen={setOpenEnquiry}
        withFooter={false}
        width='w-3/4'
        height='h-full'
      />

      <Modal
        height='h-full'
        title='查詢船舶清單'
        body={<VesselsModal onCancel={hideVessels} data={vessels ?? []} />}
        open={openVessels}
        setOpen={setOpenVessels}
        withFooter={true}
        width='w-3/4'
      />

      <Modal
        title='寄送作業'
        height='h-full'
        headerBg='bg-blue-900'
        body={<SendMailModal onCancel={() => setOpenSendMail(false)} onSubmit={_onSendMail} selected={selectedIds}/>}
        open={openSendMail}
        setOpen={setOpenSendMail}
        withFooter={false}
        width='w-3/4'
      />
    </>
  )
}

export default EquiryList
