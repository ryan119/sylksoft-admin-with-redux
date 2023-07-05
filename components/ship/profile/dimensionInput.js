import ValuationForm from 'components/ship/estimate/valuation-form'
import AddDemolitionDate from 'components/ship/profile/add-demoliton-date'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { get, useFormContext } from 'react-hook-form'
import Error from 'src/base-components/form/error'
import { NumericFormat } from 'react-number-format'
import Modal from 'src/base-components/modal/index2'

const DemensionInput = (
  {
    name,
    type,
    label,
    required,
    valid,
    readonly,
    placeholder,
    inline,
    inputWidth,
    labelWidth = 'w-32',
    children,
    ...props
  }
) => {
  const { register,getValues,setValue, watch, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  const [openModal, setOpenModal] = useState(false)
  const hide = () => {
    console.log('values: ', getValues())
    setOpenModal(false)
  }
  const show = () => {
    setOpenModal(true)
  }

  return (
    <>
      <div className={`form-element`}>
        <div className='form-element flex'>
          <div className='flex-1 form-label'>{label}</div>
        </div>
        <div className='inline-flex items-center space-x-2'>
          <input
            type='checkbox'
            name='demolition'
            className='form-checkbox text-blue-500 h-6 w-6'
            {...register('demolition')}
            {...props}
          />
          <NumericFormat
            className={`${get(errors, name) ? 'form-input form-element-inline ' : 'form-input'} disabled:bg-gray-100`}
            name={name}
            value={getValues(name)}
            onValueChange={(values) => {
              setValue(name, values.value)
            }}
            thousandSeparator={true}
            valueIsNumericString={true}
            decimalScale={2}
            disabled={watch('demolition') !== true}
            {...props}
          />
          <button
            type='button'
            className='btn btn-sm bg-teal-500 hover:bg-teal-600 text-white btn-rounded h-6'
            onClick={()=> { watch('demolition') === true ? show() : null } }
          >
            Edit
          </button>
        </div>
        <Error errors={errors} name={name} />

        <Modal
          body={
            <AddDemolitionDate
              onCancel={hide}
            />
          }
          title='設定Demolition Date'
          open={openModal}
          setOpen={setOpenModal}
          withFooter={false}
        />

      </div>
    </>
  )
}

DemensionInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string,
  //只有當外層grid-cols-1時，才考慮是否用inline
  inline: PropTypes.bool,
  //若欄位上有link action需外部傳入時
  children: PropTypes.element || undefined
}

DemensionInput.defaultProps = {
  type: 'text',
  required: true,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: false,
  children: undefined
}

export { DemensionInput }
