import { hide } from '@popperjs/core'
import Button from 'components/common/Button'
import { searchShipData } from 'components/ship/emsg/generalData'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import StaticTable from 'src/base-components/datatable/static-table'
import { deleteRole } from 'src/base-components/role/action'
import Widget from 'src/base-components/role/widget'
import { alertWarningMessage, confirmDelete, confirmMessage } from 'src/functions/page-alert'

const MsgForm = ({ onCancel }) => {
  const columns = [
    {
      Header: '操作',
      accessor: 'actions'
    },
    {
      Header: 'Type',
      accessor: 'type'
    },
    {
      Header: 'Ship Name',
      accessor: 'shipName'
    }
  ]

  const _onSelectedShip = (item) => {
    console.log('item: ', item)
    confirmMessage(() => {
      toast.success('成功對應資料')
      onCancel()
    }, '修改船舶', `您已選取：${item.shipName}`, )
  }

  const actionsOfList = [{
    index: 'select',
    func: _onSelectedShip
  }]

  const [searchResult, setSearchResult] = useState([])
  const searchShipByName = () => {
    const data = searchShipData()
    setSearchResult(data)
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-center mb-4'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold'>修改船舶</div>
        </div>
      </div>
      <Widget>
      <div className='form-element form-element-inline'>
        <div className='form-label'>Ship Name</div>
        <input
          name='name'
          type='text'
          className='form-input'
          placeholder='Enter something...'
        />
        <div className='form-hint'>
          <Button color='primary' label='查詢' onClick={() => searchShipByName()}/>
        </div>
      </div>

      <div className='mb-1 mt-6'>查詢結果：</div>

      <StaticTable
        columns={columns}
        data={searchResult}
        actionsOfList={actionsOfList}
      >
        <button
          id='select'
          type='button'
          className='btn btn-sm bg-green-500 hover:bg-green-600 text-white btn-rounded'>
          選取
        </button>
      </StaticTable>

      <div className='flex justify-center pt-2'>
        <Button color='primary' label='關閉' onClick={() => onCancel()} />
      </div>
      </Widget>
    </div>
  )
}

export default MsgForm
