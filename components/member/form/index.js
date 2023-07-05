import tof from 'components/common/tof.json'
import { map } from 'lodash'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import AutoSelectHook from 'src/base-components/form/auto-select-hook'
import MultiRoleInput from 'src/base-components/form/multi-role-input'
import { ParseRadioInput } from 'src/base-components/form/radio-input/parse-radio-input'
import { TextInput } from 'src/base-components/form/text-input'
import { TextArea } from 'src/base-components/form/textarea'


const MemberForm = ({mode, inline = true }) => {
  const roles = useSelector((state) => state.common.get('roles')?.toJS(), shallowEqual)
  const optionsRoles = map(roles, r => {return {id: r.id, label: r.name}})

  const passwordValid = {
    minLength: { value: 6, message: 'Your password should have at least 6 characters' },
  }
  const confirmPwValid = {
    validate: (value, formValues) => {
      if(formValues.password !== value){
        return "Your passwords do no match!"
      }
    }
  }

  return (
    <>
      <MultiRoleInput
        name='roleIds'
        label='角色權限'
        placeholder=''
        inline={true}
        options={optionsRoles ?? []}
        inputWidth='lg:w-3/6'
      />
      <ParseRadioInput name='enabled' label='是否啟用' options={tof} inline={true} inputWidth='lg:w-3/6'/>
      <TextInput name='userId' label='使用者帳號' placeholder='' inline={true} inputWidth='lg:w-3/6' autoComplete=""/>
      { mode === 'add' ? (
        <>
          <TextInput type='password' name='password' label='登入密碼' placeholder='請輸入至少6位' inline={true} inputWidth='lg:w-3/6' autoComplete="" valid={passwordValid}/>
          <TextInput type='password' name='confirmPassword' label='確認密碼' placeholder='請輸入至少6位' inline={true} inputWidth='lg:w-3/6' autoComplete="" valid={confirmPwValid}/>
        </>
      ): undefined }
      <TextInput name='name' label='姓名' placeholder='' inline={true} inputWidth='lg:w-3/6' />
      <TextInput name='email' label='Email' placeholder='' inline={true} inputWidth='lg:w-3/6' required={false}
                 valid={ { pattern: { value: /\S+@\S+\.\S+/, message: 'Entered value does not match email format'}}} />
      <TextInput name='mobile' label='手機' placeholder='0919123456' inline={true} inputWidth='lg:w-3/6' required={false} />
      <TextArea name='remark' label='備註' inline={true} rows={5} inputWidth='w-full' required={false} />
    </>
  )
}

export default MemberForm
