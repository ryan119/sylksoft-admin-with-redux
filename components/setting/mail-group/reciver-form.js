import React, { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextInput } from 'src/base-components/form/text-input'

const ReceiverForm = ({ inline, data }) => {
  const { control, register, getValues, setValue, watch, reset, formState: { errors } } = useFormContext()
  const { fields, remove, append, prepend } = useFieldArray({
    control,
    name: 'receivers'
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({
        name: '',
        email: ''
      })
    }
  }, [])

  const addItem = () => {
    append({
      name: '',
      email: ''
    })

  }
  //console.log('errors:', errors)
  return (
    <div className='lg:flex lg:flex-1'>

      <div className='w-32 h-4'>
        <div className='w-full mb-4'>
          <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
            <div className='form-label'>收件者</div>
          </div>
        </div>
      </div>

      <div className='lg:w-4/6'>

        <div className='lg:w-full mt-2 p-4 bg-white shadow rounded' id='dropdown'>
          {fields.map((item, idx) => {
            return (
                <div key={idx} className='lg:flex justify-between p-2'>
                  <div className='lg:w-2/5 items-center'>
                    <TextInput
                      label='名稱'
                      name={`receivers.${idx}.name`}
                      inline={true}
                      labelWidth='w-20'
                      inputWidth='w-full'
                      required={false}
                    />
                  </div>
                  <div className='lg:w-2/5'>
                    <TextInput
                      type='email'
                      label='Email'
                      name={`receivers.${idx}.email`}
                      inline={true}
                      valid={
                        {
                          required: 'This field is required',
                          pattern: {
                            //value: /\S+@\S+\.\S+/,
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email format'
                          }
                        }
                      }
                      labelWidth='w-20'
                      inputWidth='w-full'
                    />
                  </div>
                  <div className='w-16'>
                    <button
                      disabled={fields.length === 1}
                      type='button'
                      className='btn btn-default flex-no-shrink p-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500 w-16 h-10'
                      onClick={() => remove(idx)}
                    >移除
                    </button>
                  </div>
                </div>
            )
          })}
          <div className='flex justify-center'>
            <button
              type='button'
              className='btn btn-default flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 h-10 mr-2'
              onClick={() => addItem()}
            >新增收件者
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiverForm
