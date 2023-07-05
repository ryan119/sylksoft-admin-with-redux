import Button from 'components/common/Button'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { NumberTextFormat } from 'src/base-components/form/number-text-format'
import { TextInput } from 'src/base-components/form/text-input'
import Widget from 'src/base-components/role/widget'
import { formatDatePatternDash } from 'src/functions/date-format'

//TODO: 千分位
const TradeForm = ({ mode, onSubmit, onCancel, data }) => {
  const methods = useForm()
  useEffect(() => {
    if (data) {
      methods.reset({
        ...data,
        soldDate: formatDatePatternDash(data?.soldDate)
      })
    }
  }, [data])

  return (
    <>
      <Widget>
        <FormProvider {...methods}>
          <form
            style={{ fontSize: '16px' }}
            onKeyPress={(e) => {
              if (e.code === 'Enter' || e.charCode === 13) {
                return e.preventDefault()
              }
            }}
          >
            <NumberTextFormat name='soldPrice' label='Sold Price(US$M)' inputWidth='w-full' inline={true} labelWidth='w-64'/>
            <TextInput type='date' name='soldDate' label='Date' inputWidth='w-full' inline={true} labelWidth='w-64' defaultValue={formatDatePatternDash(new Date())} />
            <div className='flex justify-center pt-2'>
              <Button color='primary' label='送出' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='取消' onClick={() => onCancel()} />
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>

  )
}

export default TradeForm
