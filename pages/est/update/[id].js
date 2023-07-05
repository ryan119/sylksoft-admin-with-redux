import Button from 'components/common/Button'
import { getVesselEstInfo, removeVesselEstInfo, updateVesselEst } from 'components/tradeMgmt/action'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById } from 'src/actions/common'
import { NumberTextFormat } from 'src/base-components/form/number-text-format'
import Select from 'src/base-components/form/select'
import { TextInput } from 'src/base-components/form/text-input'
import SectionTitle from 'src/components/section-title'
import { formatDatePatternDash } from 'src/functions/date-format'

const UpdateVesselEst = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const estId = router.query.id
  const { paramTypeList, paramBuildPlaceList, paramDeadWeightList, paramTeuList, vesselEstInfo } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      paramDeadWeightList: state.common.get('paramDeadWeightList')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS(),
      vesselEstInfo: state.tradeMgmt.get('vesselEstInfo')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getParamById('T'))
    dispatch(getParamById('B'))
  }, [])

  useEffect(() => {
    dispatch(getVesselEstInfo(estId))
    return () => {
      dispatch(removeVesselEstInfo())
    }
  }, [estId])

  const methods = useForm()

  useEffect(() => {
    methods.reset({
      ...vesselEstInfo,
      estDate: formatDatePatternDash(vesselEstInfo?.estDate)
    })
  }, [estId, vesselEstInfo?.id])

  const onSubmit = (values) => {
    dispatch(updateVesselEst(values))
  }

  return (
    <>
      <SectionTitle title='' subtitle='更新船價' />
      <FormProvider {...methods}>
        <form className='text-base'>
          <Select label='Type' name='type' options={paramTypeList} inline={true} labelWidth='w-52' />
          <Select label='Deadweight' name='dwt' options={paramDeadWeightList} inline={true} labelWidth='w-52' required={false} />
          <Select label='BuiltCountry' name='builtCountry' options={paramBuildPlaceList} inline={true}
                  labelWidth='w-52' />
          <Select label='TEU' name='teu' options={paramTeuList} inline={true} labelWidth='w-52' required={false} />
          <TextInput type='date' name='estDate' label='Date' inline={true} labelWidth='w-52' inputWidth='lg:w-3/6' />
          <TextInput type='number' name='age' label='Age' inline={true} labelWidth='w-52' inputWidth='lg:w-3/6' />
          <NumberTextFormat label='Estimated Value(US$M)' name='price' inline={true} labelWidth='w-52'
                            inputWidth='lg:w-3/6' />
          <div className='flex justify-center mt-4'>
            <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
            <Button color='gray' label='回列表' onClick={() => router.push('/est/list')} />
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default UpdateVesselEst
