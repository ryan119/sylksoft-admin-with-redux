import tof from 'components/common/tof.json'
import ReciverForm from 'components/setting/mail-group/reciver-form'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamTypes } from 'src/actions/common'
import { ParseRadioInput } from 'src/base-components/form/radio-input/parse-radio-input'
import { TextInput } from 'src/base-components/form/text-input'

const MailGroupForm = () => {
  const dispatch = useDispatch()
  const paramTypes = useSelector(state => state.common.get('paramTypes')?.toJS(), shallowEqual)
  useEffect(() => {
    dispatch(getParamTypes())
  }, [])

  return (
    <>
      <div className='lg:grid grid-cols-1 gap-x-2'>
        <TextInput name='name' label='群組名稱' placeholder='' inline={true}/>
        {/*<Select name='typeId' label='系統使用者' options={paramTypes} inline={true}/>*/}
        <ParseRadioInput name='enabled' label='是否啟用' options={tof} inline={true} />
      </div>
      <ReciverForm inline={true} />
    </>
  )
}

export default MailGroupForm
