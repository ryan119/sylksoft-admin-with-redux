import Button from 'components/common/Button'
import { createParam } from 'components/ship/action'
import SettingForm from 'components/ship/setting/setting-form'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'

const CreateParam = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const onSubmit = (values) => {
    const cb = () => {
      router.push('/ship/setting/list')
    }
    dispatch(createParam(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='新增船舶參數' />
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

export default CreateParam
