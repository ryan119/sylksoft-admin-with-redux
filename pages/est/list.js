import { getActions } from 'components/common/action-helper'
import {
  deleteVesselEst,
  resetVesselEstCriteria,
  searchVesselEst,
  setVesselEstCriteria
} from 'components/tradeMgmt/action'
import VesselEstSearch from 'components/tradeMgmt/vessel-est-search'
import { head } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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

//船價估價管理
const VesselEstList = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()


  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.tradeMgmt.get('searchResult')?.toJS(),
      criteria: state.tradeMgmt.get('vesselEstCriteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)


  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchVesselEst())
    }
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setVesselEstCriteria)
      dispatch(searchVesselEst())
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
        const ids = selectedIds.map((i) => i.id)
        dispatch(deleteVesselEst({ ids }, cb))
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
    { Header: 'ID', accessor: 'id' },
    { Header: 'TYPE', accessor: 'type' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'TEU', accessor: 'teu' },
    {
      Header: 'Estimated Value(US$M)', accessor: 'price',
      Cell: (v) => {
        return formatNumber(v.value)
      }
    },
    {
      Header: 'Date', accessor: 'estDate',
      Cell: (v) => formatDatePatternDash(v.value)
    },
    /*{ Header: '修改人', accessor: 'updater' },
    { Header: '最後修改時間', accessor: 'updateTime', Cell: (v) => formatDatePatternDash(v.value) }*/
  ]

  /* const actionsOfList = [
       {
           index: 'edit',
           func: (data) => _onEdit(data)
       }
   ]

   const _onEdit = (data) => {
       router.push(`/est/update/${data?.id}`)
   }*/

  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='est_mgmt_create'
        onClick={handleAdd}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />
      <ActionButton
        funcId='est_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle subtitle='船價推算列表' />
      <Widget right={right} searchForm={<VesselEstSearch />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <Datatable
              isLoading={loading}
              columns={columns}
              data={searchResult?.content ?? []}
              pageCount={searchResult?.totalPages}
              pageIndex={criteria?.page}
              pageSize={criteria?.size}
              fetchData={fetchData}
              indexId='id'
              hiddenColumns={['id']}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
              sortBy={getSortBy(criteria)}
            />
          </div>
        </div>
      </Widget>
    </>
  )
}

export default VesselEstList
