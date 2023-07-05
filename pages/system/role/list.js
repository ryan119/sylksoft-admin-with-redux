import { deleteEV } from 'components/tradeMgmt/action'
import { head } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import ActionButton from 'src/base-components/auth/action-button'
import CanAccessController from 'src/base-components/auth/CanAccessController'
import LinkedButton from 'src/base-components/auth/link-button'
import DataTable from 'src/base-components/react-table'
import { deleteRole, searchRole } from 'src/base-components/role/action'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'
import { alertWarningMessage, confirmDelete } from 'src/functions/page-alert'

const RoleList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchResult = useSelector((state) => state.role.get('searchResult')?.toJS(), shallowEqual)
  useEffect(() => {
    dispatch(searchRole())
  }, [])


  const columns = [
    /*{ Header: '功能', accessor: 'actions' },*/
    { Header: '角色ID(限後台使用)', accessor: 'roleId' },
    { Header: '角色名稱', accessor: 'roleName' }
  ]

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
        const ids = selectedIds.map((i) => i.roleId)
        dispatch(deleteRole(ids, cb))
      })
    } else {
      alertWarningMessage('您尚未選取資料')
    }
  }

  function _onEdit(data){
    router.push(`/system/role/update/${data?.roleId}`)
  }

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => _onEdit(data)
    }
  ]

  const right = (
    <CanAccessController resource={router.pathname}>
      <LinkedButton funcId='role_mgmt_create' color='primary'/>
      <ActionButton
        funcId='role_mgmt_delete'
        onClick={deleteSelectedIds}
        buttonColor='bg-red-400'
        hoverColor='bg-red-600'
      />
    </CanAccessController>
  )

  return (
    <>
      <SectionTitle title='' subtitle='角色權限列表' />
      <Widget title='' description='' right={right}>
        <div className='flex flex-col w-full'>
          <div className='pt-2 overflow-x-scroll'>
            <DataTable
              columns={columns}
              data={searchResult?.content ?? []}
              indexId='roleId'
              actionsOfList={actionsOfList}
              setRowSelect={setRowSelect}
              selectedRowIds={rowSelectIds}
            >
              <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <FiEdit size={18} />
              </div>
            </DataTable>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default RoleList




