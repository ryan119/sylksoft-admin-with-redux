import Button from 'components/common/Button'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from 'src/base-components/form/text-input'
import Widget from 'src/base-components/role/widget'

const EditAttachmentForm = ({ onCancel, onSubmit, data }) => {
  console.log('data: ', data)
  const methods = useForm()
  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.fileName,
        attachId: data.attachId
      })
    }
  }, [data])

  return (
    <>
      <Widget>
        <FormProvider {...methods}>
          <form style={{fontSize:'16px'}}>
            <TextInput name='name' label='附件檔名' inputWidth='w-full' inline={true}/>
            <div className='flex justify-center pt-2'>
              <Button color='primary' label='送出' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='關閉' onClick={() => onCancel()} />
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default EditAttachmentForm
