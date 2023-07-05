import tof from 'components/common/tof.json'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamTypes } from 'src/actions/common'
import { ParseRadioInput } from 'src/base-components/form/radio-input/parse-radio-input'
import { TextInput } from 'src/base-components/form/text-input'

const SettingForm = ({ mode}) => {
  const dispatch = useDispatch()
  const paramTypes = useSelector(state => state.common.get('paramTypes')?.toJS(), shallowEqual)
  useEffect(() => {
    dispatch(getParamTypes())
  }, [])

  return (
    <>
      <div className='lg:grid grid-cols-1 gap-x-4'>
        <ParseRadioInput name='typeId' label='參數類型' options={paramTypes} inline={true} inputWidth='w-full'/>
        <ParseRadioInput name='enabled' label='是否啟用' options={tof} inline={true} inputWidth='w-full'/>
        <TextInput name='name' label='參數名稱' placeholder='' inline={true}  required={false}/>
        <TextInput type='number' name='sortOrder' label='排序值' placeholder='' inline={true}  required={false}/>
      </div>
    </>
  )
}

export default SettingForm
