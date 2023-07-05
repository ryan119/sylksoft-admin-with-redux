import { getActions } from 'components/common/action-helper'
import Ellipsis from 'components/common/ellipsis'
import {
  deleteEV,
  exportEV,
  resetEstimateCriteria,
  searchEstimate,
  setEstimateCriteria
} from 'components/tradeMgmt/action'
import EstimateSearchForm from 'components/tradeMgmt/estimate-search'
import { head } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import Datatable from 'src/base-components/react-table'
import { getSortBy, updateCriteria } from 'src/base-components/react-table/constant'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import { formatDatePatternDash } from 'src/functions/date-format'
import { formatNumber } from 'src/functions/numbers'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'
import { saveAs } from 'file-saver'

const EstimateList = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()
  const columns = [
    //{ Header: '功能', accessor: 'actions' },
    { Header: 'ID', accessor: 'evId' },
    { Header: 'TYPE', accessor: 'type', Cell: (v) => <span title={v.row.values.evId}>{v.value}</span> },
    {
      Header: 'Vessel Name', accessor: 'vesselName', Cell: (v) => {
        return (
          <Link href={`/ship/update/${v.row.values.vesselId}?tab=0`}>
            <a
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
            >
              <span title={v.row.original.vesselId} >{v.value}</span>
            </a>
          </Link>
        )
      }
    },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'Shipyard', accessor: 'shipYard', Cell: (v) => <Ellipsis variants='lg:w-60 w32'><span title={v.value}>{v.value}</span></Ellipsis>},
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: 'Est. Valuation(US$M)', accessor: 'estValue', Cell: (v) => formatNumber(v.value) },
    { Header: 'Date', accessor: 'estDate', Cell: (v) => formatDatePatternDash(v.value) },
    { Header: 'vesselId', accessor: 'vesselId' }
  ]

  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.tradeMgmt.get('searchResult')?.toJS(),
      criteria: state.tradeMgmt.get('estCriteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)


  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchEstimate())
    }
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setEstimateCriteria)
      dispatch(searchEstimate())
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
    if (selectedIds.length > 0) {
      confirmDelete(() => {
        const cb = () => {
          resetSelectedData()
        }
        const ids = selectedIds.map((i) => i.evId)
        dispatch(deleteEV({ ids }, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]

  const _onEdit = (data) => {
    router.push(`/ship/update/${data?.vesselId}?tab=3`)
  }

  const handleExport = () => {
    const cb = (data) => {
      saveAs(data, `estimate-${formatDatePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportEV(cb))
  }

  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='trade_mgmt_ev_export'
        onClick={handleExport}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />

      <ActionButton
        funcId='trade_mgmt_ev_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle subtitle='預估價列表' />
      <Widget right={right} searchForm={<EstimateSearchForm />}>
        <div className='flex flex-col w-full'>
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
              indexId='vesselId'
              hiddenColumns={['vesselId', 'evId']}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
              sortBy={getSortBy(criteria)}
              /*fixed={true}*/
            >
              <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <FiEdit size={18} />
              </div>
            </Datatable>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default EstimateList
