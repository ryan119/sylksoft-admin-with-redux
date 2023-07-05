import { getActions } from 'components/common/action-helper'
import Ellipsis from 'components/common/ellipsis'
import {
  deleteVessel,
  exportVessel,
  searchVessel,
  setVesselCriteria
} from 'components/ship/action'
import SearchForm from 'components/ship/searchForm'
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
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'
import { saveAs } from 'file-saver'

const ShipList = () => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()
  const columns = [
    { Header: 'ID', accessor: 'vesselId' },
    { Header: 'TYPE', accessor: 'type' },
    {
      Header: 'Vessel Name', accessor: 'vesselName', Cell: (v) => {
        return (
          <div className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
               onClick={() => {
                 router.push(`/ship/update/${v.row.original.vesselId}`)
               }}>
              <span title={v.row.original.vesselId}>{v.value}</span>
          </div>
        )
      }
    },
    { Header: 'Year', accessor: 'year' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'Shipyard', accessor: 'shipYard', Cell: (v) => <Ellipsis variants='lg:w-48 w-32'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: 'Gears', accessor: 'gears', Cell: (v) => <Ellipsis variants='lg:w-48 w-32'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: 'TEU', accessor: 'teu' },
    { Header: 'Owners', accessor: 'owner', Cell: (v) => <Ellipsis variants='lg:w-48 w-32'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: 'Date', accessor: 'matchDate', Cell: (v) => formatDatePatternDash(v.value) }

  ]

  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.ship.get('searchResult')?.toJS(),
      criteria: state.ship.get('criteria')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)

  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchVessel())
    }
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setVesselCriteria)
      dispatch(searchVessel())
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

  const _onDelete = (vesselId) => {
    confirmDelete(() => console.log('versselId:', vesselId))
    //confirmDelete(() => dispatch(deleteVessel({ids: [vesselId]})))
  }

  const resetSelectedData = () => {
    setRowSelectIds([])
    setSelectedIds([])
  }

  const deleteSelectedIds = (url) => {
    if (selectedIds?.length > 0) {
      confirmDelete(() => {
        //console.log('versselId:', selectedIds)
        const cb = () => {
          resetSelectedData()
        }
        const ids = selectedIds.map((i) => i.vesselId)
        dispatch(deleteVessel({ ids }, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }

  const handleAdd = (url) => {
    router.push(url)
  }

  const handleExport = () => {
    const cb = (data) => {
      saveAs(data, `vessel-${formatDatePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportVessel(cb))
  }

  /* 先保留這裡的程式，
   * 1. 對應action 是外部傳入的作法傳入actionsOfList。
     2. Datatable 傳入children
   */
  /*const findEditItem = find(actions, (item) => item.url.indexOf('update') !== -1)
  const actionsOfList = [{
    index: 'edit',
    func: (item) => {
      router.push(`${findEditItem.url}/${item['vesselId']}`)
    }
  }]*/


  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='ship_mgmt_create'
        onClick={handleAdd}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />
      <ActionButton
        funcId='ship_mgmt_export'
        onClick={handleExport}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />
      <ActionButton
        funcId='ship_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle subtitle='船舶列表' />
      <Widget right={right} searchForm={<SearchForm />}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <Datatable
              isLoading={loading}
              columns={columns}
              //actionsOfList={actionsOfList}
              data={searchResult?.content ?? []}
              pageCount={searchResult?.totalPages}
              pageIndex={criteria?.page}
              pageSize={criteria?.size}
              fetchData={fetchData}
              indexId='vesselId'
              hiddenColumns={['vesselId']}
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

export default ShipList
