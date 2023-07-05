import { getActions } from 'components/common/action-helper'
import Ellipsis from 'components/common/ellipsis'
import { deleteDemolition, exportDemolition, searchDemolition, setDemoCriteria } from 'components/tradeMgmt/action'
import DemolitionSearch from 'components/tradeMgmt/demolition-search'
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
import { confirmDelete } from 'src/functions/page-alert'

function List(props) {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const actions = getActions(menu, router.pathname)
  const dispatch = useDispatch()

  const { criteria, searchResult, loading } = useSelector((state) => {
    return {
      searchResult: state.tradeMgmt.get('searchResult')?.toJS(),
      criteria: state.tradeMgmt.get('demoCrit')?.toJS(),
      loading: state.common.get('loading')
    }
  }, shallowEqual)

  const isMount = useRef(false)
  useEffect(() => {
    if (isMount.current) {
      dispatch(searchDemolition())
    }
    return () => {
      isMount.current = true
    }
  }, [])

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setDemoCriteria)
      dispatch(searchDemolition())
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
        }
        const ids = selectedIds.map((i) => i.demoId)
        dispatch(deleteDemolition({ ids }, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }

  const columns = [
    { Header: 'TYPE', accessor: 'type', Cell: (v) => <span title={v.row.values.demoId}>{v.value}</span> },
    {
      Header: 'Vessel Name', accessor: 'vesselName', Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-32 w32'>
            <Link href={`/ship/update/${v.row.values.vesselId}?tab=0`}>
              <a className='text-blue-500 underline hover:text-blue-600 cursor-pointer'>
                <span title={v.value}>{v.value}</span>
              </a>
            </Link>
          </Ellipsis>
        )
      }
    },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'Built Country', accessor: 'builtCountry' },
    { Header: 'TEU', accessor: 'teu' },
    { Header: 'LDT', accessor: 'ldt' },
    { Header: 'Sold Price (US$/LDT)', accessor: 'soldPrice'},
    { Header: 'Date', accessor: 'soldDate', width: '200px'},
    { Header: 'Others', accessor: 'others', Cell: (v) => <Ellipsis variants='lg:w-32 w32'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: 'vesselId', accessor: 'vesselId' },
    { Header: 'demoId', accessor: 'demoId' }
  ]

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]
  const _onEdit = (data) => {
    router.push(`/ship/update/${data?.vesselId}?tab=0`)
  }
  const handleExport = () => {
    const cb = (data) => {
      saveAs(data, `demolition-${formatDatePatternDash(new Date)}.xlsx`)
    }
    dispatch(exportDemolition(cb))
  }

  const right = (
    <CanAccessController resource={router.pathname}>
      <ActionButton
        funcId='trade_mgmt_demo_export'
        onClick={handleExport}
        buttonColor='bg-teal-500'
        hoverColor='bg-teal-600'
      />
      <ActionButton
        funcId='trade_mgmt_demo_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )
  return (
    <>
      <SectionTitle subtitle='拆船價列表' />
      <Widget right={right} searchForm={<DemolitionSearch />}>
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
              hiddenColumns={['vesselId', 'demoId']}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
              sortBy={getSortBy(criteria)}
              //fixed={true}
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

export default List