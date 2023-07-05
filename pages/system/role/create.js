import Button from 'components/common/Button'
import { map } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createRole, getAllFunctions } from 'src/base-components/role/action'
import RoleForm from 'src/base-components/role/form'
import SectionTitle from 'src/components/section-title'
import Widget from 'src/components/widget'

//TODO: 需取至API
export const defaultLangCodes = [
  {
    id: 'zh_TW',
    name: '繁體中文'
  }
]


const CreateRole = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { allFunctions } = useSelector((state) => {
    return {
      allFunctions: state?.role.get('allFunctions')?.toJS()
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch(getAllFunctions())
  },[])

  const methods = useForm()
  useEffect(() => {
    methods.reset({
      applicationId:'mxmt-ship',
      parentId:null,
      functionIds: [],
      names: map(defaultLangCodes, (lang) => {
        return {
          langCode: lang.id,
          name: ''
        }
      })
    })
  }, [])

  const onSubmit = (values) => {
    //console.log('data: ', JSON.stringify(values, null, 2))
    dispatch(createRole(values, () => router.push(`/system/role/list`)))
  }
  return (
    <>
      <SectionTitle title='' subtitle='新增角色權限' />
      <Widget>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            { allFunctions && (
              <RoleForm functions={allFunctions} />
            )}

            <div className='flex items-center justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)}/>
              <Button color='gray' label='回列表' onClick={() => router.push('/system/role/list')}/>
            </div>

          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default CreateRole

