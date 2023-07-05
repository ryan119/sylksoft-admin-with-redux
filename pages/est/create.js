import Button from 'components/common/Button'
import { PARAM_MAP } from 'components/common/param-map'
import { createVesselEst } from 'components/tradeMgmt/action'
import { mapKeys } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById } from 'src/actions/common'
import Select from 'src/base-components/form/select'
import { TextInput } from 'src/base-components/form/text-input'
import SectionTitle from 'src/components/section-title'
import { formatDatePatternDash } from 'src/functions/date-format'

const CreateVesselEst = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { paramTypeList, paramBuildPlaceList, paramDeadWeightList, paramTeuList } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      paramDeadWeightList: state.common.get('paramDeadWeightList')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS(),

    }
  }, shallowEqual)

  useEffect(() => {
    mapKeys(PARAM_MAP, (value, key) => {
      dispatch(getParamById(key))
    })
  }, [])

  const getAgeList = () => {
    const ageList = []
    for (let i = 0; i < 41; i++) {
      const obj = { age: i, price: null }
      ageList.push(obj)
    }
    return ageList
  }

  const agePriceList = getAgeList()
  const methods = useForm({
    defaultValues: {
      agePriceList: agePriceList,
      estDate: formatDatePatternDash(new Date())
    }
  })

  const onSubmit = (values) => {
    const cb = () => {
      router.push('/est/list')
    }
    dispatch(createVesselEst(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='新增船價' />
      <FormProvider {...methods}>
        <form className='text-base'>
          <Select label='Type' name='type' options={paramTypeList} inline={true} />
          <Select label='Deadweight' name='dwt' options={paramDeadWeightList} inline={true} required={false} />
          <Select label='BuiltCountry' name='builtCountry' options={paramBuildPlaceList} inline={true} />
          <Select label='TEU' name='teu' options={paramTeuList} inline={true} required={false} />
          <TextInput type='date' name='estDate' label='Date' inline={true} inputWidth='lg:w-3/6' />
          <AgeForm />
          <div className='flex justify-center mt-4'>
            <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
            <Button color='gray' label='回列表' onClick={() => router.push('/est/list')} />
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default CreateVesselEst


const AgeForm = () => {
  const { control, register, getValues, setValue, watch, reset, formState: { errors } } = useFormContext()
  const { fields, remove, append, prepend } = useFieldArray({
    control,
    name: 'agePriceList'
  })

  const getItemRender = () => {
    let wrappers = []
    let count =0
    let i = 0
    for(let j = 0 ; j< 11; j++) {
      let items = []
      for(count=i ; count < 41; count += 11) {
        items.push(<AgeItem age={count}/>)
      }
      wrappers.push(<tr className='border-b border-gray-200'>{items}</tr>)
      i++
    }
    return wrappers
  }

  return (
    <div className='w-full overflow-x-scroll '>
      <div className='bg-white shadow-md rounded mb-3 mt-3'>
        <table className='min-w-max w-full striped' data-background='light'>
          <thead>
          <tr className='bg-gray-300 text-gray-600 uppercase text-base leading-normal'>
            <th className='py-2 px-6 text-left'>Age</th>
            <th className='py-2 px-6 text-left'>Estimated Value(US$M)</th>
            <th className='py-2 px-6 text-left'>Age</th>
            <th className='py-2 px-6 text-left'>Estimated Value(US$M)</th>
            <th className='py-2 px-6 text-left'>Age</th>
            <th className='py-2 px-6 text-left'>Estimated Value(US$M)</th>
            <th className='py-2 px-6 text-left'>Age</th>
            <th className='py-2 px-6 text-left'>Estimated Value(US$M)</th>
          </tr>
          </thead>
          <tbody className='text-gray-600 text-base font-light'>
          { getItemRender() }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AgeItem = ({ age }) => {
  const { control, register, getValues, setValue, watch, reset, formState: { errors } } = useFormContext()
  return (
    <>
      <td className='py-3 px-6 text-left'>
        <span className='font-medium'>{age}</span>
      </td>
      <td className='py-3 px-6 text-left'>
        <Controller
          name={`agePriceList.${age}.price`}
          control={control}
          render={({ field: { onChange, name, value } }) => (
            <NumericFormat
              name={name}
              value={value}
              onValueChange={(values) => {
                onChange(values.floatValue)
              }}
              className={`form-input form-element-inline disabled:bg-gray-100`}
              thousandSeparator={true}
              valueIsNumericString={true}
              decimalScale={0}
            />
          )}
        />

      </td>
    </>
  )
}
