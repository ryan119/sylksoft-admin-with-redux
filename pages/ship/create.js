import Button from 'components/common/Button'
import { createVessel, removeData } from 'components/ship/action'
import ProfileForm from 'components/ship/profile/profileForm'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'

import SectionTitle from 'src/components/section-title'
import { FormProvider, useForm } from 'react-hook-form'
import { formatDatePatternDash } from 'src/functions/date-format'
//import { TextInput, Widget, formatDatePatternDash } from 'sylksoft-ui'

const CreateShip = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const { mode } = router.query
  const newVessel = useSelector((state) => state.ship.get('newVessel')?.toJS(), shallowEqual)

  useEffect(() => {
    //console.log('mode: ', mode, 'newVessel: ', newVessel)
    if(mode ==='copy' && newVessel) {
      methods.reset({
        ...omit(newVessel, ['vesselId'])
      })
    }

    return () => {
      dispatch(removeData('newVessel'))
    }
  }, [mode, newVessel?.vesselId])

  const onSubmit = (values) => {
    //console.log('values: ', values, formatDatePatternDash(new Date()))
    const cb = () => { router.replace('/ship/list') }
    dispatch(createVessel(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='新增船資料' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <ProfileForm mode='add'/>
            <div className='flex justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/ship/list')}/>
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default CreateShip
