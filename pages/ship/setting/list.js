import { getActions } from 'components/common/action-helper'
import SearchCustomerForm from 'components/customer/searchForm'
import {
  deleteParams, resetParamCriteria,
  resetVesselCriteria,
  searchParams,
  setParamCriteria,
  setVesselCriteria
} from 'components/ship/action'
import SearchParamForm from 'components/ship/setting/search-form'
import { head } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setLoading } from 'src/actions/common'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import Datatable from 'src/base-components/react-table'
import { getSortBy, updateCriteria } from 'src/base-components/react-table/constant'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/base-components/section-title'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'

const SettingList = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()

  const columns = [
    { Header: 'ID', accessor: 'paramId' },
    { Header: '參數名稱', accessor: 'paramName' },
    { Header: '參數類型', accessor: 'typeLabel' },
    { Header: '排序值', accessor: 'sortOrder' },
    { Header: '是否啟用', accessor: 'enabled', Cell: (v) => v.value === true ? '啟用' : '停用' },
  ]

  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.ship.get('paramsResult')?.toJS(),
      criteria: state.ship.get('paramCriteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(searchParams())
  },[])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setParamCriteria)
      dispatch(searchParams())
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

  const handleAdd = (url) => {
    router.push(url)
  }

  const deleteSelectedIds = () => {
    if (selectedIds?.length > 0) {
      confirmDelete(() => {
        const ids = selectedIds.map((i) => i.paramId)
        dispatch(deleteParams({ ids }, resetSelectedData))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }


  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='ship_setting_mgmt_create'
        onClick={handleAdd}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />

      <ActionButton
        funcId='ship_setting_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle subtitle='船舶參數列表' />
      <Widget right={right} searchForm={<SearchParamForm />}>
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
              indexId='paramId'
              hiddenColumns={['paramId']}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
              sortBy={getSortBy(criteria)}
            >
            </Datatable>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default SettingList
