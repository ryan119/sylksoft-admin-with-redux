import Button from 'components/common/Button'
import { getParamInfo, removeData, updateParam } from 'components/ship/action'
import SettingForm from 'components/ship/setting/setting-form'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'

const UpdateParam = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const paramId = router.query.id
  const paramInfo = useSelector(state => state.ship.get('paramInfo')?.toJS(), shallowEqual)

  const isMount = useRef(true)
  useEffect(() => {
    if (isMount.current === true) {
      dispatch(getParamInfo(paramId))
    }
    return () => {
      dispatch(removeData())
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    methods.reset({
      ...paramInfo,
      enabled: paramInfo?.enabled?.toString()
    })
  }, [paramInfo?.id])

  const onSubmit = (values) => {
    dispatch(updateParam(values))
  }

  return (
    <>
      <SectionTitle title='' subtitle='修改船舶參數' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <SettingForm mode='add' />
            <div className='flex justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/ship/setting/list')} />
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default UpdateParam
