import UserSearchForm from 'components/member/user-search-form'
import { deleteEV } from 'components/tradeMgmt/action'
import { head } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/actions/common'
import { searchUser, setUserCriteria } from 'src/actions/member'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import LinkedButton from 'src/base-components/auth/link-button'
import DataTable from 'src/base-components/react-table'
import { getSortBy, updateCriteria } from 'src/base-components/react-table/constant'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'

const MemberList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { searchResult, criteria } = useSelector((state) => {
    return {
      criteria: state.member.get('criteria')?.toJS(),
      searchResult: state.member.get('searchResult')?.toJS()
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch(getRoles())
    dispatch(searchUser())
  }, [])

  const columns = [
    { Header: '使用者帳號', accessor: 'userId' },
    { Header: '姓名', accessor: 'name' },
    /*{ Header: '角色', accessor: 'roleName' },*/
    { Header: '是否啟用', accessor: 'enabled', Cell: (v) => v.value === true ? '啟用' : '停用' },
    { Header: 'Email', accessor: 'email' },
    { Header: '建立時間', accessor: 'createTime', Cell: (v) => formatDatetimePatternDash(v.value) }
  ]

  const fetchIdRef = useRef(0)
  const fetchData = useCallback((props) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      updateCriteria(props, dispatch, setUserCriteria)
      dispatch(searchUser())
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


  function _onEdit(data) {
    router.push(`/system/admin/update/${data?.userId}`)
  }

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]

  const right = (
    <CanAccessController resource={router.pathname}>
      <LinkedButton
        funcId='adm_user_mgmt_create'
        color='primary'
      />
      <ActionButton
        funcId='adm_user_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle title='' subtitle='使用者列表' />
      <Widget right={right} searchForm={<UserSearchForm />}>
        <div className='pt-2 overflow-x-scroll'>
          <DataTable
            columns={columns}
            data={searchResult?.content ?? []}
            actionsOfList={actionsOfList}
            setRowSelect={setRowSelect}
            selectedRowIds={rowSelectIds}
            pageCount={searchResult?.totalPages}
            pageIndex={criteria?.page}
            pageSize={criteria?.size}
            sortBy={getSortBy(criteria)}
          >
            <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiEdit size={18} />
            </div>
          </DataTable>
        </div>
      </Widget>
    </>
  )
}

export default MemberList
