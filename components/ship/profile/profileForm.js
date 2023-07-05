import { PARAM_MAP } from 'components/common/param-map'
import { createEstValuation, createSoldPrice, getVesselTypes } from 'components/ship/action'
import { DemensionInput } from 'components/ship/profile/dimensionInput'
import { mapKeys } from 'lodash'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getParamById } from 'src/actions/common'
import { NumberTextFormat } from 'src/base-components/form/number-text-format'
import Select from 'src/base-components/form/select'
import { TextInput } from 'src/base-components/form/text-input'
import { TextArea } from 'src/base-components/form/textarea'
import { formatDatePatternDash } from 'src/functions/date-format'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlertMessage = withReactContent(Swal)

const ProfileForm = ({ mode, data }) => {

  const dispatch = useDispatch()
  const { vesselTypes, paramTypeList, paramTwOwnerList, paramFlagList, paramBuildPlaceList } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramTwOwnerList: state.common.get('paramTwOwnerList')?.toJS(),
      paramFlagList: state.common.get('paramFlagList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      vesselTypes: state.ship.get('vesselTypes')?.toJS()
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch((getVesselTypes()))
    mapKeys(PARAM_MAP, (value, key) => {
      dispatch(getParamById(key))
    })
  }, [])

  const { getValues, setValue, watch } = useFormContext()
  const onSaveSoldPrice = () => {
    const soldPrice = getValues('soldPrice')
    if (soldPrice !== '') {
      const cb = () => { toast.success('新增成功') }
      dispatch(createSoldPrice({vesselId:data.vesselId, soldPrice}, cb))

     // setValue('soldPrice', '')
    } else {
      AlertMessage.fire({
        icon: 'warning',
        confirmButtonColor: '#d33',
        text: '請輸入Sold Price',
        allowOutsideClick: false
      })
    }
  }

  const onSaveEstValuation = () => {
    const estValue = getValues('estValue')
    if (estValue !== '') {
      const cb = () => { toast.success('新增成功') }
      dispatch(createEstValuation({vesselId: data.vesselId, estValue:estValue}, cb))
      //setValue('estValue', '')
    } else {
      AlertMessage.fire({
        icon: 'warning',
        confirmButtonColor: '#d33',
        text: '請輸入Est. Valuation',
        allowOutsideClick: false
      })
    }
  }

  const updateExName = (e) => {
    console.log('e: ', e.target.value)
    if(e.target.value !== data.vesselName) {
      setValue('exName', data.vesselName)
    }
  }

  return (
    <>
      <div className='lg:grid grid-cols-5 gap-x-4'>
        <TextInput name='vesselName' label='Vessel Name' placeholder='' onBlur={updateExName}/>
        <Select name='builtCountry' label='Built Country' options={paramBuildPlaceList} required={false} />
        <NumberTextFormat name='teu' label='TEU' placeholder='' required={false} />
        <TextInput name='grt' label='GRT' placeholder='' required={false} />
        <TextInput name='price' label='Price Guidance' placeholder='' required={false} />
        <TextInput name='exName' label='Ex-Name' placeholder='' required={false} />
        <TextInput name='shipYard' label='Shipyard' required={false} />
        <TextInput name='gears' label='Gears' required={false} />
        <TextInput name='nrt' label='NRT' required={false} />
        {mode === 'add' ? (
          <TextInput name='soldPrice' label='Sold Price (US$M)' disabled={true} placeholder='--' required={false}/>
        ) : (
          <TextInput name='soldPrice' label='Sold Price (US$M)' required={false}>
            <button
              type='button'
              className='btn btn-sm bg-teal-500 hover:bg-teal-600 text-white btn-rounded h-6'
              onClick={onSaveSoldPrice}
            >
              save
            </button>
          </TextInput>
        )}
        <Select name='type' label='Type' options={vesselTypes} required={false} />
        <TextInput name='year' label='Year' placeholder='' required={false} />
        <TextInput name='haHo' label='HA/HO' required={false} />
        <TextInput name='ldt' label='LDT' placeholder='' required={false} />
        {mode === 'add' ? (
          <TextInput name='estValue' label='Est. Valuation (US$M)' disabled={true} placeholder='--' required={false}/>
        ) : (
          <TextInput name='estValue' label='Est. Valuation (US$M)' required={false}>
            <button
              type='button'
              className='btn btn-sm bg-teal-500 hover:bg-teal-600 text-white btn-rounded h-6'
              onClick={onSaveEstValuation}
            >
              save
            </button>
          </TextInput>
        )}
        <NumberTextFormat name='dwt' label='Deadweight' placeholder='' required={false} />
        <TextInput name='shipClass' label='Class' placeholder='' required={false} />
        <TextInput name='grainBale' label='Grain/Bale' required={false} />
        <TextInput name='owners' label='Owners' required={false} />
        <DemensionInput type='number' name='demolitionValue' label='Demolition (US$)' required={false} />
        <TextInput name='draft' label='Draft' required={false} />
        <Select name='flag' label='Flag' options={paramFlagList} required={false} />
        <TextInput name='lrNo' label='IMO No.' required={false} />
        <Select name='ownerTw' label='Taiwanese Owners' options={paramTwOwnerList} required={false} />
        <TextInput name='newBuildingPrice' label='Newbuilding Price (US$M)' inputWidth='w-full' required={false} />

      </div>
      <div className='lg:grid grid-cols-3 gap-x-4'>
        <TextInput name='dimension' label='Dimension' required={false} />
        <TextInput name='mainEngine' label='Main Engine' inputWidth='w-full' required={false} />
        <TextInput type='date' name='matchDate' label='Match Date' required={false} defaultValue={formatDatePatternDash(new Date())}/>
      </div>

      <div className='lg:grid grid-cols-1 gap-x-4'>
        <TextInput name='speed' label='Speed & Consumption' inline={true} inputWidth='w-full' labelWidth='w-64'
                   required={false} />
      </div>

      <div className='lg:grid grid-cols-1 gap-x-4'>
        <TextArea name='others' label='Others' inline={false} rows={2} inputWidth='w-full' labelWidth='w-64'
                  required={false} />
      </div>

      <div className='lg:grid grid-cols-1 gap-x-4'>
        <TextArea name='remark' label='Remark' inline={false} rows={5} inputWidth='w-full' labelWidth='w-64'
                  required={false} />
      </div>
    </>
  )
}

export default ProfileForm
