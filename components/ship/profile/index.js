import Button from 'components/common/Button'
import { copyVesselForNew, getVessel, removeData, updateVessel } from 'components/ship/action'
import ProfileForm from 'components/ship/profile/profileForm'
import SimilarSoldPrices from 'components/ship/profile/similar-soldprices'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Modal from 'src/base-components/modal/index2'
import { formatDatePatternDash } from 'src/functions/date-format'

const   Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const vesselId = router.query.vesselId
  const { vesselProfile } = useSelector((state) => {
    return {
      vesselProfile: state.ship.get('vessel')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    if (vesselId) {
      dispatch(getVessel(vesselId))
    }
    return () => {
      dispatch(removeData('vessel'))
    }
  }, [])

  const vesselName = useRef('')
  useEffect(() => {
    methods.reset({
      ...vesselProfile,
      matchDate: formatDatePatternDash(vesselProfile?.matchDate),
      demolitionDate: formatDatePatternDash(vesselProfile?.demolitionDate)
    })
    vesselName.current = vesselProfile?.vesselName
  }, [vesselProfile?.vesselId])

  console.log('vesselName: ', vesselName.current)

  const [reload, setReload] = useState(false)
  const onSubmit = (values) => {
    console.log('values: ', values)
    const cb = () => {
      setReload(true)
    }
    dispatch(updateVessel(values, cb))
  }

  const copyVesselData = (values) => {
    console.log('values: ', values)
    const cb = () => { router.push('/ship/create?mode=copy') }
    dispatch(copyVesselForNew(values, cb))
  }

  console.log('reload:')

  const [openModal, setOpenModal] = useState(false)
  const hide = () => {　setOpenModal(false)　}
  const show = () => {　setOpenModal(true)　}

  const renderBackToList = () => {
    return (
      <Button color='gray' label='回列表' onClick={() => {
        if (isNaN(router.query.tab)) {
          router.push('/ship/list')
        } else {
          router.back()
        }
      }} />
    )
  }

  return (
    <div className='py-4 w-full bg-gray-50'>
      <FormProvider {...methods}>
        <form>
          <ProfileForm data={vesselProfile} />
          <div className='flex justify-center mt-6'>
            <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
            { renderBackToList() }
            {/*<Button color='gray' label='回列表' onClick={() => router.push('/ship/list')} />*/}
            <Button color='default' label='類似成交價' onClick={() => show()} />
            <Button color='default' label='複製船舶' onClick={methods.handleSubmit(copyVesselData)} />
          </div>
        </form>
      </FormProvider>
      <Modal
        height={vesselProfile?.similarSoldPrices.length > 10 ? 'h-full' : 'h-fit'}
        body={
          <SimilarSoldPrices onCancel={hide}/>
        }
        title='類似成交價'
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  )
}

export default Profile
