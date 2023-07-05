import Button from 'components/common/Button'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as actions from 'src/actions/actionTypes'
import { removeData } from 'src/actions/common'
import { createRole, getAllFunctions, getRole, updateRole } from 'src/base-components/role/action'
import RoleForm from 'src/base-components/role/form'
import SectionTitle from 'src/components/section-title'
import Widget from 'src/components/widget'

const UpdateRole = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { allFunctions, roleData } = useSelector((state) => {
    return {
      allFunctions: state?.role.get('allFunctions')?.toJS(),
      roleData: state?.role.get('roleData')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getRole(id, () => router.replace('/system/role/list')))
    dispatch(getAllFunctions())
    return () => {
      dispatch(removeData(actions.GET_ROLE))
    }
  }, [id])

  const methods = useForm()
  useEffect(() => {
    methods.reset({
      ...roleData
    })
  }, [id, roleData?.id])
  console.log('roleData: ', roleData)
  console.log('getValues: ', methods.getValues())

  const onSubmit = (values) => {
    console.log('data: ', JSON.stringify(values, null, 2))
    dispatch(updateRole(values))
  }
  return (
    <>
      <SectionTitle title='' subtitle='修改角色權限' />
      {roleData && (
        <Widget>
          <FormProvider {...methods}>
            <form>
            {allFunctions && (
              <RoleForm functions={allFunctions} mode='edit' />
            )}

            <div className='flex items-center justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)}/>
              <Button color='gray' label='回列表' onClick={() => router.push('/system/role/list')}/>
            </div>
            </form>
          </FormProvider>
        </Widget>
      )}

    </>
  )
}

export default UpdateRole

/* 參考作法，之後先移去後台
export async function getServerSideProps(context) {
  const { params } = context
  const roleData = await getRoleData(params.id, context.req)
  return {
    props: { roleData }
  }
}
*/
