import tof from '/components/common/tof.json'
import React from 'react'
import { ParseRadioInput } from 'src/base-components/form/radio-input/parse-radio-input'
import { TextInput } from 'src/base-components/form/text-input'
import { TextArea } from 'src/base-components/form/textarea'

const  CustomerForm = ({ mode }) => {
  return (
    <>
      <div className='lg:grid grid-cols-2 gap-x-4'>
        <TextInput name='country' label='Country' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='telephone' label='Telephone' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='company' label='Company' placeholder='' inline={true} inputWidth='w-full' />
        <TextInput name='directLine' label='Direct Line' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='name' label='Name' placeholder='' inline={true} inputWidth='w-full'/>
        <TextInput name='fax' label='Fax' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='lastName' label='Last Name' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput type='email' name='email1' label='Email1' placeholder='' inline={true} inputWidth='w-full'
                   valid={ { pattern: { value: /\S+@\S+\.\S+/, message: 'Entered value does not match email format'}}} required={false}/>
        <TextInput name='firstName' label='First Name' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput type='email' name='email2' label='Email2' placeholder='' inline={true} inputWidth='w-full'
                   valid={ { pattern: { value: /\S+@\S+\.\S+/, message: 'Entered value does not match email format'}}} required={false}/>
        <TextInput name='department' label='Department' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='city' label='City' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='title' label='Title' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='street' label='Street' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='mobile' label='Mobile' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <TextInput name='zip' label='Zip' placeholder='' inline={true} inputWidth='w-full' required={false}/>
        <ParseRadioInput name='status' label='Status' options={tof} inline={true} inputWidth='w-full'/>
        <TextInput name='web' label='Web Page' placeholder='' inline={true} inputWidth='w-full' required={false}/>
      </div>
      <div className='lg:grid grid-cols-1 gap-x-4'>
        <TextArea name='remark' label='Remark' inline={true} rows={5} inputWidth='w-full' required={false}/>
      </div>
    </>
  )
}

export default CustomerForm
