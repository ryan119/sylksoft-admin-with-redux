import Button from 'components/common/Button'
import { ENQUIRY_PARAM_MAP } from 'components/common/param-map'
import { getEnquiryInfo, removeEnquiryData } from 'components/enquiry/action'
import { mapKeys, map, find } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getEnquiryParamById, getParamById } from 'src/actions/common'
import MutiSelect, { InputOption } from 'src/base-components/form/select/mutiple'
import MultiSelectAll from 'src/base-components/form/select/mutiple-select-all'
import SelectWithSelectAll from 'src/base-components/form/select/mutiple-select-all'
import Widget from 'src/base-components/role/widget'
import Select, { components } from 'react-select'
const EnquiryFormModal = ({ onCancel, enquiryId, onSubmit, btnColor='primary', mode }) => {
  const dispatch = useDispatch()
  const {
    enquiryInfo,
    loading,
    paramTypeList,
    paramYearList,
    paramDwtList,
    paramTeuList,
    paramCbmList,
    paramBuildPlaceList
  } = useSelector((state) => {
    return {
      enquiryInfo: state.enquiryMgmt.get('enquiryInfo')?.toJS(),
      loading: state.common.get('loading'),
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramYearList: state.common.get('paramYearList')?.toJS(),
      paramDwtList: state.common.get('paramDwtList')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS(),
      paramCbmList: state.common.get('paramCbmList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    if(mode==='update') {
      dispatch(getEnquiryInfo(enquiryId))
    }

    mapKeys(ENQUIRY_PARAM_MAP, (value, key) => {
      dispatch(getEnquiryParamById(key))
    })
    dispatch(getParamById('T'))
    dispatch(getParamById('B'))

    return () => {
      dispatch(removeEnquiryData())
    }
  }, [enquiryId])

  const methods = useForm()
  useEffect(() => {
    if (enquiryInfo) {
      methods.reset({
        ...enquiryInfo,
        typeIds: transform(enquiryInfo.typeIds, paramTypeList),
        yearIds: transform(enquiryInfo.yearIds, paramYearList),
        dwtIds: transform(enquiryInfo.dwtIds, paramDwtList),
        teuIds: transform(enquiryInfo?.teuIds, paramTeuList),
        cbmIds: transform(enquiryInfo.cbmIds, paramCbmList),
        builtCountryIds: transform(enquiryInfo?.builtCountryIds, paramBuildPlaceList)
      })
    }
  }, [enquiryInfo?.id, enquiryId])


  const transform = (data, collect) => {
    return map(data, d => find(collect, c=> c.id === d))
  }

  return (
    <>
      <Widget>
        <FormProvider {...methods}>
          <form className='text-base'>
            <MultiSelectAll label='Type' name='typeIds' options={paramTypeList} inline={true}  gapY='pb-6'/>
            <MultiSelectAll label='Age' name='yearIds' options={paramYearList} inline={true}  gapY='pb-6'/>
            <MultiSelectAll label='Deadweight' name='dwtIds' options={paramDwtList} inline={true}  gapY='pb-6'/>
            <MultiSelectAll label='Built Country' name='builtCountryIds' options={paramBuildPlaceList} inline={true}  gapY='pb-6'/>
            <MultiSelectAll label='TEU' name='teuIds' options={paramTeuList} inline={true}  gapY='pb-6'/>
            <MultiSelectAll label='CBM' name='cbmIds' options={paramCbmList} inline={true}  gapY='pb-6'/>

          </form>
          <div className='flex justify-center'>
            <Button color={btnColor} label='確定' onClick={methods.handleSubmit(onSubmit)} />
            <Button color='gray' label='關閉' onClick={() => onCancel()} />
          </div>
        </FormProvider>
      </Widget>
    </>
  )
}

export default EnquiryFormModal
